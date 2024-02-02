import * as express from 'express';
import { Op } from 'sequelize';
import { Post } from '../models/post';
import { User } from '../models/user';
import { Image } from '../models/image';
import { Comment } from '../models/comment';
import { Report } from '../models/report';

const router = express.Router();


// GET POSTS
// GET /posts
router.get('/', async (req, res, next) => {
    try {

        const where: any = {};

        // console.log("Last Id: ", req.query.lastId);
        //초기 loading이 아닐 때 (초기 로딩은 값이 0 이기 때문에 false가 됨)
        if (parseInt(req.query.lastId as string, 10)) {
            //lastId보다 작은 이라는 조건문을 작성 해야 함. => 이렇게 작성하면 id가 lastId보다 작은 이라는 형태의 조건문이 완성 됨.
            where.id = {
                [Op.lt]: parseInt(req.query.lastId as string, 10)
            };
        }
        console.log('where for get posts: ', where);

        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ["createdAt", "DESC"],
                ["comments", 'createdAt', 'DESC']
            ],
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['id', 'nickname']
                },
                {
                    model: Post,
                    as: 'retweet',
                    include: [
                        {
                            model: User,
                            as: 'author',
                            attributes: ['id', 'nickname']
                        },
                        {
                            model: Image
                        }
                    ]
                },
                {
                    model: Image
                },
                {
                    model: User,
                    as: 'likers',
                    attributes: ['id', 'nickname']
                },
                {
                    model: Comment,
                    as: 'comments',
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'nickname']
                        }
                    ]
                }, {
                    model: Report
                }
            ]
        });

        console.log('posts:', posts);
        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return next(error);

    }


});

export default router;