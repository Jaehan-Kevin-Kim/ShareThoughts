import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Comment } from "./comment";
import { Post } from "./post";
import { Report } from "./report";
import { HasManyGetAssociationsMixin } from "sequelize";

interface UserCreationAttributes {
    email: string;
    password: string;
    nickname: string;
}

@Table({
    charset: "utf8",
    collate: "utf8_general_ci"
})
export class User extends Model<User, UserCreationAttributes
> {
    @Column({
        type: DataType.STRING(30),
        allowNull: false,
        unique: true,
    })
    email!: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: false,
    })
    nickname!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    password!: string;

    // getFollowers!: HasManyGetAssociationsMixin<User>;

    // Association
    @HasMany(() => Post, { as: 'posts' })
    posts!: Post[];

    @HasMany(() => Comment)
    comments!: Comment[];

    @HasMany(() => Report, { as: 'postUser' })
    postUsers!: Report[];

    @HasMany(() => Report, { as: 'reportUser' })
    reportUsers!: Report[];

    @BelongsToMany(() => Post, { through: "Like", as: "liked", foreignKey: 'userId', otherKey: "postId" })
    liked!: Post[];

    @BelongsToMany(() => User, { through: "Follow", as: "followers", foreignKey: 'followingId', otherKey: 'followerId' })
    followers!: User[];

    @BelongsToMany(() => User, { through: "Follow", as: "followings", foreignKey: "followerId", otherKey: 'followingId' })
    followings!: User[];

}