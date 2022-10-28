//  user model using mongoose
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill out a valid email address!']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    // ading virtuals and getters
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get the total count for friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create user model using UserSchema
const User = model('User', UserSchema);

// export User
module.exports = User;
