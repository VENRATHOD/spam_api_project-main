const { User, Contact, SpamReport } = require('../models');
const { Op, fn, col, where } = require('sequelize');

exports.searchByName = async (req, res) => {
  const { name } = req.query;

  if (!name) return res.status(400).json({ message: 'Name query is required' });

  try {
   
    const users = await User.findAll({
      where: where(
        fn('LOWER', col('name')),
        {
          [Op.like]: `${name.toLowerCase()}%`
        }
      ),
      attributes: ['id', 'name', 'phone', 'email']
    });

    const usersContains = await User.findAll({
      where: {
        [Op.and]: [
          where(fn('LOWER', col('name')), {
            [Op.like]: `%${name.toLowerCase()}%`
          }),
          {
            id: {
              [Op.notIn]: users.map(u => u.id)
            }
          }
        ]
      },
      attributes: ['id', 'name', 'phone', 'email']
    });

    const combined = [...users, ...usersContains];

    const results = await Promise.all(combined.map(async (u) => {
      const spamCount = await SpamReport.count({ where: { phone: u.phone } });
      return {
        name: u.name,
        phone: u.phone,
        email: u.email,
        spamCount
      };
    }));

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchByPhone = async (req, res) => {
  const { phone } = req.query;
  const userId = req.user.userId;

  if (!phone) return res.status(400).json({ message: 'Phone query is required' });

  try {
    const user = await User.findOne({ where: { phone } });

    if (user) {
      const searcher = await User.findByPk(userId);

      const contactMatch = await Contact.findOne({
        where: {
          userId: user.id,
          phone: searcher.phone  
        }
      });

      const spamCount = await SpamReport.count({ where: { phone } });

      return res.json({
        name: user.name,
        phone: user.phone,
        email: contactMatch ? user.email : null,
        spamCount
      });
    } else {
      const contacts = await Contact.findAll({ where: { phone } }); 

      const spamCount = await SpamReport.count({ where: { phone } });

      const response = contacts.map(c => ({
        name: c.name,   
        phone: c.phone, 
        email: null,
        spamCount
      }));

      return res.json(response);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
