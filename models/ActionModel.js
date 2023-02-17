const mongoose = require("mongoose");

const ActionModel = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ActionType",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    clients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client"
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

ActionModel.pre('find', function(next) {
   this.populate("type").populate("user").populate("clients");
   next();
});

module.exports = mongoose.model('Action', ActionModel);
