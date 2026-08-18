const express = require('express');
const app = express();
const fs = require('fs');
const nodemailer = require('nodemailer');

app.use(express.json());

// 1. Submit form
app.post('/submit-form', (req, res) => {
  const formData = req.body;
  // Save or process formData
  res.status(200).json({ message: 'Form submitted successfully!' });
});

// 2. Download form (simple text file for demo)
app.get('/download-form', (req, res) => {
  const fileContent = "Form submission details...";
  fs.writeFileSync('form.txt', fileContent);
  res.download('form.txt');
});

// 3. Send email
app.post('/send-email', async (req, res) => {
  const { email } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'your-email@gmail.com', pass: 'your-password' }
  });

  await transporter.sendMail({
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Form Submission',
    text: 'Attached is your submitted form.',
    attachments: [{ filename: 'form.txt', path: './form.txt' }]
  });

  res.status(200).json({ message: 'Email sent successfully!' });
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
