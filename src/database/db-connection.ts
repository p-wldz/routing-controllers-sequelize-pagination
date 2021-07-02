import { Sequelize } from "sequelize-typescript";
import { MysqlConfig } from '../types/config'
import { configs } from '../config'
import Voivodeship from "./models/voivodeship.db.model";
import County from "./models/county.db.model";
import Place from "./models/place.db.model";
import User from "./models/user.db.model";

const mysqlConfig = configs.mysql as MysqlConfig

const sequelize =  new Sequelize({
    host: mysqlConfig.host[0],
    database: mysqlConfig.database,
    username: mysqlConfig.user,
    password: mysqlConfig.password,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    models: [
        Voivodeship,
        County,
        Place,
        User
    ], 
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: mysqlConfig.logging,
});

export default sequelize;