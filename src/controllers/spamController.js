const { SpamReport } = require('../models');

exports.markSpam = async (req, res) => {
  const { phone } = req.body;
  const userId = req.user.userId;

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    
    const existing = await SpamReport.findOne({ where: { phone, reportedBy: userId } });

    if (existing) {
      return res.status(409).json({ message: 'You already marked this number as spam' });
    }

    await SpamReport.create({ phone, reportedBy: userId });

    res.status(201).json({ message: 'Number marked as spam successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
