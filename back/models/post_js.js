module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lockStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      appeal: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      //두번째 객체는 해당 모델에 대한 setting
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", //한글 저장되기위한 setting 값 이 위 두개(charset, collate), emoticon까지 넣고 싶으면 utf8mb4로 사용 해야 함.;
    },
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); //UserId: {} 생성 함.
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Post.belongsTo(db.Post, { as: "Retweet" }); //Retweet 관련 이렇게 해주면 자동으로 생기는 PostId column이 RetwetId로 변경이 되서 생김.
    db.Post.hasMany(db.Report);
  };

  return Post;
};
