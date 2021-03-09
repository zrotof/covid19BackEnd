const express = require('express');
const router = express.Router();
const db = require ('../../config/database');
const Country = require('../../models/country');
const request = require('request');
const Initialise = require('../../services/initialise');

const CyTotal = require ('../../models/cy_total');

var init = new Initialise();

//Find all the countries and print them
router.get('/', async (req,res)=> {

    //Appel de la méthode d'initialisation des pays
    await init.initialiseCountries()
    res.send("Initialisation des pays effectuée");

}
    
);



//Routes to initialise all the countries and store them to the database
router.get('/countriesList', async (err,res) => {

    await Country.findAll()
    .then(countries => {
       // console.log(countries);
        res.send(countries);
    })
    .catch(err => console.log(err))

});


module.exports = router;