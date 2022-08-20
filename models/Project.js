const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({

    name: { type: 'string', required: true },

    description: { type: 'string', required: true},

    img: { type: 'string', required: false},

    link : {type: 'string', required: true},
    
}, {timestamps: true});

module.exports = mongoose.model('Project', ProjectSchema);