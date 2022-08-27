const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { Op } = require("sequelize"); //to implement less than (Op: Operator)
const { User, Post, Comment, Image } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

// GET /user
router.get("/", async (req, res, next) => {
  console.log(req.headers);
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: {
          id: req.user.id,
        },
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          { model: User, as: "Followings", attributes: ["id"] },
          { model: User, as: "Followers", attributes: ["id"] },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Post /user/login
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    //아래는 server에러인 경우
    if (err) {
      console.error(err);
      return next(err);
    }
    //아래는 client에러인 경우
    if (info) {
      return res.status(401).send(info.reason);
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
        attributes: { exclude: ["password"] },

        //아래 include는 추가로 더 넣어서 보내주는 것.
        //{model: Post}이건 User db에서 hasMany(Post)로 include 되어있던 거를 그대로 가져오면 됨. 그 외에 as: Followers, as: Followings이건 역시 user DB에서 User의 값들을 가져오는건데 여기서 as로 썼던 그 값 그대로 가져와야 함. (만약 model에서 as 썼으면 include에서도 똑같이 as의 값들을 가져와야 함)
        include: [
          { model: Post },
          { model: User, as: "Followers" },
          { model: User, as: "Followings" },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// Post /user/logout
router.post("/logout", isLoggedIn, async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.status(200).send("okay");
});

// Post /user/
router.post("/", isNotLoggedIn, async (req, res, next) => {
  try {
    const existUser = await User.findOne({
      where: {
        //찾을때의 조건은 where안에 넣음
        email: req.body.email,
      },
    });
    // console.log("existUser", existUser);
    if (existUser) {
      //반드시 응답은 한번 만 보내야 하기 때문에 응답 시 return을 붙이기 (만약 res.send 두번 보내게 되면 "can't set headers already sent"라는 error message가 출력 됨. 혹은 if/else로 조건문 만들어서 return을 안쓰는 방법도 있음.)
      return res.status(403).send("This email is already registered");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3050");
    // res.setHeader("Access-Control-Allow-Origin", "*"); 이건 모든 port를 다 받아들이는 것
    // res.send("ok"); 이렇게 간단하게 혹은 아래와 같이 상태코드와 함께 보내 줄 수도 있음.
    res.status(201).send("okay"); //201은 생성 성공의 뜻.
  } catch (error) {
    console.error(error);
    next(error); //status 500
  }
});

//PATCH /user/nickname
router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      },
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/followers
router.get("/followers", isLoggedIn, async (req, res, next) => {
  try {
    const me = await User.findOne({
      where: { id: req.user.id },
    });
    const followers = await me.getFollowers({
      limit: parseInt(req.query.limit, 10),
    });
    console.log("followers", followers);
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /user/followings
router.get("/followings", async (req, res, next) => {
  try {
    const me = await User.findOne({
      where: { id: req.user.id },
    });
    const followings = await me.getFollowings({
      limit: parseInt(req.query.limit, 10),
    });
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 특정 사용자 가져오기
// GET /user/:userId
router.get("/:userId", async (req, res, next) => {
  console.log(req.headers);
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: {
        id: req.params.userId,
      },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
          attributes: ["id"],
        },
        { model: User, as: "Followings", attributes: ["id"] },
        { model: User, as: "Followers", attributes: ["id"] },
      ],
    });
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length; // 개인정보 침해 예방
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(200).json(data);
    } else {
      res.status(404).json("The user is not exist.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 특정 사용자의 게시글 가져오기
// GET /user/1/posts
router.get("/:userId/posts", async (req, res, next) => {
  try {
    const where = { UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) {
      // console.log("Last Id: ", req.query.lastId);
      //초기 loading이 아닐 때 (초기 로딩은 값이 0 이기 때문에 false가 됨)
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
      //lastId보다 작은 이라는 조건문을 작성 해야 함. => 이렇게 작성하면 id가 lastId보다 작은 이라는 형태의 조건문이 완성 됨.
      // console.log("where.id: ", where.id);
    }
    // console.log("where", where);

    const posts = await Post.findAll({
      where,
      limit: 10, //요청이 발생 했을때 10개만 가져오라는 명령어
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
      ],
    });
    // console.log("posts", posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /user/1/follow
router.patch("/:userId/follow", async (req, res, next) => {
  try {
    const existUser = await User.findOne({ where: { id: req.params.userId } });
    if (!existUser) {
      res.status(403).send("User is not exist for following.");
    }
    //아래는 내가 follow 버튼 누르면 그 사람의 follower가 되기 때문에 addFollowers 가 됨.
    await existUser.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /user/1/follow
router.delete("/:userId/follow", async (req, res, next) => {
  try {
    const me = await User.findOne({ where: { id: req.user.id } });
    if (!me) {
      res.status(403).send("User is not exist for following.");
    }
    //아래는 내가 unfollow 버튼 누르면 그 사람의 follwer인 내가 remove를 하기 때문에 removeFollowers 가 됨.
    await me.removeFollowers(req.params.userId);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /user/follower/1
router.delete("/follower/:userId", async (req, res, next) => {
  try {
    const existUser = await User.findOne({ where: { id: req.params.userId } });
    if (!existUser) {
      res.status(403).send("User is not exist for following.");
    }
    //아래는 내가 unfollow 버튼 누르면 그 사람의 follwer인 내가 remove를 하기 때문에 removeFollowers 가 됨.
    await existUser.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
