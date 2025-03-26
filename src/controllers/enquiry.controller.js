const prisma = require('./../config/db');
const { sendEnquiryEmail } = require('../services/email.service');

const createEnquiry = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newEnquiry = await prisma.enquiry.create({
      data: { name, email, message }
    });

    res.status(201).json({
      message: 'Enquiry submitted successfully',
      enquiry: newEnquiry
    });

    // Send the email after sending the response
    try {
      await sendEnquiryEmail(newEnquiry);
    } catch (emailError) {
      console.error('Error sending Enquiry email:', emailError);
    }
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      console.error('Internal server error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = {
  createEnquiry,
};
