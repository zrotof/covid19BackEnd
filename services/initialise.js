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

            //Sauvegarde en BDD dans la table  World

                 World.create(this.world);

            
    }
    

    //Initialise values for the continant table in DB
    async initialiseContinants(){
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
            await Continent.bulkCreate(continentsList)
            .catch(err=>console.log("Error when adding contients list"));
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
            let ct;            
            
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

                else if(this.resData[i].continent === 'Australia-Oceania'){
                    this.ct = { ctCases: this.resData[i].cases, ctToDayCases: this.resData[i].todayCases, ctDeaths: this.resData[i].deaths, ctToDayDeaths: this.resData[i].todayDeaths, ctRecovered: this.resData[i].recovered, ctToDayRecovered: this.resData[i].todayRecovered, ctCritical: this.resData[i].critical, ctDate: new Date(this.resData[i].updated), ctTests: this.resData[i].tests, ctPopulation: this.resData[i].population, ct_id: 6 };
                }

                else{
                    //Nothing to do here
                }

                //We verify if there is an existing row in the DB with the same
                let ctTot = await CtTotal.findOne( {where: {"ct_id": this.ct.ct_id}});

                //If not found, we create it
                if (ctTot === null) {
                    CtTotal.create(this.ct);
                }  
                
            }
    }



    //Initialiser la table des pays par continant
    async initialiseCountries(){

        //This link show globals data group by country
         let link=  process.env.API_COUNTRIES;
        
        //Variable qui contiendra le reponse json
         let resData 

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

                else if(this.resData[i].continent === 'Australia-Oceania' ){
                    this.cy = { cyName: this.resData[i].country, cyPopulation: this.resData[i].population, cyFlag: this.resData[i].countryInfo.flag, cyApiId: this.resData[i].countryInfo['_id'], ct_id: 6 };
                }

                else{
                    //Nothing to do here
                }

                //We verify if there is an existing row in the DB withe the same country Name
                let country = await Country.findOne( {where: {"cyName": this.cy.cyName}});
                    
                //If not found, we create it
                if (country === null) {
                    Country.create(this.cy);
                }
            }
    }


    //Initialise or insert total data by countries
    async initialiseCyTotal(){

        //This link show globals data group by continants
        let link=process.env.API_CYS;

        //Variale who will contain vaccines data
        let vaccines;

        //Retrievement of the tab containing all vaccined for covid grouped by countries       
        await this.getArrayOfVaccinesByCountry()
            .then (result => this.vaccines = result)
            .catch (err=> console.log("Error while d-getting Vaccines data: ", err));

        //Variable qui contiendra le reponse json
        let resData ;

         await axios.get(link)
           .then( async response =>{
               this.resData = response.data;

            //On va créer une liste d'éléments à renseigner en base de données avec pour chaque continant ses détails
           for(let j= 0; j< Object.keys(this.resData).length ; j++){

            //We try to find if we have a country with the same id code
            await Country.findOne({ where: { cyApiId: this.resData[j].countryInfo['_id']} })
            .then( async result =>{

                let country = result;

                if(country){
                //Research of the index of the current country inside our vaccines table
                //if the country exist then so (index != -1 )

                let index = this.vaccines.findIndex(vac => vac.country === country.cyName);

                //If we don't match we set a null value to vaccines attribute
                if( index == -1){
                    this.cy = { cyCases: this.resData[j].cases, cyToDayCases: this.resData[j].todayCases, cyDeaths: this.resData[j].deaths, cyCode: this.resData[j].countryInfo['iso2'], cyToDayDeaths: this.resData[j].todayDeaths, cyRecovered: this.resData[j].recovered, cyToDayRecovered: this.resData[j].todayRecovered, cyCritical: this.resData[j].critical, cyDate: new Date(this.resData[j].updated), cyTests: this.resData[j].tests , cyVaccines: null, cy_id: country.id };
                }

                //If we found an existing occurance then we set the value of vaccines number corresponding to the correct country
                else{
                    this.cy = { cyCases: this.resData[j].cases, cyToDayCases: this.resData[j].todayCases, cyDeaths: this.resData[j].deaths, cyCode: this.resData[j].countryInfo['iso2'], cyToDayDeaths: this.resData[j].todayDeaths, cyRecovered: this.resData[j].recovered, cyToDayRecovered: this.resData[j].todayRecovered, cyCritical: this.resData[j].critical, cyDate: new Date(this.resData[j].updated), cyTests: this.resData[j].tests , cyVaccines: this.vaccines[index].total, cy_id: country.id };
                }

                //We finally create the row in the database even if there is an error while saving
                  await CyTotal.create(this.cy)
                   .catch(error => console.log("Error while saving cyTotals", error));
                }
            })
            .catch(err => console.log("Error on finding country", err));             

            //If the country exist
  
           } 
           }
           )
           .catch(err => console.log("Error: ", err));
           
        }


        async getArrayOfVaccinesByCountry(){

            let data;
            let slag = [];
            let link = process.env.API_VAC;

            await axios.get(link)
            .then(response =>
                data = response.data
            )
            .catch(error => console.log(error))

            for(var i=0; i < data.length; i++){
                slag.push({
                    "country":data[i].country,
                    "total": data[i].timeline[0].total
                });
            }
            return slag;
        }

}

module.exports = Initilalise;
