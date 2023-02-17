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

ActionTypeModel.pre('find', function(next) {
    this.populate("actions");
    next();
});

module.exports = mongoose.model('ActionType', ActionTypeModel);
