const mongoose = require('mongoose');
const { Schema } = mongoose;

const Record = new Schema({
    model: String,
    buildYear: Number,
    buyPrice: Number,
    sellPrice: Number,
    operations: Array
});

module.exports = mongoose.model('Record', Record);