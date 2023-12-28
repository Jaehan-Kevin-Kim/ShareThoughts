import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "./post";

@Table({
    charset: "utf8",
    collate: "utf8_general_ci"
})
export class Image extends Model<Image> {
    // Columns
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    src!: string;

    // Associations
    @ForeignKey(() => Post)
    postId!: number;

    @BelongsTo(() => Post, { foreignKey: 'postId' })
    post!: Post;
    // @BelongsTo(() => Post)
}