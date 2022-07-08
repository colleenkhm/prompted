const faker = require('faker');

const db = require('../config/connection');
const { Entry, User } = require('../models');

db.once('open', async () => {
  await Entry.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create supporters
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let supporter = userId;

    while (supporterId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      supporterId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { supporters: supporterId } });
  }

  // create entries
  let createdEntries = [];
  for (let i = 0; i < 100; i += 1) {
    const entryText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdEntry = await Entry.create({ entryText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { entry: createdEntry._id } }
    );

    createdEntries.push(createdEntry);
  }

  // create reactions
  // for (let i = 0; i < 100; i += 1) {
  //   const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { username } = createdUsers.ops[randomUserIndex];

  //   const randomEntryIndex = Math.floor(Math.random() * createdEntries.length);
  //   const { _id: thoughtId } = createdEntries[randomEntryIndex];

  //   await Entry.updateOne(
  //     { _id: entryId },
  //     { $push: { reactions: { reactionBody, username } } },
  //     { runValidators: true }
  //   );
  // }

  console.log('all done!');
  process.exit(0);
});
