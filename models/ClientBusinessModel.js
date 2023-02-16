const mongoose = require("mongoose");

const ClientBusinessModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nip: {
        type: String,
        required: true,
        minLength: 9,
        maxLength: 9
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

module.exports = mongoose.model('ClientBusiness', ClientBusinessModel);
