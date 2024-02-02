const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const { Post, Comment, Image, User, Hashtag, Report } = require("../models");
const { isLoggedIn } = require("./middlewares");

try {
  //아래는 uploads라는 folder가 있는지 확인 하는 코드
  fs.accessSync("uploads");
} catch (error) {
  console.log("Create uploads folder because it is not exist");
  //아래는 uploads folder를 만드는 코드
  fs.mkdirSync("uploads");
}

const prod = process.env.NODE_ENV === "production";

let upload;

if (prod) {
  /* 아래는 production 용 aws s3에 image 저장 */
  AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: "ca-central-1",
  });

  upload = multer({
    //storage: 어디다가 저장 할지?  multerS3: S3에 저장.
    storage: multerS3({
      s3: new AWS.S3(), /// 이렇게 하면 S3 권한을 얻은 것임
      bucket: "sharethoughts", /// 이건 s3에서 설정했던 bucket 이름
      key(req, file, cb) {
        cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`); // image를 저장하는 위치, 이름 설정 (original이라는 폴더안에 해당 설정대로 image가 저장 됨.)
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB -> file 크기 제한
  });
} else {
  /* 아래는 dev용 (backend server 컴퓨터에 바로 image 저장 됨.)*/
  upload = multer({
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
}

//POST /post
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  console.log("req.body: ", req.body);
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g); //해당 코드는 post가 요청 된 경우 hashtag만 찾는 코드
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    //아래는 만약 hashtag가 있는경우, #를 제거한 값들을 Hashtag db에 등록해 주는 코드
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } }),
        ),
      );

      //위 result의 결과는 이런 형태가 됨. [[노드, true], [리액트, true]]
      //따라서 아래의 경우 addHashtags뒤에 바로 addHashtags(result)가 아닌 아래처럼 반복문을 돌려 배열의 첫번째 값으로 등록을 해줘야 함.
      await post.addHashtags(result.map((v) => v[0]));
    }

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
        {
          model: Comment,
          include: [{ model: User, attributes: ["id", "nickname"] }],
        },
        { model: User, attributes: ["id", "nickname"] },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//Post /post/images
router.post("/images", isLoggedIn, upload.array("image"), (req, res, next) => {
  console.log(req.files); // upload.array("image")를 통해 이미 업로드 된 파일을 확인 할 수 있음.

  if (prod) {
    // res.json(req.files.map((v) => v.location)); // 해당 부분은 upload 된 image들의 파일 이름을 front로 다시 보내주는 코드 // 기존 filename에서 location으로 변경 해 주기.
    res.json(req.files.map((v) => v.location.replace(/\original\//, "thumb/"))); // backend에서 resizing 된 image를 front로 보내주기 위해 original이름을 포함 한 이미지 대신 이미지를 thumb이름을 포함한 이미지로 찾아서 front로 보내주기.
  } else {
    res.json(req.files.map((v) => v.filename)); // 해당 부분은 upload 된 image들의 파일 이름을 front로 다시 보내주는 코드
  }
});

//PATCH post/image/동적
router.patch("/image/:src", isLoggedIn, async (req, res, next) => {
  try {
    await Image.update(
      {
        PostId: null,
      },
      {
        where: {
          src: req.params.src,
        },
      },
    );
    console.log("src: ", req.params.src, "postId: ", req.body.postId);
    res.status(200).json({
      src: req.params.src,
      postId: req.body.postId,
    });
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
      return res
        .status(403)
        .send("You cannot post a comment on the not exist post.");
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

//POST post/동적/retweet
router.post("/:postId/retweet", isLoggedIn, async (req, res, next) => {
  try {
    //retweet 역시 게시글이 있는지 없는지, post를 먼저 찾아주기, 추가로 retweetId까지 include해서 찾으면 더 좋음
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: Post,
          as: "Retweet",
        },
      ],
    });
    if (!post) {
      return res
        .status(403)
        .send("You cannot post a comment on the not exist post.");
    }

    //확인해야 할것 : 리트윗 하려는게 본인게시글인 경우 || 해당 게시글이 retweet 된 게시글인 경우 && 다른 유저가 본인의 글을 retweet한것을 다시 본인이 리트윗 하는 경우
    //두번쨰 post.Retweet~ 이 조건문을 위해서 위에서 Retweet값을 include해서 post를 찾았음.
    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send("You cannot retweet your own post");
    }

    //아래는 post.RetweetId 가 있는것은 남이 리트윗한 글이라는 뜻 || 아니면 null이므로 그냥 게시글의 id 작성
    const retweetTargetId = post.RetweetId || post.id;

    //아래는 내가 한번 retweet한 게시글을 다시 retweet하는걸 막아줌
    const existPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (existPost) {
      return res.status(403).send("You already retweeted this post");
    }

    //retweet row 생성
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: "retweet",
    });

    //front로 보내기 전, retweet생성된 값을 포함해서, 필요한 모든 값을 front로 전달 하기 (또한 위처럼만 작성하면 내가 어떤 게시글을 retweet했는지가 안나옴. 따라서 아래와 같이 다 찾은 뒤 프론트로 보내기)
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      include: [
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
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: User,
          as: "Likers",
          attributes: ["id"],
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
    res.status(201).json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//GET post/:postId
router.get("/:postId", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(404).send("This post is not exist");
    }

    const fullPost = await Post.findOne({
      where: { id: post.id },
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
              order: [["createdAt", "DESC"]],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Report,
        },
      ],
    });
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//PATCH /post/10  : UPDATE POST
router.patch("/:postId", isLoggedIn, upload.none(), async (req, res, next) => {
  console.log("req.body: ", req.body);
  console.log("req.params.postId");
  const hashtags = req.body.content.match(/#[^\s#]+/g); //해당 코드는 post가 요청 된 경우 hashtag만 찾는 코드
  try {
    await Post.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.postId,
          UserId: req.user.id,
        },
      },
    );
    //아래는 만약 hashtag가 있는경우, #를 제거한 값들을 Hashtag db에 등록해 주는 코드
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } }),
        ),
      );

      //위 result의 결과는 이런 형태가 됨. [[노드, true], [리액트, true]]
      //따라서 아래의 경우 addHashtags뒤에 바로 addHashtags(result)가 아닌 아래처럼 반복문을 돌려 배열의 첫번째 값으로 등록을 해줘야 함.
      await post.setHashtags(result.map((v) => v[0]));
    }
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image })),
        );
        console.log("images: ", images);
        await post.addImages(images); // 이렇게 addImages 해주는 것이 image table에서 postId를 기재하게 해 주는 동작임
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image); // 이렇게 addImages 해주는 것이 image table에서 postId가 작성되게 해 주는 코드임 (post.addImages라서 순서가 안 맞는 것 같지만, 이렇게 해야지 image table에서 해당 이미지에 postId가 추가 됨)
        //만약 add테이블이름을 안 하고 싶은 경우는 comment.create() 했던것 처럼 create 안에 직접적인 Id 이름들을 적어주면 됨.
      }
    }

    const postWithImage = await Post.findOne({
      where: { id: post.id },
      include: [{ model: Image }],
    });
    res.status(200).json({
      PostId: parseInt(req.params.postId, 10),
      // content: req.body.content,
      // body: req.body,
      // body: post,
      body: postWithImage,
      // content: req.body.content,
    });
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
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//POST /post/like/:postId
router.post("/like/:postId", isLoggedIn, async (req, res, next) => {
  // console.log(req.body);
  // console.log("user: ", req.user);
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(403).send("You cannot give a Like to non exist post");
    }

    await post.addLikers(req.user.id);

    const returnUserInfo = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: ["id", "email", "nickname"],
    });
    res.status(200).json({
      // UserId: req.user.id,
      PostId: req.params.postId,
      User: returnUserInfo,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//DELETE /post/unlike/:postId
router.delete("/unlike/:postId", isLoggedIn, async (req, res, next) => {
  // console.log(req.body);
  // console.log("user: ", req.user);
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(403).send("You cannot remove a Like to non exist post");
    }

    await post.removeLikers(req.user.id);
    res.status(200).json({ UserId: req.user.id, PostId: req.params.postId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//PATCH /post/appeal/:postId
router.patch("/appeal/:postId", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (req.user.id !== post.UserId) {
      return res
        .status(403)
        .send("Only post's owner can write an appeal letter for their posts.");
    }

    await Post.update(
      {
        appeal: req.body.appeal,
      },
      {
        where: {
          id: req.params.postId,
        },
      },
    );

    const updatedPost = await Post.findOne({
      where: { id: req.params.postId },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
