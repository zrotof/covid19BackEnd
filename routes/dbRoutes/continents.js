const express = require('express');
const router = express.Router();

const Continent = require('../../models/continent');
const Initialise = require('../../services/initialise');

var init = new Initialise();

//Find all the Continants and display them
router.get('/', (req, res) => 
    Continent.findAll()
        .then(continents => {
           
            res.send(continents);
        })
        .catch(err => console.log(err))
);



//Route to initialise all the continants
router.get('/setcontinents', (req, res) => {

    //Appel de la méthode d'initialistion des continants
    init.initialiseContinants();

   

res.redirect('/continents');
});
   

//Route to purge the continants data base
router.get('/delcontinents', (req, res) => 
    
    Continant.destroy({
        truncate: true 
    },
    )
    .then(res.sendStatus(200))
    .catch(err => console.log(err))
);



module.exports = router;