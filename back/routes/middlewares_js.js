exports.isLoggedIn = (req, res, next) => {
  //아래에 req.isAuthenticated()이건 passport 에서 제공 하는 함수인데, 이게 true이면 login 한 상태임.
  if (req.isAuthenticated()) {
    //next()는 두가지 사용 방법이 있음
    //1. ERROR 처리 했을때 처럼 next()함수 안에 뭐라도 내용이 들어있으면 바로 error 처리하는 middleware로 보내짐 (next(asdf)) => 기본적인 error 처리 middleware는 원래 자체에 존재 함. 위치는 app.listen 바로 위. 하지만 직접 처리를 적어 줄 수도 있음.
    //2. 그냥 next()로만 쓰이면 그 다음 middleware로 넘어감. 지금 case의 다음 middleware는 userRoute.js를 보면 isLoggedIn이거나 아닐때 next()가 실행되면 그 다음 middleware인 (req,res,next)에 걸림. (req,res,next)=>{}도 middleware임
    next();
  } else {
    res.status(401).send("Login is required");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  //아래에 req.isAuthenticated()이건 passport 에서 제공 하는 함수인데, 이게 true이면 login 한 상태임.
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("This page is allowed only by users who logged in");
  }
};
