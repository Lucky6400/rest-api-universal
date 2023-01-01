const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// CREATE A Task

router.post('/', async (req, res) => {
    const newTask = new Task(req.body);
    try {
        const savedTask = await newTask.save();
        res.status(200).json(savedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// UPDATE TaskS

router.put('/:id', async (req, res) => {
    try {
        
            try {
                const updateTask = await Task.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, { new: true });
                res.status(200).json(updateTask);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// DELETE TaskS

router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
            try {
                await task.delete();
                res.status(200).json("Task deleted successfully");
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET ALL TaskS

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Get one task
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router