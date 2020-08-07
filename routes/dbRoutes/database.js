const express = require('express');
const router = express.Router();
const Database = require('../../services/database');

//Create an instance of Database class
var db = new Database();

//Find all data about world cases and display them
router.get('/', async (req, res) => {
    
     //Test de connection 
    res.send(db.testdatabase());     
});


//Route to initialise all the data for the world
router.get('/setDB', (req, res) => {
    
    //Synchronisation des tables en BDD ...ATTENTION ceci détruit toutesles données
    res.send(db.synchronise());
});

module.exports = router;