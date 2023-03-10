const mongoose = require("mongoose");


const connectDB = (uri) => {

    mongoose.set("strictQuery", false)
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> console.log("connection sucessfully...")).catch((err)=> console.log(err));;
};

module.exports = connectDB;