import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "./post";
import { User } from "./user";

@Table({
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
})
export class Report extends Model<Report> {
    // Columns
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    reason!: string;

    // Associations
    @ForeignKey(() => Post)
    postId!: number;

    @BelongsTo(() => Post, { foreignKey: 'postId' })
    post!: Post;

    @ForeignKey(() => User)
    postUserId!: number;

    @BelongsTo(() => User, { as: 'PostUser', foreignKey: 'postUserId' })
    postUser!: User;

    @ForeignKey(() => User)
    reportUserId!: number;

    @BelongsTo(() => User, { as: 'ReportUser', foreignKey: 'reportUserId' })
    reportUser!: User;
}