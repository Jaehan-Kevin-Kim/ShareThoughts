/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

type IConfig = {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
};

interface IConfigGroup {
    development: IConfig;
    test: IConfig;
    production: IConfig;

    [key: string]: IConfig; // Add index signature
}

const dbConfig: IConfigGroup = {
    development: {
        username: 'root',
        password: process.env.DB_PASSWORD!,
        database: 'share-thoughts',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    test: {
        username: 'root',
        password: process.env.DB_PASSWORD!,
        database: 'share-thoughts',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: process.env.DB_PASSWORD!,
        database: 'share-thoughts',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};

export default dbConfig;
