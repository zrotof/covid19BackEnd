const db = require('../config/database');
const Continent = require('../models/continent');
const Country = require('../models/country');
const CtTotal = require('../models/ct_total');
const CyTotal = require('../models/cy_total');
const World = require('../models/world');

class Database{

    constructor(){

    }

    //Test database connection
    async testdatabase(){
       await  db.authenticate()
        .then(()=>{
            console.log("ici")
            return 'Connection has been established successfully...';

        })
        .catch(err => {
            console.log(err);

            return 'Unables to connect to the database:'+ err});
    }
    

    //Synchronise models with tables in database
    async synchronise(){
        await db.authenticate()
        .then(async ()=>{


            console.log('Synchronisation en cours ...\n'),

            console.log('Wolrd reset en cours ...'),
            await World.sync({ force: true }),
            console.log('Wolrd reset est terminé ...\n'),

            console.log('Continent reset en cours ...'),
            await Continent.sync({ force: true }),
            console.log('Continent reset est terminé ...\n'),

            console.log('ctTotals reset en cours ...'),
            await CtTotal.sync({ force: true }),
            console.log('ctTotals reset est terminé ...\n'),

            console.log('countries reset en cours ...'),
            await Country.sync({ force: true }),
            console.log('countries reset est terminé ...\n'),

            console.log('cyTotals reset en cours ...'),
            await CyTotal.sync({ force: true }),
            console.log('cyTotals reset est terminé ...\n'),

            console.log('Synchronisation terminée...')
        })
        .catch(err => console.log('Unable to reset database: ', err))
    }

}

module.exports = Database;


