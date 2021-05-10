const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const Country = require('../models/country');


const CyTotal = db.define('Cy_Total',{

    cyCases: {
        type: DataTypes.BIGINT
    },
    cyToDayCases: {
        type: DataTypes.BIGINT
    },


    cyDeaths: {
        type: DataTypes.BIGINT
    },
    cyToDayDeaths: {
        type: DataTypes.BIGINT
    },


    cyRecovered: {
        type: DataTypes.BIGINT
    },
    cyToDayRecovered: {
        type: DataTypes.BIGINT
    },


    cyCritical: {
        type: DataTypes.BIGINT
    },


    cyDate:{
        type: DataTypes.DATE

    },

    cyTests:{
        type: DataTypes.BIGINT
    },

    cyCode:{
        type: DataTypes.STRING
    },
    cyVaccines:{
        type: DataTypes.BIGINT
    }


});


CyTotal.belongsTo(Country, 
    {
        foreignKey: 'cy_id',

    });

module.exports = CyTotal ; 