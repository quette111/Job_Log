const Job = require("../models/User");
const User = require("../models/loginModel");
const faker = require("@faker-js/faker").fakerEN_US;
const FactoryBot = require("factory-bot");
require("dotenv").config();

const factory = FactoryBot.factory;
const adapter = new FactoryBot.MongooseAdapter();
factory.setAdapter(adapter);

const testUserPassword = faker.internet.password();
factory.define("user", User, {
  email: () => faker.internet.email(),
  password: () => faker.internet.password(),
});
factory.define("job", Job, {
  company: () => faker.company.name(),
  position: () => faker.person.jobTitle(),
  status: () => ["interview", "pending", "declined"][Math.floor(Math.random() * 3)],
});

const seed_db = async () => {
  await Job.deleteMany({});
  await User.deleteMany({});
  const testUser = await factory.create("user", { password: testUserPassword });
  await factory.createMany("job", 20, { createdBy: testUser._id });
  return testUser;
};

module.exports = { testUserPassword, seed_db, factory };
