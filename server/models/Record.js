const mongoose = require('mongoose');
const { Schema } = mongoose;

const Record = new Schema({
    id:Number,
    table: String,
    model: String,
    buildYear: Number,
    operations: Array,
    photos: Array
});

module.exports = mongoose.model('Record', Record);