const cors = require('cors');

const whiteList =['http://localhost:4200', 'https://sscovid19.com', 'https://www.sscovid19.com'];

var corsOptionDelegate  = (req, callback) =>{

    var corsOptions;

    if(whiteList.indexOf(req.header('Origin')) !== -1){
        corsOptions = { origin: true};
    }

    else{
        corsOptions = { origin: false};
    }
    
    callback(null, corsOptions);
}

exports.corsWithOptions = cors(corsOptionDelegate);