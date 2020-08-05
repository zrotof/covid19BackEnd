const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const Continent = require('../models/continent');


const Country = db.define('Countries',{
    cyName: {
        type: DataTypes.STRING
        
    },
    cyPopulation: {
        type: DataTypes.BIGINT
        
    },cyFlag: {
        type: DataTypes.STRING

    },cyApiId:{
        type: DataTypes.INTEGER
    }
},
{
    freezeTableName: true,
    tableName: 'Countries'
});


Country.belongsTo(Continent, 
    {
        foreignKey: 'ct_id',

    });

module.exports = Country ; 