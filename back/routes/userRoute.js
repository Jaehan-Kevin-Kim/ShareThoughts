const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");

//Post /user/
router.post("/", async (req, res, next) => {
  try {
    const existUser = await User.findOne({
      where: {
        //찾을때의 조건은 where안에 넣음
        email: req.body.email,
      },
    });
    console.log("existUser", existUser);
    if (existUser) {
      //반드시 응답은 한번 만 보내야 하기 때문에 응답 시 return을 붙이기 (만약 res.send 두번 보내게 되면 "can't set headers already sent"라는 error message가 출력 됨. 혹은 if/else로 조건문 만들어서 return을 안쓰는 방법도 있음.)
      return res.status(403).send("This email is already registered");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3050");
    // res.setHeader("Access-Control-Allow-Origin", "*"); 이건 모든 port를 다 받아들이는 것
    // res.send("ok"); 이렇게 간단하게 혹은 아래와 같이 상태코드와 함께 보내 줄 수도 있음.
    res.status(201).send("okay"); //201은 생성 성공의 뜻.
  } catch (error) {
    console.error(error);
    next(error); //status 500
  }
});
module.exports = router;
