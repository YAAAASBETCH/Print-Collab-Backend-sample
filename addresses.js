const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressesSchema = new Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    alias: {
        type: String,
        required: false
    },
    company: {
        type: String,
        required: false
    },
    line_1: {
        type: String,
        required: true
    },
    line_2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        full_name: {
            type: String,
            required: true
        },
        abv: {
            type: String,
            required: true,
            maxLength: 2
        }
    },
    zipcode: {
        type: String,
        required: true,
        maxLength: 5
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    customer_id: {  // does this allow the addresses to be identified by the user's Id?
        type: String
    }
})

// define our addresses model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Addresses', addressesSchema)
