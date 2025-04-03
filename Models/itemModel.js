const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Item = mongoose.model('Items', itemSchema);
module.exports = Item;