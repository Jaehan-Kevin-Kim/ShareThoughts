const express = require("express");
const app = express();
const cors = require("cors");
const postRouter = require("./routes/postRoute");
const userRouter = require("./routes/userRoute");
const db = require("./models");
const passportConfig = require("./passport");

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
    // credentials: false,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
