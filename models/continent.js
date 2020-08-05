const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Continent = db.define('Continents', {

    //The name of the continant
    ctName: {
        type: DataTypes.STRING
    }

},
{
    freezeTableName: true,
    tableName: 'Continents'
}
);

        module.exports = Continent ; 