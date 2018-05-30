var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now()
    },
    user:{
        type: String,
        required: true
    }
}, { versionKey: false });

module.exports = mongoose.model('Log', schema);