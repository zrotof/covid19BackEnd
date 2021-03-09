const express = require('express');
const router = express.Router();

const World = require('../../models/world');
const Initialise = require('../../services/initialise');
const db = require('../../config/database');

var init = new Initialise();

//Route to initialise all the data for the world cases
router.get('/', async (req, res) => {
    
            //Appel de la méthode d'initialistion de la table World
   await init.initialiseWorlds()
   .then(res.send("Initialisation des données mondiales effectuée"))
   .catch(err => res.send("Une erreur est survenue :"+err));
        
});



//Find and retrieve all data about world cases inside the DB
router.get('/worldslist', async (req, res) => {

    await World.findAll()
            .then(worldstats => {
                res.send(worldstats);
            })
            .catch(err => console.log(err));
;
});
   



module.exports = router;