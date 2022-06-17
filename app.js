const express = require('express');
const cors = require('./cors');
const ResetAndInitDb = require('./services/reset-init-db');
const dotenv = require('dotenv');
dotenv.config();


var resetInitDb = new ResetAndInitDb();

const app = express();


//ROUTES 

    app.get('/', async (req, res) =>{


       res.send("Le Back-end s'est bien lancé ...");

    });

    //I will strieve new data every 45 minutes
    setInterval(function(){
      resetInitDb.resetAndInitDb();
    }, 2700000) 

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------


//Over here we will define our routes who will be used by the front-end application

//We allow request from another serveur


    //Routes to test and initialise DB
    app.use('/database', require('./routes/dbRoutes/databaseRoutes.js'));

    
    //Route to initialise world's data
    app.use('/worlds', cors.corsWithOptions, require('./routes/dbRoutes/worldRoutes.js'));


    //Route to initialise continents
    app.use('/continents', cors.corsWithOptions, require('./routes/dbRoutes/continentsRoutes.js'));

    
    //Route to initialise total goup by continent
    app.use('/ctTotals', cors.corsWithOptions, require('./routes/dbRoutes/ct_totalsRoutes.js'));

    
    //Routes to initialise countries
    app.use('/countries',cors.corsWithOptions, require('./routes/dbRoutes/countriesRoutes.js'));


    //Routes to initialise total group by countries
    app.use('/cyTotals', require('./routes/dbRoutes/cy_totalsRoutes.js'));
    

   app.use('/com.Samuel.sscovid19.api', require('./routes/apiRoutes/apiRoutes'));


//How tolisten to the server
const port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', ()=>console.log(`Listening on port : ${port} ...`));
