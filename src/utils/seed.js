const { User, Contact, SpamReport } = require('../models');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_USERS = 10;
const CONTACTS_PER_USER = 5;
const SPAM_REPORTS = 15;

async function seed() {
  try {
    console.log('Clearing old data...');
    await SpamReport.destroy({ where: {} });
    await Contact.destroy({ where: {} });
    await User.destroy({ where: {} });

    console.log('Seeding users...');
    const users = [];
    for (let i = 0; i < NUM_USERS; i++) {
      const name = faker.person.fullName();
      const phone = faker.phone.number('98765######');
      const email = faker.internet.email();
      const password = await bcrypt.hash('password123', 10);

      const user = await User.create({ name, phone, email, password });
      users.push(user);
    }

    console.log('Seeding contacts...');
    for (const user of users) {
      for (let j = 0; j < CONTACTS_PER_USER; j++) {
        const contactName = faker.person.fullName();
        const contactPhone = faker.phone.number('98#######');
        await Contact.create({
          contactName,
          contactPhone,
          userId: user.id
        });
      }
    }

    console.log('Seeding spam reports...');
    for (let k = 0; k < SPAM_REPORTS; k++) {
      const reporter = users[Math.floor(Math.random() * users.length)];
      const phone = faker.phone.number('98#######');
      await SpamReport.create({
        phone,
        userId: reporter.id
      });
    }

    console.log('Seeding complete!');
    process.exit();

  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seed();
