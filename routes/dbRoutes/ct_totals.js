const express = require('express');
const router = express.Router();

const CtTotal = require('../../models/ct_total');
const Initialise = require('../../services/initialise');

var init = new Initialise();

//Find all the Continants and display them

router.get('/', (req, res) => 
    CtTotal.findAll()
        .then(totals => {
            res.send(totals);
        })
        .catch(err => console.log(err))
);

//Route to initialise all the continants
router.get('/setcttotals', (req, res) => {

    //Initialise the list of totals cases group by continants
    init.initialiseCtTotal();


res.redirect('/cttotals');
});


module.exports = router;