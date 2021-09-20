const passport = require("passport");
const bcrypt = require("bcrypt");
const { Strategy: LocalStrategy } = require("passport-local"); //해당 {변수:새변수} 쓰는 건 구조분해 할당에서 받은 변수의 이름을 임의로 바꾸는 방법
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        //이게 front에서 login을 보낼 때 email로 보내고 password로 보내기 때문에 이렇게 기재 됨. (front에서는 data.email, data.password로 넘어오고, back에서는 req.body.email, req.body.password로 받아짐. 그 email, password를 여기 기재하는 것임) => 만약 front에서 보내는 이름이 email이 아닌 id면, usernameField: "id" 이렇게 기재 되어야 함.
        //req.body 에 대한 설정
      },
      async (email, password, done) => {
        //위 req.body에 대한 함수 => login에 대한 전략 세우는 곳

        try {
          //첫번 째, login하면 email이 진짜 있는 지 확인 해야 함.
          const existUser = await User.findOne({
            where: {
              email: email,
            },
          });
          if (!existUser) {
            //아래와 같이 문제가 생기면 바로 res.send로 응답을 보내는 것이 아닌 passport에서는 done으로 결과를 판단 함.. done()안에 들어가는 세개의 값은, 각각 done(서버에러, 성공, 클라이언트에러(보내는 측의 잘못: 사용자가 없는데 보내는측에서 존재하지 않는 사용자로 로그인 하려 했기 때문에 사용자 잘못이 됨))
            return done(null, false, { reason: "User is not exist." });
          }
          //사용자는 존재한다면 이제는 password를 비교해야 함. 사용자 등록시 bcrypt로 저장했기 때문에 bcrypt를 이용해서 비교 함. 역시나 비동기 함수이므로 await 붙이기
          // (bcrypt.compare(사용자가 login할때 입력했던 password, DB에 저장된 해당 email을 가진 user의 password))
          const result = await bcrypt.compare(password, existUser.password);
          //만약 result가 true인 경우: password가 매칭이 된 경우, 이미 위에서 email이 존재해서 넘어왔고, 그 email을 가진 user와 password가 같으므로 done에서 두번째 인자인 성공부분에 existUser의 정보로 전달 함.
          if (result) {
            return done(null, existUser);
          }
          //위에 result가 false이므로 맞지않는 암호임, 따라서 아래의 방식으로 client잘못의 reason으로 맞지않는 암호라는 내용을 전달 함.
          return done(null, false, { reason: "Wrong password" });
        } catch (error) {
          console.error(error);
          //지금처럼 try, catch에서 오류가 생기는 경우는 catch로 넘어가는 error가 서버 에러 이므로 done에서 첫번째 인자인 서버에러 부분에 error의 값을 넘김
          return done(error);
        }
      },
    ),
  );
};
