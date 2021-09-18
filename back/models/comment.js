module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      //두번째 객체는 해당 모델에 대한 setting
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", //한글 저장되기위한 setting 값 이 위 두개(charset, collate), emoticon까지 넣고 싶으면 utf8mb4로 사용 해야 함.;
    },
  );
  Comment.associate = (db) => {};

  return Comment;
};
