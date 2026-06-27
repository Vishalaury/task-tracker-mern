const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    description: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 500
    },
    status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Completed'], 
        default: 'Pending' 
    },
    dueDate: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);