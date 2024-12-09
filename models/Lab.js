const mongoose = require('mongoose');

const LabSchema = new mongoose.Schema({ 
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Lab', LabSchema);
