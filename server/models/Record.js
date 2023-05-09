const mongoose = require('mongoose');
const { Schema } = mongoose;

const Record = new Schema({
    id:Number,
    model: String,
    buildYear: Number,
    operations: Array
});

module.exports = mongoose.model('Record', Record);