import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Comment } from "./comment";
import { Image } from "./image";
import { User } from "./user";
import { Report } from "./report";
import { Hashtag } from "./hashtag";

interface PostCreationAttributes {
    content: string,
    userId: number,
    retweetId?: number,
}

@Table({
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
})
export class Post extends Model<Post, PostCreationAttributes> {
    //Columns
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    content!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    })
    lockStatus!: boolean;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    appeal?: string;

    // Associations
    @HasMany(() => Comment, { as: 'comments' })
    comments!: Comment[];

    @HasMany(() => Image)
    images!: Image[];

    @HasMany(() => Report)
    reports!: Report[];

    @ForeignKey(() => User,)
    // @Column
    userId!: number;

    // @BelongsTo(() => User)
    // user!: User;
    @BelongsTo(() => User, { foreignKey: 'userId', as: 'author' })
    user!: User;

    @ForeignKey(() => Post)
    // @Column
    retweetId?: number;

    // @BelongsTo(() => Post, { as: "Retweet" })
    @BelongsTo(() => Post, { as: "retweet", foreignKey: 'retweetId' })
    retweet?: Post;

    // @BelongsToMany(() => Hashtag, { through: "PostHashtag", foreignKey: "PostId", })
    // hashtags!: Hashtag[];
    @BelongsToMany(() => Hashtag, { through: "PostHashtag", foreignKey: "postId", otherKey: "hashtagId" })
    hashtags!: Hashtag[];

    @BelongsToMany(() => User, { through: "Like", as: "likers", foreignKey: "postId", otherKey: "userId" })
    likers!: User[];



}

