const app = require("./app");

const dotenv = require('dotenv');
const connectToMongo = require("./config/db");


dotenv.config({path: "config/config.env"});
connectToMongo();

app.listen(process.env.PORT, ()=>{
    console.log(`Server runnig on http://locahost:${process.env.PORT}`);
})