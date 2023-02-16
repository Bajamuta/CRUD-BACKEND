const Client = require('../../models/ClientModel');
module.exports = {
    index: (req, res) => {
        const query = req.query || {};
        Client.find(query)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    create: (req, res) => {
        let newClient = new Client({...req.body});
        newClient.save()
            .then((result) => {
                res.json(result)
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    client: (req, res) => {
        Client.findById(req.params.id).populate('registrations')
            .then((client) => {
                const clientDTO = {};
                /*TODO clientDTO*/
                res.json(clientDTO);
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    update: (req, res) => {
        Client.findByIdAndUpdate(req.params.id, req.body)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    delete: (req, res) => {
        Client.findByIdAndDelete(req.params.id)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    }
    /*TODO city, country, actions, clientBusiness, clientPerson*/
}
