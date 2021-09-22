const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const postRouter = require("./routes/postRoute");
const userRouter = require("./routes/userRoute");
const db = require("./models");
const passport = require("passport");
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

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
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
app.get("/posts", (req, res) => {
  res.json([
    { id: 1, content: "hello" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
});

app.use("/post", postRouter);
app.use("/user", userRouter);

//next()함수 안에 뭐라도 내용이 들어있으면 바로 error 처리하는 middleware로 보내짐 (next(asdf)) => 기본적인 error 처리 middleware는 원래 자체에 존재 함. 위치는 app.listen 바로 위. 하지만 직접 특별한 처리를 위해 아래 위치에 적어 줄 수도 있음.
// app.use((err,req,res,next)=>{})

app.listen(3065, () => {
  console.log("server is running!!");
});

// app.get -> 가져오다(조회)
// app.post -> 생성하다
// app.put -> 전체 수정 (eg. 통째로 뭔가를 덮어 씌움. 잘 쓰이지는 않음.)
// app.delete -> 제거
// app.options -> 찔러보기 (요청을 할 수 있는 지 여부 등 확인 하는 방법)
// app.patch -> 부분 수정 (eg. 사용자 정보 중 nickname만 수정 하는 경우)
// app.head -> 헤더만 가져오기(header/body)
