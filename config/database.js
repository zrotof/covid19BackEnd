const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL,{
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    port: process.env.DATABASE_PORT,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000
    },
    
});

module.exports = db;