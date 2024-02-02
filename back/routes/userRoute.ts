/* eslint-disable consistent-return */
import * as express from 'express';
import { Request, Response, NextFunction } from "express";
import * as bcrypt from 'bcrypt';
import * as passport from 'passport';
import { Op } from 'sequelize';
import { isLoggedIn, isNotLoggedIn } from './middleware';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Image } from '../models/image';
import { Comment } from '../models/comment';

const router = express.Router();


// REGISTER
// POST /user
router.post('/', isNotLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {

        const existUser = await User.findOne({
            where: { email: req.body.email }
        });
        if (existUser) {
            return res.status(403).send("The mail is already exist");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const createdUser = await User.create({
            email: req.body.email,
            password: hashedPassword,
            nickname: req.body.nickname
        });
        // Make a type assertion when using Typescript

        // Make login by passport
        return req.login(createdUser, async (loginErr) => {
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            };

            const fullUserWitoutPassword = await User.findOne({
                where: { id: createdUser.id },
                attributes: { exclude: ['password'] },
                include: [
                    { model: Post, as: "posts" },
                    { model: User, as: 'followings' },
                    { model: User, as: "followers" }
                ]
            });
            return res.status(200).json(fullUserWitoutPassword);
        });
        // return;
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// LOGIN // Use Passport
// Post /user/login
router.post('/login', isNotLoggedIn, (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: any, user: any, info: { message: string; }) => {

        // server error handling
        if (err) {
            console.error(err);
            return next(err);

        }

        // client error handling
        if (info) {
            return res.status(403).send(info.message);
        }

        //아래는 위에서 에러들 없이 통과 시(이미 우리서비스에서는 다 통과 한 상황), 한번 더 passport에 로그인을 위해 요청하는 과정. 따라서 아래는 passport에서 login 하는것 임. 그리고 아래 user에는 이전 done에서 user 객체 정보 넣었으므로, 그 정보가 들어 있음.
        return req.login(user, async (loginErr) => {
            //아래는 거의 발생 할 확률없음. (위에서 로그인 성공했는데 passport에서 로그인 실패하는 경우)
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            //최종적으로 위 passport 자체 login 과정도 성공 했으면 이제 아래 코드로 user 객체의 정보를 응답해서 보내 줌.

            //user 값을 전체를 보내면 password도 포함이 되어있으므로, password값을 빼고 보내기 아래 해당 코드 작성

            //아래에 보면 위에서 user를 가져왔는데 왜 또 User.findOne({})으로 user를 새로 가져오냐면, 첫번째 user 값 중 password는 제거할 거고, 둘째 Posts, Followings, Followers를 추가할거기 때문에, 새로운 User를 생성해서 해당 값을 response로 보내주기 위해서 새로 User를 가져와서 그걸 변수에 넣음.
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                //아래 attributes는 db의 column 중 원하는 것만 가져올 수 있게 해주는 option임 이렇게 하면 (password, createdAt, updatedAt)을 뺴고 기재해둔 (id, nickname, email)값들을 가져오게 됨.
                // attributes: ["id", "nickname", "email"],
                //혹은 특정 값만 제외하고 나머지를 가져오고 싶은 경우는 아래와 같이 작성 함. (아래와 같이 하면 password 빼고 다 가져오는 코드가 됨.)
                attributes: {
                    exclude: ["password"]
                },
                //아래 include는 추가로 더 넣어서 보내주는 것.
                //{model: Post}이건 User db에서 hasMany(Post)로 include 되어있던 거를 그대로 가져오면 됨. 그 외에 as: Followers, as: Followings이건 역시 user DB에서 User의 값들을 가져오는건데 여기서 as로 썼던 그 값 그대로 가져와야 함. (만약 model에서 as 썼으면 include에서도 똑같이 as의 값들을 가져와야 함)
                include: [
                    { model: Post, as: "posts" },
                    { model: User, as: "followers" },
                    { model: User, as: "followings" }
                ]
            });
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
});

// GET USER DATA (MY DATA)
// GET /user
router.get('/', async (req, res, next) => {
    try {
        if (req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: {
                    id: req.user.id,
                },
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: Post,
                        as: 'posts',
                        attributes: ['id']
                    },
                    {
                        model: User,
                        as: "Followings",
                        attributes: ['id']
                    },
                    {
                        model: User,
                        as: "followers",
                        attributes: ['id']
                    }
                ]
            });
            return res.status(200).json(fullUserWithoutPassword);
        }
        return res.status(200).json(null);

    } catch (error) {
        console.error(error);
        return next(error);

    }
});



// Post /user/logout
router.post('/logout', isLoggedIn, (req, res, next) => {

    req.logout((logoutErr) => {
        if (logoutErr) {
            console.error('logoutError: ', logoutErr);
            return next(logoutErr);
        }
    });


    req.session.destroy((sessionErr) => {
        if (sessionErr) {
            console.error('sessionErr: ', sessionErr);
            return next(sessionErr);
        }
    });
    return res.status(200).send('Successfully logged out');
});

// UPDATE NICKNAME
//PATCH /user/nickname
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        await User.update(
            {
                nickname: req.body.nickname
            },
            {
                where: { id: req.user!.id }
            }
        );
        res.status(200).json({ nickname: req.body.nickname });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// GET FOLLOWERS
// GET /user/followers
router.get('/followers', isLoggedIn, async (req, res, next) => {
    try {
        const me = await User.findByPk(req.user!.id);

        const followers = await (me as any).getFollowers({
            limit: parseInt(req.query.limit as string, 10) || 10,
            offset: parseInt(req.query.offset as string, 10) || 0,
        });

        return res.status(200).json({ followers });
    } catch (error) {
        console.error(error);
        return next(error);

    }
});

// GET FOLLOWINGS
// GET /user/followings
router.get('/followings', isLoggedIn, async (req, res, next) => {
    try {
        const me = await User.findByPk(req.user!.id);

        const followings = await (me as any).getFollowings({
            limit: parseInt(req.query.limit as string, 10) || 10,
            offset: parseInt(req.query.offset as string, 10) || 0,
        });
        return res.status(200).json({ followings });

    } catch (error) {
        console.error(error);
        return next(error);
    }
});


// GET USER DATA (SPECIFIC USER BY USERID. Not required loggedin)
// GET /user/:userId
router.get('/:userId', async (req, res, next) => {
    try {
        const fullUserWithoutPassword: User | null = await User.findByPk(req.params.userId,
            {
                attributes: { exclude: ["password"] },
                include: [
                    {
                        model: Post,
                        as: "posts",
                        attributes: ["id"]
                    },
                    {
                        model: User,
                        as: "followings",
                        attributes: ["id"]
                    },
                    {
                        model: User,
                        as: "followers",
                        attributes: ["id"]
                    }
                ]
            });

        if (fullUserWithoutPassword) {
            // Only send with the length of posts, followers, and followings
            const data = { ...fullUserWithoutPassword.toJSON(), posts: fullUserWithoutPassword.posts.length, followings: fullUserWithoutPassword.followings.length, followers: fullUserWithoutPassword.followers.length, fullUserWithoutPassword };

            res.status(200).json(data);
        } else {
            res.status(404).json("The user is not exist");
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
});



// BRING POSTS FROM A SPECIFIC USER BY USERID
// GET /user/:userId/posts
router.get('/:userId/posts', async (req, res, next) => {
    try {
        const where: any = { UserId: req.params.userId };
        if (parseInt(req.query.lastId as string, 10)) {
            //초기 loading이 아닐 때 (초기 로딩은 값이 0 이기 때문에 false가 됨)
            where.id = { [Op.lt]: parseInt(req.query.lastId as string, 10) };
            //lastId보다 작은 이라는 조건문을 작성 해야 함. => 이렇게 작성하면 id가 lastId보다 작은 이라는 형태의 조건문이 완성 됨.
            // console.log("where.id: ", where.id);
        }

        const posts = await Post.findAll({
            where,
            limit: 10, //요청이 발생 했을때 10개만 가져오라는 명령어
            order: [
                ["createdAt", "DESC"]
            ],
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ["id", "nickname"]
                },
                {
                    model: Post,
                    as: "Retweet",
                    include: [
                        {
                            model: User,
                            as: 'author',
                            attributes: ["id", "nickname"]
                        },
                        {
                            model: Image,
                            // as: 'images'
                        }
                    ]
                },
                {
                    model: Image,
                    // as: 'images'
                },
                {
                    model: Comment,
                    as: 'comments',
                    include: [
                        {
                            model: User,
                            // as: 'users',
                            attributes: ["id", "nickname"]
                        }
                    ]
                }
            ]
        });
        res.status(200).json(posts);

    } catch (error) {
        console.error(error);
        return next(error);

    }
});

// FOLLOW
// POST /user/:userId/follow
router.post('/:userId/follow', isLoggedIn, async (req, res, next) => {
    try {
        const existUser: any = await User.findByPk(req.params.userId);

        if (!existUser) {
            return res.status(403).send("User is not exist for following.");

        }

        await existUser.addFollowers(req.user!.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });

    } catch (error) {
        console.error(error);
        return next(error);

    }
});

// UNFOLLOW (I am unfollowing someone)
// DELETE /user/:userId/follow
router.delete("/:userId/follow", isLoggedIn, async (req, res, next) => {
    try {
        const me: any = await User.findOne({ where: { id: req.user!.id } });
        if (!me) {
            return res.status(403).send("User is not exist");
        }

        //아래는 내가 unfollow 버튼 누르면 그 사람의 follwer인 내가 remove를 하기 때문에 removeFollowers 가 됨.
        await me.removeFollowers(req.params.userId);
        res.status(200).json({ UserId: parseInt(req.params!.userId, 10) });
    }
    catch (error) {
        console.error(error);
        return next(error);

    }
});

// UNFOLLOW (I forcefully remove any follower)
// DELETE /user/follower/:userId
router.delete("/follower/:userId", isLoggedIn, async (req, res, next) => {
    try {
        const me: any = await User.findByPk(req.user!.id);
        if (!me) {
            return res.status(403).send("User is not exist");
        }

        await me.removeFollowings(req.params.userId);
        return res.status(200).json({ UserId: parseInt(req.params.userId, 10) });


    } catch (error) {
        console.error(error);
        return next(error);

    }
});

// POST LIKE
//POST /user/like/:postId
router.post('/like/:postId', isLoggedIn, async (req, res, next) => {
    try {
        const me: any = await User.findByPk(req.user!.id);

        if (!me) {
            return res.status(403).send("User is not exist");

        }

        await me.addLiked(req.params.postId);

        return res.status(200).json({
            UserId: me.id,
            PostId: parseInt(req.params.postId, 10)
        });

    } catch (error) {
        console.error(error);
        return next(error);

    }
});

// DELETE LIKE
//DELETE /user/unlike/:postId
router.delete('/unlike/:postId', isLoggedIn, async (req, res, next) => {
    try {
        const me: any = await User.findByPk(req.user!.id);
        if (!me) {
            return res.status(403).send("User is not exist");
        }

        await me.removeLiked(req.params.postId);
        return res.status(200).json({
            UserId: me.id,
            PostId: parseInt(req.params.postId, 10)
        });
    } catch (error) {
        console.error(error);
        return next(error);

    }
});



export default router;