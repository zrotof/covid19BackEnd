const express = require('express');
const router = express.Router();

const Functions = require('../../services/api_function');

var apifunc = new Functions();

//Routes to acces to our back-end


//this route return the world globals and continent globals data;
router.get('/World', async(req, res) =>{

    res.send(await apifunc.world());
});


//This route give the acces to continents data
router.get('/Continents',async(req, res)=>{

    res.send(await apifunc.ct());
});


//Route to access global data about countries that belong to a specific continent
    
    //North America
    router.get('/Countries/NA',async(req, res) => {

        res.send(await apifunc.cy(1));
    });

    //South America
    router.get('/Countries/SA',async(req, res) => {

        res.send(await apifunc.cy(2));
    });

    //Europe
    router.get('/Countries/EU',async(req, res) => {

        res.send(await apifunc.cy(3));
    });

    //Asia
    router.get('/Countries/AS',async(req, res) => {

        res.send(await apifunc.cy(4));
    });

    //Africa
    router.get('/Countries/AF',async(req, res) => {

        res.send(await apifunc.cy(5));
    });

    //Oceania
    router.get('/Countries/OC',async(req, res) => {

        res.send(await apifunc.cy(6));
    });

    //This route give an array of all countries data
    router.get('/Countries/ALL', async(req, res)=>{
        res.send(await apifunc.cyAll());
    });
module.exports = router ;