const Sequelize = require("sequelize");

//아래는 환경 변수 설정: 환경변수에 아무것도 설정이 안되있을때는 기본값인 development로 실행 함. 배포시는 production으로 변경 함.
const env = process.env.NODE_ENV || "development";
//config/config의 내용 중 [env] (해당 []는 array에서 object 중 development), 즉, 위에서 env는 developement였으므로 development와 관련된 내용들 (username, password 등 등)을 가져옴.
const config = require("../config/config")[env];

const db = {};

//아래와 같이 선언하면 sequelize가 node와 mysql을 연결 해 줌.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.Comment = require("./comment")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);
db.Report = require("./report")(sequelize, Sequelize);

//위와 같이 연결만 하면 되는게 아니고, database에서 table을 만들어 줘야 함.
Object.keys(db).forEach((modelName) => {
  console.log("modelName", modelName);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
