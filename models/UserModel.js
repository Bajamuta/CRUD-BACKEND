const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const UserModel = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [3, 'Should contains minimum 3 characters'],
    },
    firstname: {
            type: String,
            required: [true, 'Name is required']
        },
    surname: {
            type: String,
            required: [true, 'Surname is required']
        },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    avatarUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    updatedAt: {
        type: Date
    },
    actions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Action"
        }
    ]
},
    {
        timestamps: true
    });

/*FOR SECURITY REASON - ENCRYPT THE PASSWORD*/
UserModel.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err)
        {
            return next();
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err)
            {
                return next();
            }
            user.password = hash;
            next();
        });
    });
});

/*
UserModel.pre('find', function (next) {
    this.populate("registrations");
    next();
});
*/

UserModel.methods.generateAuthToken = (user) => {
    const token = jwt.sign({ _id: user._id }, 'abc123', {
        expiresIn: "1h",
    });
    return token;
};

module.exports = mongoose.model('User', UserModel);
