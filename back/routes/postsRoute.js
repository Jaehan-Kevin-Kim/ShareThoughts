const express = require("express");
const { Op } = require("sequelize"); //to implement less than (Op: Operator)

const router = express.Router();
const { Post, User, Image, Comment, Report } = require("../models");

// GET /posts
router.get("/", async (req, res, next) => {
  try {
    const where = {};
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
          model: User,
          as: "Likers",
          attributes: ["id", "nickname"],
          // include: [
          //   {
          //     model: User,
          //     as: "Like",
          //     attributes: ["UserId", "PostId"],
          //   },
          // ],
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
        {
          model: Report,
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
