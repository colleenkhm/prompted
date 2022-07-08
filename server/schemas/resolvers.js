const { User, Entry } = require('../models');
const resolvers = {
    Query: {
        // get all entries
        entries: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Entry.find(params).sort({ createdAt: -1 });
        },
        // get one entry
        entry: async (parent, { _id }) => {
            return Entry.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('supporters')
            .populate('entries');
        },
        // get user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('supporters')
            .populate('entries');
        }
    }
};

module.exports = resolvers;