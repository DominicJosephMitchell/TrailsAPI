const mongoose = require('mongoose')

const trailSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Trail', trailSchema)
