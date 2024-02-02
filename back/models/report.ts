import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "./post";
import { User } from "./user";


interface ReportCreationAttributes {
    reason: string;
    reportUserId: number,
    postId: number,
    postUserId: number,
}

@Table({
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
})
export class Report extends Model<Report, ReportCreationAttributes> {
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

    @BelongsTo(() => User, { as: 'postUser', foreignKey: 'postUserId' })
    postUser!: User;

    @ForeignKey(() => User)
    reportUserId!: number;

    @BelongsTo(() => User, { as: 'reportUser', foreignKey: 'reportUserId' })
    reportUser!: User;
}