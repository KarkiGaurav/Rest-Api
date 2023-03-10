const Product = require("../models/product")

const getAllProduct = async (req, res) => {

    const {company, name, featured, sort, select} = req.query;
    const querryObject = {};

    if(company){
        querryObject.company = company;

    }
    if(name){
        querryObject.name = { $regex: name, $options: "i"};

    }
    if(featured){
        querryObject.featured = featured;

    }

    let apidata = Product.find(querryObject);

    if(sort){
         let sortFix = sort.split(",").join(" ")
         apidata = apidata.sort(sortFix);

    }

    if(select){
        let selectFix = select.split(",").join(" ");
         apidata = apidata.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    let skip = (page-1)*limit;

    apidata = apidata.skip(skip).limit(limit);

    const myData = await apidata;
    res.status(200).json({myData, nbHits: myData.length});
    // console.log(myData);
};



// this is just for testing it not real api.
const getAllProductTest = async (req, res)=> {
    res.status(200).json({msg: "hay this is get all product for test"});
};

module.exports = {getAllProduct, getAllProductTest}