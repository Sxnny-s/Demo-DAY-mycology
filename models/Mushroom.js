const mongoose = require('mongoose');

const MushroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    strain: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        enum: ['colonizing bag','spawned', 'primordia', 'pins', 'fruiting', 'spore dump'],
        required:true
    }, 
    dateAdded: { 
        type: Date, 
        default: Date.now 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
})

module.exports = mongoose.model('Mushroom', MushroomSchema);