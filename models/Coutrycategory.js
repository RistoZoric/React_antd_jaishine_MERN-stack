const mongoose = require('mongoose');

const Countrycategory = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('coutry_category', Countrycategory);
