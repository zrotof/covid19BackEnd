const DB = require('./database');
const InitDB = require('./initialise');

var db = new DB();
var initDB = new InitDB();

//This class is create to reset and initialise the database by new values commig from the API
class ResetAndInitDb{
    constructor(){

    }

    async resetAndInitDb(){

        //We reser database
        await db.synchronise();

        //We init every table with values coming from the API

            //Init World
            await initDB.initialiseWorlds();

            //Init Continents
            await initDB.initialiseContinants();

            //Init CtTotals
            await initDB.initialiseCtTotal();

            //Init Countries
            await initDB.initialiseCountries();

            //Init CyTotals
            await initDB.initialiseCyTotal();

    }
}

module.exports = ResetAndInitDb;