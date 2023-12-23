import * as dotenv from "dotenv";

dotenv.config();

type IConfig = {
    username: string;
    password: string,
    database: string,
    host: string,
    dialect: string
}

interface IConfigGroup {
    development: IConfig;
    test: IConfig;
    production: IConfig;
}

const dbConfig: IConfigGroup = {
    development: {
        username: "root",
        password: process.env.DB_PASSWORD!,
        database: "share-thoughts",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    test: {
        username: "root",
        password: process.env.DB_PASSWORD!,
        database: "share-thoughts",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    production: {
        username: "root",
        password: process.env.DB_PASSWORD!,
        database: "share-thoughts",
        host: "127.0.0.1",
        dialect: "mysql",
    },
}

export default dbConfig;
