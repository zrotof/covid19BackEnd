const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const World = db.define('World',{
    
    wPopulation: {
        type: DataTypes.BIGINT
        
    },
    

    wCases:{
        type: DataTypes.BIGINT
    },
    wToDayCases:{
        type: DataTypes.INTEGER
    },


    wRecovered: {
        type: DataTypes.BIGINT
    },
    wToDayRecovered: {
        type: DataTypes.INTEGER
    },


    wDeaths: {
        type: DataTypes.BIGINT
    },
    wToDayDeaths: {
        type: DataTypes.INTEGER
    },


    wCritical: {
        type: DataTypes.INTEGER
    },


    wAffectedCountries: {
        type: DataTypes.INTEGER
    },

    wTests: {
        type: DataTypes.BIGINT
    },


    wDate: {
        type: DataTypes.DATE

    },

    wActive: {
        type: DataTypes.BIGINT
    }



},{
    freezeTableName: true,
    tableName: 'World'
}
);


module.exports = World; 
