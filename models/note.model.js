const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const schema = {
    text: { type: String, required: true, trim: true },
    title: { type: String, required: false, trim: true },
    favorite: { type: Boolean, required: false ,default:false},
};


module.exports = mongoose.model('Note', schema);