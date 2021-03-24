const axios = require('axios');
const CtTotal = require ('../models/ct_total');
const Continent = require ('../models/continent');
const Country = require ('../models/country');
const CyTotal = require ('../models/cy_total');
const World = require('../models/world');


class Initilalise{
    
    //Default controller
    constructor(){


    }
    //Initialise world's data total cases
    async initialiseWorlds(){

        var link=process.env.API_WORLDS;
        
          await axios.get(link)
            .then(response =>{
                this.resData= response.data;
                console.log("Communication avec disease.sh, OK");
            })
            .catch(error => console.log("Error when we try to get World global cases form disease.sh: ", err));

            //Création de l'objet world selon le model
            this.world = { wPopulation: this.resData.population, wCases: this.resData.cases, wToDayCases: this.resData.todayCases, wRecovered: this.resData.recovered, wToDayRecovered: this.resData.todayRecovered, wDeaths: this.resData.deaths, wToDayDeaths: this.resData.todayDeaths, wCritical: this.resData.critical, wAffectedCountries: this.resData.affectedCountries, wTests: this.resData.tests, wDate: new Date(this.resData.updated), wActive: this.resData.active };

            //Sauvegarde ou Mise à jour en BDD dans la table  World

            var world = await World.findByPk(1);

            //If not found
            if (world === null) {
                await World.create(this.world)
                      .then(console.log("Great, the Table World were not initialise before, but now it's done"))
                      .catch(err =>{
                        console.log("Error on setting empty table "+err)
                      });
                
            } else {
                await World.update(this.world, { where: { "id": 1}})
                        .then(console.log("Great, the Table World were initialise before, with this action we have replace old data"))
                        .catch(err =>{
                        console.log("Error on setting not empty table "+err)
                        });;
                
            }
            
    }
    

    //Initialise values for the continant table in DB
    initialiseContinants(){
        //We first create a list of continant objects
        var continentsList = [
            {
                ctName:  'North America'
            },
                
            {
                ctName: 'South America'
            },
                
            {
                ctName: 'Europe'
            },
        
            {
                ctName: 'Asia'
            },
    
            {
                ctName:  'Africa'
            },
                
            {
                ctName: 'Oceania'
            }
    
            ];
            

            //We store all this continents in our databases
            Continent.bulkCreate(continentsList);
    }


    //Initialise or insert in CtTotal table , correspond to total data buy countinant
     async initialiseCtTotal(){

         //This link show globals data group by continants
         var link=process.env.API_CTS;
        
         //Variable qui contiendra le reponse json
         
          await axios.get(link)
            .then(response =>{
                this.resData= response.data;
                return this.resData;
            })
            .catch(error => console.log("Error: ", err));




            //On va créer une liste d'éléments à renseigner en base de données avec pour chaque continant ses détails
            //var list = [];
            var ct;            
            
            for(let i= 0; i< 6 ; i++){

                if(this.resData[i].continent === 'North America'){
                    //We create the object
                    this.ct = { ctCases: this.resData[i].cases, ctToDayCases: this.resData[i].todayCases, ctDeaths: this.resData[i].deaths, ctToDayDeaths: this.resData[i].todayDeaths, ctRecovered: this.resData[i].recovered, ctToDayRecovered: this.resData[i].todayRecovered, ctCritical: this.resData[i].critical, ctDate: new Date(this.resData[i].updated), ctTests: this.resData[i].tests, ctPopulation: this.resData[i].population, ct_id: 1 };
                           
                }


                else if(this.resData[i].continent === 'Europe'){
                    this.ct = { ctCases: this.resData[i].cases, ctToDayCases: this.resData[i].todayCases, ctDeaths: this.resData[i].deaths, ctToDayDeaths: this.resData[i].todayDeaths, ctRecovered: this.resData[i].recovered, ctToDayRecovered: this.resData[i].todayRecovered, ctCritical: this.resData[i].critical, ctDate: new Date(this.resData[i].updated), ctTests: this.resData[i].tests, ctPopulation: this.resData[i].population, ct_id: 3 };
                    
                }


                else if(this.resData[i].continent === 'Asia'){
                    this.ct = { ctCases: this.resData[i].cases, ctToDayCases: this.resData[i].todayCases, ctDeaths: this.resData[i].deaths, ctToDayDeaths: this.resData[i].todayDeaths, ctRecovered: this.resData[i].recovered, ctToDayRecovered: this.resData[i].todayRecovered, ctCritical: this.resData[i].critical, ctDate: new Date(this.resData[i].updated), ctTests: this.resData[i].tests, ctPopulation: this.resData[i].population, ct_id: 4 };
                    
                }


                else if(this.resData[i].continent === 'South America'){
                    this.ct = { ctCases: this.resData[i].cases, ctToDayCases: this.resData[i].todayCases, ctDeaths: this.resData[i].deaths, ctToDayDeaths: this.resData[i].todayDeaths, ctRecovered: this.resData[i].recovered, ctToDayRecovered: this.resData[i].todayRecovered, ctCritical: this.resData[i].critical, ctDate: new Date(this.resData[i].updated), ctTests: this.resData[i].tests, ctPopulation: this.resData[i].population, ct_id: 2 };
                    
                }
                else if(this.resData[i].continent === 'Africa'){
                    this.ct = { ctCases: this.resData[i].cases, ctToDayCases: this.resData[i].todayCases, ctDeaths: this.resData[i].deaths, ctToDayDeaths: this.resData[i].todayDeaths, ctRecovered: this.resData[i].recovered, ctToDayRecovered: this.resData[i].todayRecovered, ctCritical: this.resData[i].critical, ctDate: new Date(this.resData[i].updated), ctTests: this.resData[i].tests, ctPopulation: this.resData[i].population, ct_id: 5 };
                    
                }

                else if(this.resData[i].continent === 'Australia/Oceania'){
                    this.ct = { ctCases: this.resData[i].cases, ctToDayCases: this.resData[i].todayCases, ctDeaths: this.resData[i].deaths, ctToDayDeaths: this.resData[i].todayDeaths, ctRecovered: this.resData[i].recovered, ctToDayRecovered: this.resData[i].todayRecovered, ctCritical: this.resData[i].critical, ctDate: new Date(this.resData[i].updated), ctTests: this.resData[i].tests, ctPopulation: this.resData[i].population, ct_id: 6 };
                    
                }
                else{
                    //Nothing to do here
                }



                //We verify if there is an existing row in the DB with the same
                var ctTot = await CtTotal.findOne( {where: {"ct_id": this.ct.ct_id}});

                //If not found, we create it
                if (ctTot === null) {
                    CtTotal.create(this.ct);
                
                } else {
                    //We update it
                    await CtTotal.update(this.ct, {where: { "ct_id": this.ct.ct_id}});
                }  
                
            }
         }



         //Initialiser or insert la table des pays par continant
         async initialiseCountries(){


        //This link show globals data group by country
         var link=  process.env.API_COUNTRIES;
        
         //Variable qui contiendra le reponse json
         var resData 
          await axios.get(link)
            .then(response =>{
                this.resData= response.data;
                return this.resData;
            })
            .catch(error => console.log("Error: ", err)); 

           
            for(let i= 0; i< Object.keys(this.resData).length ; i++){

                if(this.resData[i].continent === 'North America' ){
                    //We create a country object
                    this.cy = { cyName: this.resData[i].country, cyPopulation: this.resData[i].population, cyFlag: this.resData[i].countryInfo.flag, cyApiId: this.resData[i].countryInfo['_id'] ,ct_id: 1 };

                }
                else if(this.resData[i].continent === 'Europe' ){
                    this.cy = { cyName: this.resData[i].country, cyPopulation: this.resData[i].population, cyFlag: this.resData[i].countryInfo.flag, cyApiId: this.resData[i].countryInfo['_id'], ct_id: 3 };
                    
                }
                else if(this.resData[i].continent === 'Asia' ){
                    this.cy = { cyName: this.resData[i].country, cyPopulation: this.resData[i].population, cyFlag: this.resData[i].countryInfo.flag, cyApiId: this.resData[i].countryInfo['_id'], ct_id: 4 };
                    
                }
                else if(this.resData[i].continent === 'South America' ){
                    this.cy = { cyName: this.resData[i].country, cyPopulation: this.resData[i].population, cyFlag: this.resData[i].countryInfo.flag, cyApiId: this.resData[i].countryInfo['_id'], ct_id: 2 };
                    
                }
                else if(this.resData[i].continent === 'Africa' ){
                    this.cy = { cyName: this.resData[i].country, cyPopulation: this.resData[i].population, cyFlag: this.resData[i].countryInfo.flag, cyApiId: this.resData[i].countryInfo['_id'], ct_id: 5 };
                    
                }
                else if(this.resData[i].continent === 'Australia/Oceania' ){
                    this.cy = { cyName: this.resData[i].country, cyPopulation: this.resData[i].population, cyFlag: this.resData[i].countryInfo.flag, cyApiId: this.resData[i].countryInfo['_id'], ct_id: 6 };
                    
                }



                //We verify if there is an existing row in the DB withe the same country Name
                var country = await Country.findOne( {where: {"cyName": this.cy.cyName}});
                    
                //If not found, we create it
                if (country === null) {
                    Country.create(this.cy);
                
                } else {
                    //We update it
                    await Country.update(this.cy, {where: { cyName: this.cy.cyName}});
                } 
                

            }
    }


    //Initialise or insert total data by countries
    async initialiseCyTotal(){

        //This link show globals data group by continants
        var link=process.env.API_CYS;
       
        //Variable qui contiendra le reponse json
        var resData 
         await axios.get(link)
           .then(response =>{
               this.resData= response.data;
               return this.resData;
           })
           .catch(error => console.log("Error: ", err));




           //On va créer une liste d'éléments à renseigner en base de données avec pour chaque continant ses détails
           //var list = [];
           //var cy;            
           
           for(let j= 0; j< Object.keys(this.resData).length ; j++){

            //We try to find if we have a country with the same id code
            var country = await Country.findOne({ where: { cyApiId: this.resData[j].countryInfo['_id']} });             

            //We create row if the country don't
               if(country != null){
                   
                //We found if we already have a row of this country in our cytotal Table
                var cyTot = await CyTotal.findOne({ where: { cy_id: country.id }});  
                
                this.cy = { cyCases: this.resData[j].cases, cyToDayCases: this.resData[j].todayCases, cyDeaths: this.resData[j].deaths, cyCode: this.resData[j].countryInfo['iso2'], cyToDayDeaths: this.resData[j].todayDeaths, cyRecovered: this.resData[j].recovered, cyToDayRecovered: this.resData[j].todayRecovered, cyCritical: this.resData[j].critical, cyDate: new Date(this.resData[j].updated), cyTests: this.resData[j].tests , cy_id: country.id };

                //If there is no row, then we create
                if( cyTot === null ){
                    await CyTotal.create(this.cy);
                }
                else{
                    //We update
                    await CyTotal.updated(this.cy, {where: {cy_id: this.cy.cy_id}});
                }

               }
           }  
        }

}

module.exports = Initilalise;