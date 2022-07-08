const { Schema, model } = require("mongoose");

const storeSchema = new Schema(
    {
        name: {
            type: String,
        },
        address: {
            street: {
                type: String,
            },
            number: {
                type: String,
            },
            city: {
                type: String,
            },
            country: {
                type: String,
                maxlength: [4, "Invalid country acronym"],
                uppercase: true
            },
            zipCode: {
                type: String,
            },
            
        },
        schedule: {
            type: String
        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        }
    },
    {
        timestamps: true,
    }
)

storeSchema.index({ location: '2dsphere' })

module.exports = model("Store", storeSchema)