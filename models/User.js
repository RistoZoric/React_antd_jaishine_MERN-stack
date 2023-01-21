const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: false
    },
    telephone:{
        type: Number,
        required: true
    },
    country_name:{
        type: String,
        required: true
    },
    address:{
        type: String,
    },
    city:{
        type: String,
    },
    company_name:{
        type: String,
    },
    mobile:{
        type: Number,
    },
    position:{
        type: String,
    },
    postcode:{
        type: Number,
    },
    region:{
        type: String,
    },
    vat:{
        type: String,
    },
    active:{
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('user', UserSchema);
