import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Post } from "./post";

@Table({
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci"
})
export class Hashtag extends Model<Hashtag> {
    // Columns
    @Column({
        type: DataType.STRING(20),
        allowNull: false,
    })
    name!: string;

    // Assoicates


    // @BelongsToMany(() => Post, { through: 'PostHashtag', foreignKey: 'HashtagId', })
    // posts!: Post[];
    @BelongsToMany(() => Post, { through: 'PostHashtag', foreignKey: 'hashtagId', otherKey: 'postId' })
    posts!: Post[];


}