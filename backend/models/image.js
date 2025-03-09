const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
        unique : true
    },
    imageUrl : {
        type : String,
        required : true,
        unique : true
    },
    createdAt : {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('User' , imageSchema)