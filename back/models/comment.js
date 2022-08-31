const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        // UserId: 1
        // PostId: 3
      },
      {
        modelName: "Comment",
        tableName: "comments",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 저장
        sequelize,
      },
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  }
};

/**
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      //UserId: {} belongsTo가 속해 있는 column 이름으로 자동 생성
      //PostId: {} belongsTo가 속해 있는 column 이름으로 자동 생성
    },
    {
      //두번째 객체는 해당 모델에 대한 setting
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", //한글 저장되기위한 setting 값 이 위 두개(charset, collate), emoticon까지 넣고 싶으면 utf8mb4로 사용 해야 함.;
    },
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User); //UserId:{} 생성 함
    db.Comment.belongsTo(db.Post); //PostId:{} 생성 함.
  };

  return Comment;
};
 */
