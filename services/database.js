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
            console.log('Connection has been established successfully...');

        })
        .catch(err => console.log('Unables to connect to the database:', err));
    }
    

    //Synchronise models with tables in database
    synchronise(){
        db.authenticate()
        .then(async ()=>{


            console.log('Synchronisation en cours ...'),
            await World.sync({ force: true }),
            await Continent.sync({ force: true }),
            await Country.sync({ force: true }),
            await CtTotal.sync({ force: true }),
            await CyTotal.sync({ force: true }),
            console.log('Synchronisation terminée...')
        })
        .catch(err => console.log('Unable to synchronisethe database: ', err))
    }

}

module.exports = Database;


