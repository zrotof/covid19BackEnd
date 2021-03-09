const express = require('express');
const router = express.Router();

const Continent = require('../../models/continent');
const Initialise = require('../../services/initialise');

var init = new Initialise();
//Route to initialise all the continants

router.get('/', async (req, res) => {


    //Appel de la méthode d'initialistion des continants
    init.initialiseContinants();
    res.send("Initialisation des continants effectuée");
});


//Find all the Continants and display them

router.get('/continentsList', async (req, res) => {

    await Continent.findAll()
    .then(continents => {
       
        res.send(continents);
    })
    .catch(err => console.log(err))
});
   

//Route to purge the continants data base
router.get('/delcontinents', (req, res) => 
    
    Continent.destroy({
        truncate: true 
    },
    )
    .then(res.sendStatus(200))
    .catch(err => console.log(err))
);



module.exports = router;