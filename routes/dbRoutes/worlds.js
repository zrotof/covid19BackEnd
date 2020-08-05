const express = require('express');
const router = express.Router();

const World = require('../../models/world');
const Initialise = require('../../services/initialise');
const db = require('../../config/database');

var init = new Initialise();


//Find all data about world cases and display them
router.get('/', async (req, res) => {
    await World.findAll()
            .then(worldstats => {
                res.send(worldstats);
            })
            .catch(err => console.log(err));
        
});



//Route to initialise all the data for the world
router.get('/setWorlds', (req, res) => {

    //Appel de la méthode d'initialistion de la table World
    init.initialiseWorlds();

res.redirect('/worlds');
});
   



module.exports = router;