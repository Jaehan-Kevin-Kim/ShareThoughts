import { Sequelize } from 'sequelize-typescript';

import { Comment } from './comment';
import { Hashtag } from './hashtag';
import { Image } from './image';
import { Post } from './post';
import { Report } from './report';
import { User } from './user';

const env = process.env.NODE_ENV || 'development';
// const sequelizeConfig = config[env];
const sequelizeConfig = require("../config/config")[env];
// const sequelizeConfig = dbCofig[env];



export const sequelize = new Sequelize({
    ...sequelizeConfig,
    models: [Comment, User, Post, Hashtag, Image, Report], // 모델을 여기에 추가
});

interface Db {
    Comment: typeof Comment;
    User: typeof User;
    Post: typeof Post;
    Hashtag: typeof Hashtag;
    Image: typeof Image;
    Report: typeof Report;
    [key: string]: any; // 추가: 문자열 키에 대한 인덱스 서명
};

const db: Db = {
    sequelize,
    Sequelize,
    Comment,
    User,
    Post,
    Hashtag,
    Image,
    Report,
};

// 연관 관계 설정
Object.keys(db).forEach((modelName) => {
    const model = db[modelName as keyof typeof db];
    if (model.associate) {
        model.associate(db);
    }
});

export default db;

