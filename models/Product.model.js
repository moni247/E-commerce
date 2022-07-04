const { Schema, model } = require("mongoose")

const productSchema = new Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String
        },
        price: {
            type: Number
        },
        images: [{
            type: String
        }],
        category: {
            type: String,
            enum: ["WOMEN", "MEN", "KIDS"],
            default: "WOMEN"
        }
    },
    {
        timestamps: true,
    }
)

const Product = model("Product", productSchema)
Product.syncIndexes()
module.exports = Product