const express = require("express");

const router = express.Router();
const { Post, User, Image, Comment } = require("../models");

// GET /posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      // where: { id: lastId },
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

module.exports = router;
