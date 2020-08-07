const dotenv = require('dotenv');
dotenv.config();

console.log("url : >>>>", process.env.DATABASE_URL);

module.exports = {

    "type": "postgres",
    "url": "postgres://postgres:LeKWASSAkwassa001@localhost:5432/covid19"

}