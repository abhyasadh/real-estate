const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactUsController');

// Contact Us routes
router.post('/add', contactController.addContactMessage);
router.put('/update/:id', contactController.markAsRead);
router.get('/', contactController.getAllContactMessages);

module.exports = router;