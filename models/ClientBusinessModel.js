const mongoose = require("mongoose");

const ClientBusinessModel = new mongoose.Schema({
    companyName: {
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

ClientBusinessModel.pre('find', function(next) {
    this.populate("clients");
    next();
});

module.exports = mongoose.model('ClientBusiness', ClientBusinessModel);
