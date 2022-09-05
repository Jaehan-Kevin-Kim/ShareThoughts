const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const postRouter = require("./routes/postRoute");
const postsRouter = require("./routes/postsRoute");
const userRouter = require("./routes/userRoute");
const hashtagRouter = require("./routes/hashtagRoute");
const db = require("./models");
const passport = require("passport");
const helmet = require("helmet");
const hpp = require("hpp");
const passportConfig = require("./passport");
const app = express();

dotenv.config();

//promise임
db.sequelize
  .sync()
  .then(() => {
    console.log("DB Connection Success");
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined")); // combined는 더 정확한 정보를 줌 (접속자의 ip등도 포함): 만약 특정 ip 접속자가 디도스와 같은 공격을 하는 경우 차단 가능 함. 따라서 배포용은 combined로 실행하기
  app.use(hpp()); //hpp와 아래 helmet은 보안에 도움되는 package이므로 node에서 배포하는 경우는 무조건 이 두개는 필수라고 생각하고 넣어주기
  app.use(helmet()); //helmet과 위 hpp는 보안에 도움되는 package이므로 node에서 배포하는 경우는 무조건 이 두개는 필수라고 생각하고 넣어주기
} else {
  app.use(morgan("dev"));
}

app.use(
  cors({
    // origin: true,
    origin: [
      "http://localhost:3050",
      "http://sharethoughts.online",
      "http://99.79.74.239",
    ], //원래는 origin: true로 사용했지만, localhost:3050으로 요청을 받았었다는 가정하에, 저 값을 놔두고, 추가로 추후에는 sharethought.com에서 요청을 받을 것이기 때문에 해당 값도 추가해 두기 (http or https 여부는 추후 결정될 것이므로 우선 붙이지 말기)
    credentials: true,
  }),
);

app.use("/", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    // 만약 추후 https 적용한다면 그때 변경 하기
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("main page");
});

app.get("/", (req, res) => {
  res.send("hello api");
});

app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.use("/hashtag", hashtagRouter);

//next()함수 안에 뭐라도 내용이 들어있으면 바로 error 처리하는 middleware로 보내짐 (next(asdf)) => 기본적인 error 처리 middleware는 원래 자체에 존재 함. 위치는 app.listen 바로 위. 하지만 직접 특별한 처리를 위해 아래 위치에 적어 줄 수도 있음.
// app.use((err,req,res,next)=>{})

/////// For production
app.listen(80, () => {
  console.log("server is running!!");
});

/////// For development
// app.listen(3065, () => {
//   console.log("server is running!!");
// });

// app.get -> 가져오다(조회)
// app.post -> 생성하다
// app.put -> 전체 수정 (eg. 통째로 뭔가를 덮어 씌움. 잘 쓰이지는 않음.)
// app.delete -> 제거
// app.options -> 찔러보기 (요청을 할 수 있는 지 여부 등 확인 하는 방법)
// app.patch -> 부분 수정 (eg. 사용자 정보 중 nickname만 수정 하는 경우)
// app.head -> 헤더만 가져오기(header/body)
