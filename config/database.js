const Sequelize = require('sequelize');

const db = new Sequelize('covid19', 'postgres', 'LeKWASSAkwassa001',{
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000
    },
    
});

module.exports = db;