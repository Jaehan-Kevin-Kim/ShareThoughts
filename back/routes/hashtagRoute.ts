import * as express from 'express';
import { Op } from 'sequelize';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { Hashtag } from '../models/hashtag';
import { User } from '../models/user';
import { Image } from '../models/image';


const router = express.Router();

// GET POSTS HAVING SPECIFIC HASHTAG
// GET /hashtag/:hashtag
router.get("/:hashtag", async (req, res, next) => {
    try {
        const where: any = {};
        if (parseInt(req.query.lastId as string, 10)) {
            // console.log("Last Id: ", req.query.lastId);
            //초기 loading이 아닐 때 (초기 로딩은 값이 0 이기 때문에 false가 됨)
            where.id = { [Op.lt]: parseInt(req.query.lastId as string, 10) };
        }

        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ["createdAt", "DESC"],
                ['comments', "createdAt", "DESC"]
            ],
            include: [
                {
                    model: Hashtag,
                    as: 'hashtags',
                    where: { name: decodeURIComponent(req.params.hashtag) }
                },
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "nickname"]

                },
                {
                    model: Post,
                    as: "retweet",
                    include: [
                        {
                            model: User,
                            as: 'author',
                            attributes: ["id", "nickname"]
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
                    model: Comment,
                    as: 'comments',
                    include: [
                        {
                            model: User,
                            attributes: ["id", "nickname"]
                        }
                    ]
                }
            ]
        }
        );
        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return next(error);

    }
});

export default router;

