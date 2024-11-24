const Contact = require('../models/contactModel');

module.exports.submitContact = async (req, res, next) => {
    try {
        const { fullName, email, message } = req.body;

        // Validate input
        if (!fullName || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create and save contact entry
        const newContact = new Contact({ fullName, email, message });
        const savedContact = await newContact.save();

        res.status(201).json({
            message: 'Your message has been sent successfully!',
            data: savedContact,
        });
    } catch (error) {
        next(error);
    }
};

module.exports.getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};
