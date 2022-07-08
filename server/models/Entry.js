const { Schema, model, Types } = require('mongoose');

const EntrySchema = new Schema (
    {
        entryText: {
            type: String,
            required: true,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

const Entry = model('Entry', EntrySchema);

module.exports = Thought;