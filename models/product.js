const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
      id:{
          type: String,
            required: true
      },
        name: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        
        image: [
            {
              type: String,
              validate: {
                validator: function(value) {
                  const urlPattern = /(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%#!\-/]))?/;
                  const urlRegExp = new RegExp(urlPattern);
                  return value.match(urlRegExp);
                },
                message: props => `${props.value} is not a valid URL`
              }
            }
          ],
        description: {
            type: String,
            required: true
        },
        "featured": {
            type: Boolean,
            default: false
        }
    }
);

module.exports = mongoose.model("Product", productSchema);