
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import * as session from "express-session";
import * as hpp from "hpp";
import * as morgan from "morgan";
import * as passport from "passport";
import * as path from "path";
import helmet from "helmet";

import db from "./models/index";
// // @ts-ignore
// import passportConfig from "./passport";
// // @ts-ignore
// import hashtagRouter from "./routes/hashtagRoute";
// // @ts-ignore
// import postRouter from "./routes/postRoute";
// // @ts-ignore
// import postsRouter from "./routes/postsRoute";
// // @ts-ignore
// import reportRouter from "./routes/reportRoute";
// // @ts-ignore
// import userRouter from "./routes/userRoute";

dotenv.config();
const prod = process.env.NODE_ENV === "production";

const app = express();

db.sequelize
    .sync({ force: false })
    .then(() => {
        console.log("DB Connection Success");
    })
    .catch(console.error);

// passportConfig();

if (prod) {
    app.use(morgan("combined")); // combined는 더 정확한 정보를 줌 (접속자의 ip등도 포함): 만약 특정 ip 접속자가 디도스와 같은 공격을 하는 경우 차단 가능 함. 따라서 배포용은 combined로 실행하기
    app.use(hpp()); //hpp와 아래 helmet은 보안에 도움되는 package이므로 node에서 배포하는 경우는 무조건 이 두개는 필수라고 생각하고 넣어주기
    app.use(helmet()); //helmet과 위 hpp는 보안에 도움되는 package이므로 node에서 배포하는 경우는 무조건 이 두개는 필수라고 생각하고 넣어주기
    app.use(
        cors({
            origin: ["http://sharethoughts.online"],
            credentials: true,
        }),
    );
} else {
    app.use(morgan("dev"));
    app.use(
        cors({
            origin: true,
            credentials: true,
        }),
    );
}

app.use("/", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
    session({
        // 만약 추후 https 적용한다면 그때 변경 하기
        saveUninitialized: false,
        resave: false,
        secret: process.env.COOKIE_SECRET as string,
        cookie: {
            /// cookie 관련 설정
            httpOnly: true, //이거는 javascript로 조작 못하게 하는 설정
            secure: false, //이거는 https 접속 시 true로 해 줘야 함
            domain: prod ? ".sharethoughts.online" : undefined, /// domain앞에 .을 붙여주면 sharethoughts.online과 api.sharethoughts.online 사이에 cookie 공유가 가능 해짐
        },
    }),
);

app.use(passport.initialize());
app.use(passport.session());

// app.get("/", (req: express.Request, res: express.Response) => {
//     res.send("main page");
// });

// app.get("/", (req: express.Request, res: express.Response) => {
//     res.send("hello api");
// });

// app.use("/post", postRouter);
// app.use("/posts", postsRouter);
// app.use("/user", userRouter);
// app.use("/hashtag", hashtagRouter);
// app.use("/report", reportRouter);

app.listen(prod ? process.env.PORT : 3065, () => {
    console.log(`server is running on ${process.env.PORT}!!`);
});
