module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define(
    "Report",
    {
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    },
  );
  Report.associate = (db) => {
    db.Report.belongsTo(db.User, { as: "PostUser" });
    db.Report.belongsTo(db.User, { as: "ReportUser" });
    db.Report.belongsTo(db.Post);
  };

  return Report;
};
