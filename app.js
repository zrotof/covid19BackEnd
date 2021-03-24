const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const Country = require("./models/country");
const Continant = require("./models/continent");
const CtTotal = require("./models/continent");
const { Sequelize } = require('sequelize');
const cors = require('cors');


const app = express();

      



//ROUTES 

    app.get('/', (req, res) =>{


  //Updating DB every 40 miniutes
  /* setInterval(function(){

    console.log("coucou")

}, 2000) */

        res.send("Le Back-end s'est bien lancé ...");

    });


//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------


//Over here we will define our routes who will be used by the front-end application

//First we allow call from another UI
app.use(cors());

//Routes for the home page of the application 


    //Routes to test and initialise DB
    app.use('/database', require('./routes/dbRoutes/database.js'));

    //Route to initialise world's data
    app.use('/worlds', require('./routes/dbRoutes/worlds.js'));


    //Route to initialise continents
    app.use('/continents', require('./routes/dbRoutes/continents.js'));

    //Route to initialise total goup by continent
    app.use('/ctTotals', require('./routes/dbRoutes/ct_totals.js'));

    
    //Routes to initialise countries
    app.use('/countries', require('./routes/dbRoutes/countries.js'));

    //Routes to initialise total group by countries
    app.use('/cyTotals', require('./routes/dbRoutes/cy_totals.js'));
    

   app.use('/com.Samuel.sscovid19.api', require('./routes/apiRoutes/api'));


//How tolisten to the server
const port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', ()=>console.log(`Listening on port : ${port} ...`));
