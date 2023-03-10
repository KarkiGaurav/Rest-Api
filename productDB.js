require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");

const ApidataJson = require("./apidata.json");
const product = require("./models/product");

const start = async () =>{
    try{
    await connectDB(process.env.MONGODB_URL);
    await product.deleteMany();
    await Product.create(ApidataJson);
     console.log("success");
    }catch(err){
        console.log(err);
    }
};

start();