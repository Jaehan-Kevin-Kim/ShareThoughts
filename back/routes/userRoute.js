const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Post } = require("../models");

// Post /user/login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    //아래는 server에러인 경우
    if (err) {
      console.error(err);
      return next(err);
    }
    //아래는 client에러인 경우
    if (info) {
      return res.status(401).send(info.reason);
    }
    //아래는 위에서 에러들 없이 통과 시(이미 우리서비스에서는 다 통과 한 상황), 한번 더 passport에 로그인을 위해 요청하는 과정. 따라서 아래는 passport에서 login 하는것 임. 그리고 아래 user에는 이전 done에서 user 객체 정보 넣었으므로, 그 정보가 들어 있음.
    return req.login(user, async (loginErr) => {
      //아래는 거의 발생 할 확률없음. (위에서 로그인 성공했는데 passport에서 로그인 실패하는 경우)
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      //최종적으로 위 passport 자체 login 과정도 성공 했으면 이제 아래 코드로 user 객체의 정보를 응답해서 보내 줌.

      //user 값을 전체를 보내면 password도 포함이 되어있으므로, password값을 빼고 보내기 아래 해당 코드 작성

      //아래에 보면 위에서 user를 가져왔는데 왜 또 User.findOne({})으로 user를 새로 가져오냐면, 첫번째 user 값 중 password는 제거할 거고, 둘째 Posts, Followings, Followers를 추가할거기 때문에, 새로운 User를 생성해서 해당 값을 response로 보내주기 위해서 새로 User를 가져와서 그걸 변수에 넣음.
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        //아래 attributes는 db의 column 중 원하는 것만 가져올 수 있게 해주는 option임 이렇게 하면 (password, createdAt, updatedAt)을 뺴고 기재해둔 (id, nickname, email)값들을 가져오게 됨.
        // attributes: ["id", "nickname", "email"],
        //혹은 특정 값만 제외하고 나머지를 가져오고 싶은 경우는 아래와 같이 작성 함. (아래와 같이 하면 password 빼고 다 가져오는 코드가 됨.)
        attributes: { exclude: ["password"] },

        //아래 include는 추가로 더 넣어서 보내주는 것.
        //{model: Post}이건 User db에서 hasMany(Post)로 include 되어있던 거를 그대로 가져오면 됨. 그 외에 as: Followers, as: Followings이건 역시 user DB에서 User의 값들을 가져오는건데 여기서 as로 썼던 그 값 그대로 가져와야 함. (만약 model에서 as 썼으면 include에서도 똑같이 as의 값들을 가져와야 함)
        include: [
          { model: Post },
          { model: User, as: "Followers" },
          { model: User, as: "Followings" },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// Post /user/logout
router.post("/logout", async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.status(200).send("okay");
});

// Post /user/
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
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3050");
    // res.setHeader("Access-Control-Allow-Origin", "*"); 이건 모든 port를 다 받아들이는 것
    // res.send("ok"); 이렇게 간단하게 혹은 아래와 같이 상태코드와 함께 보내 줄 수도 있음.
    res.status(201).send("okay"); //201은 생성 성공의 뜻.
  } catch (error) {
    console.error(error);
    next(error); //status 500
  }
});
module.exports = router;
