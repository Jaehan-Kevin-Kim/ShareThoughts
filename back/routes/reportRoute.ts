import * as express from 'express';
import { isLoggedIn } from './middleware';
import { Report } from '../models/report';
import { User } from '../models/user';
import { Post } from '../models/post';

const router = express.Router();

//GET Report by postId
//GET /report/:postId
router.get('/:postId', isLoggedIn, async (req, res, next) => {
    try {
        const report = await Report.findAll({
            where: { postId: req.params.postId },
            include: [
                {
                    model: User,
                    as: 'postUser',
                    attributes: ['id', 'nickname']
                },
                {
                    model: User,
                    as: 'reportUser',
                    attributes: ['id', 'nickname']
                },
                {
                    model: Post,
                    include: [
                        {
                            model: User,
                            as: 'author',
                            attributes: ['id', 'nickname']
                        }
                    ]
                }
            ]
        });

        return res.status(200).json(report);
    } catch (error) {
        console.error(error);
        return next(error);

    }

});


//POST REPORT FOR A SPECIFIC POST
//POST /report/:postId
router.post("/:postId", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.postId);

        if (!post) {
            return res.status(403).send("The post is not exist to report");
        }

        // If user report their own post
        if (post.userId === req.user!.id) {
            return res.status(403).send("You cannot report your own post");
        }

        // Do not allow to make another report to same post by same user
        const existReport = await Report.findOne({
            where: {
                postId: req.params.postId,
                reportUserId: req.user!.id
            }
        });

        if (existReport) {
            return res.status(403).send("You already reported this post!");
        }

        // Create a new report

        const createdReport = await Report.create({
            reason: req.body.reason,
            reportUserId: req.user!.id,
            postId: +req.params.postId,
            postUserId: post.userId
        });

        // To See if the number of reports are more than or equal to 3, then lock the post
        const allReportsForThisPost = await Post.findAll({
            where: { id: req.params.postId }
        });
        if (allReportsForThisPost.length >= 3) {
            await Post.update(
                {
                    lockStatus: true,
                },
                {
                    where: {
                        id: req.params.postId
                    }
                }
            );
        }
        return res.status(200).json(createdReport);
    } catch (error) {
        console.error(error);
        return next(error);

    }
});

export default router;