const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

    title: { type: 'string', required: false },

    description: { type: 'string', required: false},

    dueDate: { type: 'string', required: false},

    progress : {type: 'string', required: false},
    priority : {type: 'string', required: false},
    
}, {timestamps: true});

module.exports = mongoose.model('Task', TaskSchema);