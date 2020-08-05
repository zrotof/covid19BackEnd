const express = require('express');
const router = express.Router();

const CyTotal = require('../../models/cy_total');
const Initialise = require('../../services/initialise');

var init = new Initialise();

//Find all the Continants and display them

router.get('/', async (req, res) => {




    CyTotal.findAll()
        .then(totals => {
            res.send(totals);
        })
        .catch(err => console.log(err))

}   
      
);

//Route to initialise all the continants
router.get('/setcytotals', (req, res) => {

    //Initialise the list of totals cases group by continants
    init.initialiseCyTotal();


res.redirect('/cytotals');
});


module.exports = router;