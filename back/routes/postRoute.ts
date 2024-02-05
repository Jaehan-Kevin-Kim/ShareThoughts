/* eslint-disable no-undef */
import * as express from 'express';
import * as fs from 'fs';
import * as AWS from 'aws-sdk';
import * as dotenv from "dotenv";
import * as path from 'path';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { isLoggedIn } from './middleware';
import { Post } from '../models/post';
import { Hashtag } from '../models/hashtag';
import { Image } from '../models/image';
import { Comment } from '../models/comment';
import { User } from '../models/user';
import { Report } from '../models/report';


const router = express.Router();

dotenv.config();


// Check if there is 'uploads' folder in the backend, and if not, create a directory.
try {
    fs.accessSync("uploads");
} catch (error) {
    console.log('Create uploads folder because it is not exist');
    fs.mkdirSync("uploads");
}

// check if the process is running in production mode or not.
const prod = process.env.NODE_ENV === 'production';


// Logic for upload images
let upload;

// if it is running in production mode, store images in AWS S3
if (prod) {
    AWS.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        region: 'ca-central-1',
    });

    upload = multer({
        //storage: 어디다가 저장 할지?  multerS3: S3에 저장.
        storage: multerS3({
            s3: new AWS.S3() as any, /// 이렇게 하면 S3 권한을 얻은 것임
            bucket: "sharethoughts", /// 이건 s3에서 설정했던 bucket 이름
            key(req, file, cb) {
                cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`); // image를 저장하는 위치, 이름 설정 (original이라는 폴더안에 해당 설정대로 image가 저장 됨.)
            },
        }),
        limits: { fileSize: 20 * 1024 * 1024 }, // 20MB -> file 크기 제한
    });
}
// if it is running in development mode, store images in the backend 'uploads' folder
else {
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
                done(null, `${basename}_${new Date().getTime()}${ext}`); // 이렇게 하면 kevin_21091232.png 로 저장 됨.
                // done(null, basename + "_" + new Date().getTime() + ext); // 이렇게 하면 kevin_21091232.png 로 저장 됨.
            },
        }),
        limits: { fileSize: 20 * 1024 * 1024 }, // 20MB -> file 크기 제한
    });
}


// POST A POST (without image)
//POST /post
//upload.none()을 적는 이유는 formData형태로 front-end에서 요청을 받는데, image없이 text 형태로만 받기 때문에, upload.none()을 넣어줘야함.
//추가로 해당요청은 formData에서 실제 image가 아닌 image의 src들만을 받기 때문에, 여기서는 upload.none()으로 처리 해주고, 실제 이미지는 image post 하는 요청에서 실제 파일을 업로드하는 처리를 함. 
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        // check if content includes hashtag
        const hashtags = req.body.content.match(/#[^\s#]+/g);

        const createdPost: any = await Post.create({
            content: req.body.content,
            userId: req.user!.id
        });

        //아래는 만약 hashtag가 있는경우, #를 제거한 값들을 Hashtag db에 등록해 주는 코드
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map((hashtag: string) =>
                    Hashtag.findOrCreate({ where: { name: hashtag.slice(1).toLowerCase() } })
                )
            );

            //위 result의 결과는 이런 형태가 됨. [[노드, true], [리액트, true]]
            //따라서 아래의 경우 addHashtags뒤에 바로 addHashtags(result)가 아닌 아래처럼 반복문을 돌려 배열의 첫번째 값으로 등록을 해줘야 함.
            await createdPost.addHashtags(result.map((v) => v[0]));
        }

        // If the formData includes image paths, then add images
        if (req.body.image) {
            if (Array.isArray(req.body.image)) {
                // 이미지를 여러개 올리면 'image: [kevin.png, jaehan.png]' 이런식으로 배열로 받아 짐.
                const images = await Promise.all(
                    req.body.image.map((image: string) => Image.create({
                        src: image,
                        postId: createdPost.id
                    })),
                );
                // 위는 req.body.image의 배열을 각각 Image db에 src라는 값으로 파일 주소를 등록 해주는 코드. 위의 작업은 모두 promise이기 때문에 한번에 Promise.all 로 비동기 작업 시켜 주기 => 이건 파일을 저장 하는 코드가 아닌, 파일 주소만 text로 db에 저장이 됨.
                await createdPost.addImages(images);
                //위 처럼 작성 하면 바로 위에서 const post로 해서 작성 해준 post 값에 해당 images가 추가가 됨.
            } else {
                // 이미지를 하나만 올리면 'image: kevin.png' 이런식으로 배열로 안받아지고 바로 주소가 받아 짐.
                const image = await Image.create({
                    src: req.body.image,
                    postId: createdPost.id
                });
                await createdPost.addImage(image);
                //위 처럼 작성 하면 바로 위에서 const post로 해서 작성 해준 post 값에 해당 image가 추가가 됨.
            }
        }

        // 기존 post로는 image, comment, user 등이 없기 때문에 아래처럼 해당 값들을 추가해서 응답을 해줘야 함.
        //아래 where:{id:post.id} 로 찾아지는 post는 바로 위에 새로 생성한 post를 찾는 것임.
        const fullPost = await Post.findOne({
            where: { id: createdPost.id },
            include: [
                {
                    model: Image
                },
                {
                    model: Comment,
                    as: 'comments',
                    include: [{
                        model: User,
                        attributes: ["id", "nickname"]
                    }]
                },
                {
                    model: User,
                    as: 'author',
                    attributes: ["id", "nickname"]
                }
            ]
        });
        return res.status(201).json(fullPost);
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

//Post image(s)
//Post /post/images
router.post('/images', isLoggedIn, upload.array("image"), async (req, res, next) => {

    // Already physical images are uploaded to the backend, or s3    
    console.log(req.files); // upload.array("image")를 통해 이미 업로드 된 파일을 확인 할 수 있음.


    const files = req.files as Express.Multer.File[];
    if (prod) {
        return res.json(files.map(file => file.location));

        // res.json(req.files.map((v) => v.location)); // 해당 부분은 upload 된 image들의 파일 이름을 front로 다시 보내주는 코드 // 기존 filename에서 location으로 변경 해 주기.
        //    res.json(req.files.map((v) => v.location.replace(/\original\//, "thumb/"))); 
        // backend에서 resizing 된 image를 front로 보내주기 위해 original이름을 포함 한 이미지 대신 이미지를 thumb이름을 포함한 이미지로 찾아서 front로 보내주기.
    }
    return res.json(files.map(file => file.filename));
});


//Update image table's src data
//PATCH post/image/:src
/** 추후 아래 코드 새로 작성 해서 수정 하기
// router.patch('/image/:src', isLoggedIn, async (req, res, next) => {
//     try {
//         // const image = await Image.findOne({
//         //     where: {src: req.params.src}
//         // });
//         /// 이 동작은 기존 코드를 참고하지말고, 한번 front-end에서 어떻게 값을 보내고, 어떤 동작을 원하는지 체크 한 후 업데이트 하기. (현재 기존 backend코드는 그냥 postId만 null로 할 뿐, src는 업데이트 하지 않고 있음. )
//     } catch (error) {
//         console.error(error);
//         return next(error);

//     }
// });
 */


//Post a comment
//POST post/:postId/comment
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.postId);

        if (!post) {
            return res.status(403).send("You cannot post a comment on the not exist post");
        }

        const comment = await Comment.create({
            content: req.body.content,
            postId: +req.params.postId,
            userId: req.user!.id,
        });

        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [
                { model: User, attributes: ["id", "nickname"] }
            ]
        });
        return res.status(201).json(fullComment);
    } catch (error) {
        console.error(error);
        return next(error);
    }
});


// Post a retweet post
//POST post/:postId/retweet
router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId },
            include: [{
                model: Post,
                as: "retweet"
            }]
        });
        if (!post) {
            return res.status(403).send("You cannot create a retweet post on the not exist post");
        }
        //확인해야 할것 : 리트윗 하려는게 본인게시글인 경우 || 해당 게시글이 retweet 된 게시글인 경우 && 다른 유저가 본인의 글을 retweet한것을 다시 본인이 리트윗 하는 경우
        //두번쨰 post.Retweet~ 이 조건문을 위해서 위에서 Retweet값을 include해서 post를 찾았음.

        if (req.user!.id === post.userId || (post.retweet && req.user!.id === post.retweet.userId)
        ) {
            return res.status(403).send("You cannot retweet your own post");
        }

        //아래는 post.RetweetId가 있는 것은 남이 retweet 한 글 이라는 뜻 || 아니면 null이므로 그냥 게시글의 id 작성
        const retweetTargetId = post.retweetId || post.id;

        // 아래는 내가 한번 retweet 한 게시글을 다시 retweet 하는것을 막아 줌
        const existPost = await Post.findOne({
            where: {
                userId: req.user!.id,
                retweetId: retweetTargetId
            }
        });
        if (existPost) {
            return res.status(403).send("You already retweeted this post.");
        }

        //retweet row 생성 하기
        const retweet = await Post.create({
            userId: req.user!.id,
            retweetId: retweetTargetId,
            content: "retweet"
        });


        //front로 보내기 전, retweet생성된 값을 포함해서, 필요한 모든 값을 front로 전달 하기 (또한 위처럼만 작성하면 내가 어떤 게시글을 retweet했는지가 안나옴. 따라서 아래와 같이 다 찾은 뒤 프론트로 보내기)
        const retweetWithPreviousPost = await Post.findOne({
            where: { id: retweet.id },
            include: [{
                model: Post,
                as: "retweet",
                include: [
                    {
                        model: User,
                        as: "author",
                        attributes: ["id", "nickname"]
                    },
                    {
                        model: Image,
                    }
                ]
            },
            {
                model: User,
                as: "author",
                attributes: ["id", "nickname"]
            },
            {
                model: User,
                as: "likers",
                attributes: ["id"]
            },
            {
                model: Image
            },
            {
                model: Comment,
                as: "comments",
                include: [
                    {
                        model: User,
                        // as: "author",
                        attributes: ["id", "nickname"]
                    }
                ]
            }
            ]
        });
        return res.status(201).json(retweetWithPreviousPost);
    } catch (error) {
        console.error(error);
        return next(error);
    }
});


// Retreive a post using postId
//GET post/:postId
router.get("/:postId", async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.postId);

        if (!post) {
            return res.status(404).send("This post is not exist");
        }

        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "nickname"],
                },
                {
                    model: Image
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ["id", "nickname"],
                            order: [["createdAt", "DESC"]]
                        }
                    ]
                },
                {
                    model: User,
                    as: 'likers',
                    attributes: ["id"]
                },
                {
                    model: Report
                },
            ]
        });
        res.status(200).json(fullPost);

    } catch (error) {
        console.error(error);
        return next(error);

    }
});



export default router;