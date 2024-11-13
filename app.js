const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Use Gmail's SMTP server
    port: 587, // Use port 587 for TLS
    secure: false, // Set to true if using port 465 for SSL
    auth: {
        user: process.env.EMAIL_USER, // Your KSU email
        pass: process.env.EMAIL_PASS  // Your email password or app password
    }
});

// Serve the contact form HTML at the root URL
app.get('/', (req, res) => {
    res.redirect('/contact'); // Redirect to the contact form
});

// Serve the contact form HTML
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html'); // Adjust path as necessary
});




// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: 'strejo@students.kennesaw.edu', // Your KSU email as the receiver
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
            res.send('Message sent successfully!');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



