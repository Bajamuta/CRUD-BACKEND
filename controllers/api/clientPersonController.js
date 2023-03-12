const ClientPerson = require('../../models/ClientPersonModel');
module.exports = {
    index: (req, res) => {
        const query = req.query || {};
        ClientPerson.find(query)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    create: (req, res) => {
        let newClientPerson = new ClientPerson({...req.body});
        newClientPerson.save()
            .then((result) => {
                res.json(result)
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    client: (req, res) => {
        ClientPerson.findById(req.params.id)
            .then((client) => {
                const clientPersonDTO = client;
                /*TODO clientPersonDTO*/
                res.json(clientPersonDTO);
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    update: (req, res) => {
        ClientPerson.findByIdAndUpdate(req.params.id, req.body)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    delete: (req, res) => {
        ClientPerson.findByIdAndDelete(req.params.id)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    }
    /*TODO clients*/
}
