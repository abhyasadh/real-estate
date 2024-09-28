const Contact = require('../models/contactUsModel');

// Add a new contact message
exports.addContactMessage = async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, phone, message } = req.body;

        // Validate input
        if (!name || !email || !phone || !message) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        // Create new contact instance
        const newContact = new Contact({ name, email, phone, message });

        // Save the contact message to the database
        await newContact.save();

        // Send response
        res.status(200).send({ message: 'Contact message sent successfully', contact: newContact });
    } catch (error) {
        console.error('Error sending contact message:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Mark a contact message as read
exports.markAsRead = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and update the contact message
        const updatedContact = await Contact.findByIdAndUpdate(id, { read: true }, { new: true });

        if (!updatedContact) {
            return res.status(404).send({ message: 'Contact message not found' });
        }

        // Send response
        res.status(200).send({ message: 'Contact message marked as read', contact: updatedContact });
    } catch (error) {
        console.error('Error marking contact message as read:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get all contact messages
exports.getAllContactMessages = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).send({contacts});
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};