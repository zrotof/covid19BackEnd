console.log("url : >>>>", process.env.DATABASE_URL);
module.exports = {

    "type": "postgres",
    "url": process.env.DATABASE_URL

}