module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      // 자동으로 Images로 mysql에 table이 생성 됨.
      //id가 기본적으로 들어있고 자동으로 올라가므로 굳이 안 넣어줘도 됨.
      src: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      //두번째 객체는 해당 모델에 대한 setting
      charset: "utf8",
      collate: "utf8_general_ci", //한글 저장되기위한 setting 값 이 위 두개(charset, collate);
    },
  );

  Image.associate = (db) => {};

  return Image;
};
