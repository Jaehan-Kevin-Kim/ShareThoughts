import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user";
import { Post } from "./post";

interface CommentCreationAttributes {
    content: string,
    userId: number,
    postId: number,
}


@Table({
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci"
})
export class Comment extends Model<Comment, CommentCreationAttributes> {
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    content!: string;


    // Associate
    @ForeignKey(() => User)
    userId!: number;

    @BelongsTo(() => User, { foreignKey: 'userId' })
    user!: User;


    @ForeignKey(() => Post)
    postId!: number;

    @BelongsTo(() => Post, { foreignKey: 'postId', as: 'post' })
    post!: Post;
}