const Address = require('../../models/AddressModel');
module.exports = {
    index: (req, res) => {
        const query = req.query || {};
        Address.find(query)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    create: (req, res) => {
        let newAddress = new Address({...req.body});
        newAddress.save()
            .then((result) => {
                res.json(result)
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    address: (req, res) => {
        Address.findById(req.params.id)
            .then((address) => {
                const addressDTO = {};
                /*TODO addressDTO*/
                res.json(addressDTO);
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    update: (req, res) => {
        Address.findByIdAndUpdate(req.params.id, req.body)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    delete: (req, res) => {
        Address.findByIdAndDelete(req.params.id)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    }
    /*TODO clients*/
}
