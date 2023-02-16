const mongoose = require("mongoose");

const ActionTypeModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    actions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Action"
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('ActionType', ActionTypeModel);
