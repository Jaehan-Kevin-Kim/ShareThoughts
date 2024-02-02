const express = require("express");
const { Post, Report } = require("../models");
const { isLoggedIn } = require("./middlewares");
const router = express.Router();

router.get("/:postId", async (req, res, next) => {
  try {
    const reports = await Report.findAll({
      where: { PostId: req.params.postId },
    });
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(403).send("You cannot report for not exist post.");
    }

    if (post.UserId === req.user.id) {
      return res.status(403).send("You cannot report your own post.");
    }

    // 같은 게시물 중복 신고 못하게 막기
    const existReport = await Report.findOne({
      where: { PostId: req.params.postId, ReportUserId: req.user.id },
    });

    if (existReport) {
      return res.status(403).send("You already reported this post!");
    }

    const newReport = await Report.create({
      reason: req.body.reason,
      ReportUserId: req.user.id,
      PostId: req.params.postId,
      PostUserId: post.UserId,
    });

    const allReports = await Report.findAll({
      where: { PostId: req.params.postId },
    });

    console.log("allReports: ", allReports);
    console.log("allReports.length: ", allReports.length);

    if (allReports.length >= 3) {
      await Post.update(
        {
          lockStatus: 1,
        },
        {
          where: {
            id: req.params.postId,
          },
        },
      );
    }

    res.status(200).json(newReport);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
