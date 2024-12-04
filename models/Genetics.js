const mongoose = require('mongoose')

const  GeneticSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['spore print','spore syringe','liquid culture','agar plate','agar slant'],
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
    isolation: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
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


module.exports = mongoose.model('Genetic', GeneticSchema)