const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.json()); // Add this middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // To handle form data


// Serve static files (CSS, JS, Images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML files for different routes
app.get('/', (req, res) => {
    // Redirect to the /index route
    res.redirect('/index');
});

app.get('/index', (req, res) => {
    // Serve the index.html file
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/feature', (req, res) => {
    res.sendFile(path.join(__dirname, 'feature.html'));
});

app.get('/service', (req, res) => {
    res.sendFile(path.join(__dirname, 'service.html'));
});

app.get('/quote', (req, res) => {
    res.sendFile(path.join(__dirname, 'quote.html'));
});

app.get('/project', (req, res) => {
    res.sendFile(path.join(__dirname, 'project.html'));
});

app.get('/testimonial', (req, res) => {
    res.sendFile(path.join(__dirname, 'testimonial.html'));
});

app.get('/404', (req, res) => {
    res.sendFile(path.join(__dirname, '404.html'));
});

// Setup Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '202rishabhverma@gmail.com',
        pass: 'fuig ujwt gabt ypmt' // Use App Password if 2FA is enabled
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log(req.body)
    const mailOptions = {
        from: `${name} <202rishabhverma@gmail.com>`,  // This must be your Gmail address
        replyTo: email,             // This shows the sender's email for replies
        to: '202rishabhverma@gmail.com',
        subject: 'New Message from Website',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Failed to send email.');
        }
        res.json({ message: 'Email sent successfully!' });
    });
});

app.post('/send-quote', (req, res) => {
    const { name, email, mobile, service, message } = req.body;

    // Log the received data to check
    console.log(req.body);

    const mailOptions = {
        from: `${name} <${email}>`,  // Sender's email (dynamic based on form submission)
        replyTo: email,             // This shows the sender's email for replies
        to: '202rishabhverma@gmail.com',  // Your email address where the form data is sent
        subject: 'New Quote Request from Website',
        text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nService: ${service}\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Failed to send email.' });
        }
        res.json({ message: 'Email sent successfully!' });
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
