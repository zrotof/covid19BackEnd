const express = require('express');
const router = express.Router();

const CyTotal = require('../../models/cy_total');
const Initialise = require('../../services/initialise');

var init = new Initialise();

//Find all the Continants and display them

router.get('/', async (req, res) => {

    //Initialise the list of totals cases group by continants
    await init.initialiseCyTotal();
    res.send("Initialisation des données globales par continants effectuée");
});

//Route to initialise all the continants
router.get('/cyTotalsList', async (req, res) => {

    await CyTotal.findAll()
        .then(totals => {
            res.send(totals);
        })
        .catch(err => console.log(err))

    
    });


module.exports = router;