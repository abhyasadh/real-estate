const State = require('../models/stateModel');

// Add a new state
exports.addState = async (req, res) => {
    console.log(req.body);
    try {
        const { country, name } = req.body;

        // Validate input
        if (!country || !name) {
            return res.status(400).send({ message: 'Please fill all fields.' });
        }

        // Create new state instance
        const newState = new State({ country, name });

        // Save the state to the database
        await newState.save();

        // Send response
        res.status(200).send({ message: 'State added successfully', state: newState });
    } catch (error) {
        console.error('Error adding state:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Update a state by ID
exports.updateState = async (req, res) => {
    const { id } = req.params;
    const { country, name } = req.body;

    try {
        // Validate input
        if (!country || !name) {
            return res.status(400).send({ message: 'Please fill all fields.' });
        }

        // Find and update the state
        const updatedState = await State.findByIdAndUpdate(id, { country, name }, { new: true });

        if (!updatedState) {
            return res.status(404).send({ message: 'State not found' });
        }

        // Send response
        res.status(200).send({ message: 'State updated successfully', state: updatedState });
    } catch (error) {
        console.error('Error updating state:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get a state by ID
exports.getStateById = async (req, res) => {
    const { id } = req.params;

    try {
        const state = await State.findById(id);
        if (!state) {
            return res.status(404).send({ message: 'State not found' });
        }
        res.status(200).send({ state });
    } catch (error) {
        console.error('Error fetching state:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get all states
exports.getAllStates = async (req, res) => {
    const countryId = req.query.countryId;
    try {
        const states = await State.find(countryId ? { country: countryId } : {}).populate('country');
        res.status(200).send({ states });
    } catch (error) {
        console.error('Error fetching states:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Delete a state by ID
exports.deleteState = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the state
        const deletedState = await State.findByIdAndDelete(id);

        if (!deletedState) {
            return res.status(404).send({ message: 'State not found' });
        }

        // Send response
        res.status(200).send({ message: 'State deleted successfully', state: deletedState });
    } catch (error) {
        console.error('Error deleting state:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};