import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Comment } from "./comment";
import { Post } from "./post";
import { Report } from "./report";

@Table({
    charset: "utf8",
    collate: "utf8_general_ci"
})
export class User extends Model<User> {
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

    // Association
    @HasMany(() => Post)
    posts!: Post[];

    @HasMany(() => Comment)
    comments!: Comment[];

    @HasMany(() => Report, { as: 'PostUser' })
    postUsers!: Report[];

    @HasMany(() => Report, { as: 'ReportUser' })
    reportUsers!: Report[];

    @BelongsToMany(() => Post, { through: "Like", as: "Liked", foreignKey: 'userId', otherKey: "postId" })
    liked!: Post[];

    @BelongsToMany(() => User, { through: "Follow", as: "Followers", foreignKey: 'followingId', otherKey: 'followerId' })
    followers!: User[];

    @BelongsToMany(() => User, { through: "Follow", as: "Followings", foreignKey: "followerId", otherKey: 'followingId' })
    followings!: User[];

}