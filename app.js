const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const Country = require("./models/country");
const Continant = require("./models/continent");
const CtTotal = require("./models/continent");
const { Sequelize } = require('sequelize');
const cors = require('cors');
const ResetAndInitDb = require('./services/reset-init-db');
const { default: Axios } = require('axios');
var resetInitDb = new ResetAndInitDb();
const axios = require('axios');

const app = express();

      
let data;
var slag = [] ;


//ROUTES 

    app.get('/', async (req, res) =>{

        let tab =[]
        await axios.get('https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1&fullData=true')
           .then(response =>{
               data = response.data;
           })


           for(var i=0; i < data.length; i++){
            slag.push(Object.values({
                "country":data[i].country,
                "total": data[i].timeline[0].total
            }));
        }

        


       // res.send("Le Back-end s'est bien lancé ..s.");
       res.send(slag);

    });

    //Updating DB every 40 miniutes
      setInterval(function(){
        //console.log("dans le interval\n");


        

        resetInitDb.resetAndInitDb();

    }, 2700000) 


    //As heroku sleep every 30 minutes if nothing happen i have to add a delay lower than 30 minutes to avoid heroku sleep
    //I wil use another set interval that happen every 25 minutes
    //it would have been more simple if i had reduce the amount of time of the first setInterval
    //But i want it to be fixed at 40 minutes ...
    /*
    setInterval(function(){
        //console.log("dans le interval\n");

        console.log("Hey, please don't sleep");

    }, 1500000) 
    */


//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------


//Over here we will define our routes who will be used by the front-end application

//First we allow call from another UI
app.use(cors());

//Routes for the home page of the application 


    //Routes to test and initialise DB
    app.use('/database', require('./routes/dbRoutes/databaseRoutes.js'));

    //Route to initialise world's data
    app.use('/worlds', require('./routes/dbRoutes/worldRoutes.js'));


    //Route to initialise continents
    app.use('/continents', require('./routes/dbRoutes/continentsRoutes.js'));

    //Route to initialise total goup by continent
    app.use('/ctTotals', require('./routes/dbRoutes/ct_totalsRoutes.js'));

    
    //Routes to initialise countries
    app.use('/countries', require('./routes/dbRoutes/countriesRoutes.js'));

    //Routes to initialise total group by countries
    app.use('/cyTotals', require('./routes/dbRoutes/cy_totalsRoutes.js'));
    

   app.use('/com.Samuel.sscovid19.api', require('./routes/apiRoutes/apiRoutes'));


//How tolisten to the server
const port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', ()=>console.log(`Listening on port : ${port} ...`));
