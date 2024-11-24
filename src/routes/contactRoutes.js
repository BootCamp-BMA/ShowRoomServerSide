const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controllers/contactController');

// Route to submit a contact message
router.post('/submit', submitContact);

// Route to retrieve all contact messages (admin feature, optional)
router.get('/getContacts', getContacts);

module.exports = router;
