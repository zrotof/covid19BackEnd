const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const Continant = require('./continent');


const CtTotal = db.define('Ct_Total',{

    
    ctCases: {
        type: DataTypes.BIGINT
    },
    ctToDayCases: {
        type: DataTypes.BIGINT
    },


    ctDeaths: {
        type: DataTypes.BIGINT
    },
    ctToDayDeaths: {
        type: DataTypes.BIGINT
    },


    ctRecovered: {
        type: DataTypes.BIGINT   
    },
    ctToDayRecovered: {
        type: DataTypes.BIGINT  
    },


    ctCritical: {
        type: DataTypes.BIGINT
    },

    
    ctDate:{
        type: DataTypes.DATE
    },


    ctPopulation:{
        type: DataTypes.BIGINT
    },


    ctTests:{
        type: DataTypes.BIGINT
    }

});


CtTotal.belongsTo(Continant, 
    {
        foreignKey: 'ct_id',

    });

module.exports = CtTotal ; 