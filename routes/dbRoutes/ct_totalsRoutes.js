const express = require('express');
const router = express.Router();

const CtTotal = require('../../models/ct_total');
const Initialise = require('../../services/initialise');

var init = new Initialise();

//Find all the Continants and display them

router.get('/', async (req, res) => {

    //Initialise the list of totals cases group by continants
    await init.initialiseCtTotal();
    res.send("Initialisation des données globales par continants effectuée");
    
});

//Route to initialise all the continants
router.get('/ctTotalsList', async (req, res) => {

     
    await CtTotal.findAll()
        .then(totals => {
            res.send(totals);
        })
        .catch(err => console.log(err))


});


module.exports = router;