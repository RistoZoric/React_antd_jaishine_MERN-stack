const mongoose = require('mongoose');

const Subcategory = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
});

module.exports = mongoose.model('sub_category', Subcategory);
