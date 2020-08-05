const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const World = db.define('World',{
    
    wPopulation: {
        type: DataTypes.BIGINT
        
    },
    

    wCases:{
        type: DataTypes.INTEGER
    },
    wToDayCases:{
        type: DataTypes.INTEGER
    },


    wRecovered: {
        type: DataTypes.INTEGER
    },
    wToDayRecovered: {
        type: DataTypes.INTEGER
    },


    wDeaths: {
        type: DataTypes.INTEGER
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
        type: DataTypes.INTEGER
    },


    wDate: {
        type: DataTypes.DATE

    }



},{
    freezeTableName: true,
    tableName: 'World'
}
);


module.exports = World; 