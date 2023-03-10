require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 5000;

const product_routes = require("./routes/product")

app.get("/", (req, res) => {
    res.send("hay this from the another site");
});



// Middleware 
app.use(cors());
app.use("/api/product", product_routes);


const start = async () => {
    try {

        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`hay i am lesiting the PORT NO :  ${PORT} `);
        });
    } catch (err) {
        console.log(err);
    }
}

start();
