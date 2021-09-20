const passport = require("passport");
const local = require("./local");

module.exports = () => {
  passport.serializeUser(() => {});

  passport.deserializeUser(() => {});

  local(); //local.js에서 작성 된 localStrategy를 불러옴.
};
