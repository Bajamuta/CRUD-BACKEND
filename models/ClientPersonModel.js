const mongoose = require("mongoose");

const ClientPersonModel = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Name is required']
    },
    surname: {
        type: String,
        required: [true, 'Surname is required']
    },
    clients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client"
        }
    ]
}, {
    timestamps: true
});

ClientPersonModel.pre('find', function(next) {
    this.populate("clients");
    next();
});

module.exports = mongoose.model('ClientPerson', ClientPersonModel);
