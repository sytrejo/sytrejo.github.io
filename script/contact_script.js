const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    const msg = {
        to: 'strejo@students.kennesaw.edu',
        from: 'your-email@example.com', // Use the email address or domain you verified with SendGrid
        subject: 'New Contact Form Submission',
        text: `You have a new contact form submission from ${name} (${email}). Message: ${message}`
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
            res.send('Form submission received and email sent!');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error sending email');
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
