const nodemailer = require('nodemailer');

const sendEnquiryEmail = async (enquiry) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: "vishalkgupta34@gmail.com",
    subject: `New enquiry from ${enquiry.name}`,
    text: `New enquiry received:\n\nName: ${enquiry.name}\nEmail: ${enquiry.email}\nMessage: ${enquiry.message}\n\nBest Regards\n `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Enquiry email sent successfully');
  } catch (error) {
    console.error('Error sending enquiry email:', error);
    throw error;
  }
};

module.exports = {
  sendEnquiryEmail,
};
