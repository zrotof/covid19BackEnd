const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const Country = require("./models/country");
const Continant = require("./models/continent");
const CtTotal = require("./models/continent");
const { Sequelize } = require('sequelize');
const Database = require('./services/database');
const cors = require('cors');

const config = require('./config');

//Create an instance of Database class
var db = new Database();

const app = express();

    //Test de connection 
    db.testdatabase();

    //Synchronisation des tables en BDD ...ATTENTION ceci détruit toutesles données
    //db.synchronise();



//ROUTES 

    app.get('/', (req, res) =>{

        res.send("Le Back-end s'est bien lancé ...");

    });
    
    //Route to initialise world's data
    app.use('/worlds', require('./routes/dbRoutes/worlds.js'));

    //Route to initialise continents
    app.use('/continents', require('./routes/dbRoutes/continents.js'));
    
    //Route to initialise total goup by continent
    app.use('/cttotals', require('./routes/dbRoutes/ct_totals.js'));

    //Routes to initialise countries
    app.use('/countries', require('./routes/dbRoutes/countries.js'));

    //Routes to initialise total group by countries
    app.use('/cytotals', require('./routes/dbRoutes/cy_totals.js'));

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------


//Over here we will define our routes who will be used by the front-end application

//First we allow call from another UI
app.use(cors());

//Routes for the home page of the application 


   app.use('/com.Samuel.sscovid19.api', require('./routes/apiRoutes/api'));
  




    //Route to get all counries
    //app.use('/countries', require('./routes/countries'));

//How tolisten to the server
const port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', ()=>console.log(`Listening on port : ${port} ...`));