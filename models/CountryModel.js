const mongoose = require("mongoose");

const CountryModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City"
        }
    ],
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address"
        }
    ]
}, {
    timestamps: true
});

CountryModel.pre('find', function (next) {
   this.populate('cities').populate('addresses');
   next();
});

module.exports = mongoose.model('Country', CountryModel);
