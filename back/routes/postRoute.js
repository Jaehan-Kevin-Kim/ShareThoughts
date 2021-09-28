const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { Post, Comment, Image, User } = require("../models");
const { isLoggedIn } = require("./middlewares");
const fs = require("fs");

try {
  //아래는 uploads라는 folder가 있는지 확인 하는 코드
  fs.accessSync("uploads");
} catch (error) {
  console.log("Create uploads folder because it is not exist");
  //아래는 uploads folder를 만드는 코드
  fs.mkdirSync("uploads");
}

const upload = multer({
  //storage: 어디다가 저장 할지? diskStorage: 컴퓨터(하드디스크)에 저장.
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    //filename: 파일명 지정
    filename(req, file, done) {
      //파일명은 file.originalname에 들어 있음. (file 이름이 kevin.png인 경우 아래 내용 보기)
      // path는 node에서 제공하는 것. (설치 필요 없음)
      const ext = path.extname(file.originalname); // 확장자 추출 하는 코드(.png)
      const basename = path.basename(file.originalname, ext); // 확장자 제외 나머지 파일이름 가져오는 코드 (kevin)
      done(null, basename + "_" + new Date().getTime() + ext); // 이렇게 하면 kevin_21091232.png 로 저장 됨.
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB -> file 크기 제한
});

//POST /post
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지를 여러개 올리면 'image: [kevin.png, jaehan.png]' 이런식으로 배열로 받아 짐.
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image })),
        );
        // 위는 req.body.image의 배열을 각각 Image db에 src라는 값으로 파일 주소를 등록 해주는 코드. 위의 작업은 모두 promise이기 때문에 한번에 Promise.all 로 비동기 작업 시켜 주기 => 이건 파일을 저장 하는 코드가 아닌, 파일 주소만 text로 db에 저장이 됨.
        await post.addImages(images);
        //위 처럼 작성 하면 바로 위에서 const post로 해서 작성 해준 post 값에 해당 images가 추가가 됨.
      } else {
        // 이미지를 하나만 올리면 'image: kevin.png' 이런식으로 배열로 안받아지고 바로 주소가 받아 짐.
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
        //위 처럼 작성 하면 바로 위에서 const post로 해서 작성 해준 post 값에 해당 image가 추가가 됨.
      }
    }

    // 기존 post로는 image, comment, user 등이 없기 때문에 아래처럼 해당 값들을 추가해서 응답을 해줘야 함.
    //아래 where:{id:post.id} 로 찾아지는 post는 바로 위에 새로 생성한 post를 찾는 것임.
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: Image }, //위 post.addImages로 해줬던 값들이 여기 들어가서 post.images로 가져올 수 있음
        { model: Comment, include: [{ model: User, attributes: ["id", "nickname"] }] },
        { model: User, attributes: ["id", "nickname"] },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//POST post/동적/comment
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("You cannot post a comment on the not exist post.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{ model: User, attributes: ["id", "nickname"] }],
    });

    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//DELETE /post/10
router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(reqs.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//Post /post/images
router.post("/images", isLoggedIn, upload.array("image"), (req, res, next) => {
  console.log(req.files); // upload.array("image")를 통해 이미 업로드 된 파일을 확인 할 수 있음.
  res.json(req.files.map((v) => v.filename)); // 해당 부분은 upload 된 image들의 파일 이름을 front로 다시 보내주는 코드
});

module.exports = router;
