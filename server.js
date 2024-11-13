const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like Yahoo, Outlook, etc.
    auth: {
        user: process.env.EMAIL_USER, // Use environment variable
        pass: process.env.EMAIL_PASS  // Use environment variable
    }
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: 'strejo@students.kennesaw.edu', // List of receivers
        subject: 'New Contact Form Submission',
        text: `You have a new contact form submission from ${name} (${email}). Message: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Error sending email: ${error}`);
            res.status(500).send('Error sending email');
        } else {
            console.log(`Email sent: ${info.response}`);
            res.send('Form submission received and email sent!');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


