const express = require('express');

const World = require('../models/world');
const Continant = require('../models/continent');
const Country = require('../models/country');
const db = require('../config/database');

const { QueryTypes } = require('sequelize');


class Api{

    constructor(){

    }

    //Function who gives all data about worlds stats
    async world(){

        const worldstats= await World.findAll()
            
                .catch(err => console.log(err));
        return worldstats;
    }

    //Function who gives all data about continents statistics 
    async ct(){


        const ctstats = await db.query('SELECT "ctName","ctTests","ctPopulation", "ctCases", "ctToDayCases", "ctDeaths", "ctToDayDeaths", "ctRecovered","ctToDayRecovered", "ctCritical", "ctDate" FROM "Continents" LEFT JOIN "Ct_Totals" ON "Continents"."id" = "Ct_Totals"."ct_id"', { 
            type: QueryTypes.SELECT,
            model: Continant,
            mapToModel: true
        });
        
        
        return ctstats;
        
    }

    //Function who gives all data about countires statistics 
    //It takes for parameter the name of a continent and gives back a list of all globals data about the countries 
    //of the given continent
    async cy( param ){
        
        const cystats = await db.query('SELECT "cyCode","cyName","cyPopulation", "cyFlag", "cyCases", "cyToDayCases", "cyDeaths", "cyToDayDeaths", "cyRecovered", "cyCritical","cyDate", "cyTests","cyVaccines" FROM "Countries" LEFT JOIN "Cy_Totals" ON "Countries"."id" = "Cy_Totals"."cy_id" WHERE "ct_id" = :ct_id ORDER BY "cyCases" DESC', { 
            replacements: { ct_id : param },
            type: QueryTypes.SELECT,
            model: Country,
            mapToModel: true
        });
        return cystats;
    }


    //Function who gives all data about countries statistics 
    //It gives a json array of all countries with specifics data about covid19
    async cyAll(){
        
        const cystatsall = await db.query('SELECT "cyCode" As "id", "cyName", "cyPopulation", "cyFlag", "cyCases", "cyToDayCases", "cyDeaths", "cyToDayDeaths", "cyRecovered", "cyCritical", "cyDate", "cyTests", "cyVaccines" FROM "Countries" LEFT JOIN "Cy_Totals" ON "Countries"."id" = "Cy_Totals"."cy_id" ', { 
            
            type: QueryTypes.SELECT,
            model: Country,
            mapToModel: true
        });
        return cystatsall;
    }


    //Function who gives all  countries concern by our API
    //It gives a json array of all countries with specifics data about covid19
    async allCountries(){
        
        const cystatsall = await db.query('SELECT  "cyName" FROM "Countries" ', { 
            
            type: QueryTypes.SELECT,
            model: Country,
            mapToModel: true
        });
        return cystatsall;
    }
    
}

module.exports = Api ;