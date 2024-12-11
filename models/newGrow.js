const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
    stage: {
        type: String,
        enum: ['inoculation', 'full colonization', 'spawned', 'primordia', 'pins', 'fruiting', 'harvest'],
        required: true
    },
    date: {
        type:Date,
        default: null
    },
    isCurrent: {
        type: Boolean,
        default: false
    }
});

const newGrowSchema = new mongoose.Schema({
    tek: {
        type: String,
        required: false
    },
    species: {
        type: String,
        required: true
    },
    strain: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    endDate: {
        type: Date,
       
    }, 
    generation: { 
        type: Number, 
        required: true
    },
    contamination: {
        type: Boolean,
        required: true
    },
    flushCount: {
        type: Number,
        default: 0,  // Start with 0 flushes
        required: false  // Optional initially
    },
    substrateType: {
        type: String,
        required: true
    },
    grainType: {
        type: String,
        required: true
    },
    SubstrateDepth: {
        type: Number,
        required: false
    },
    tubSize: {
        type: String,  
        required: false
    },
    wetYield: {
        type: Number,
        default: 0,
        // required: false  // Can be calculated later
    },
    dryYield: { 
        type: Number,
        required: false  // Can be calculated later
    },
    notes: [{
        note: {
            type: String, 
            required: true 
        },
        createdAt: {
            type: Date, 
            default: Date.now // Timestamp for when the note was added
        }
    }],
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    stages: {
        type: [stageSchema],
        default: () => [
            { stage: 'inoculation', isCurrent: true, date: new Date() },  // Inoculation stage gets the current date
            { stage: 'full colonization', date: null },
            { stage: 'spawned', date: null },
            { stage: 'primordia', date: null },
            { stage: 'pins', date: null },
            { stage: 'fruiting', date: null },
            { stage: 'harvest', date: null }
        ]
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

module.exports = mongoose.model('newGrow', newGrowSchema);