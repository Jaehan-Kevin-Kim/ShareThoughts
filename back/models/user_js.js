module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // 자동으로 users로 mysql에 table이 생성 됨.
      //id가 기본적으로 들어있고 자동으로 올라가므로 굳이 안 넣어줘도 됨.
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수,
        unique: true, //고유한 값
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false, //필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, //필수
      },
    },
    {
      //두번째 객체는 해당 모델에 대한 setting
      charset: "utf8",
      collate: "utf8_general_ci", //한글 저장되기위한 setting 값 이 위 두개(charset, collate);
    },
  );

  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
    db.User.hasMany(db.Report, { as: "PostUser" });
    db.User.hasMany(db.Report, { as: "ReportUser" });
  };

  return User;
};
