const ClientBusiness = require('../../models/ClientBusinessModel');
module.exports = {
    index: (req, res) => {
        const query = req.query || {};
        ClientBusiness.find(query)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    create: (req, res) => {
        let newClientBusiness = new ClientBusiness({...req.body});
        newClientBusiness.save()
            .then((result) => {
                res.json(result)
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    client: (req, res) => {
        ClientBusiness.findById(req.params.id)
            .then((client) => {
                const clientBusinessDTO = client;
                /*TODO clientBusinessDTO*/
                res.json(clientBusinessDTO);
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    update: (req, res) => {
        ClientBusiness.findByIdAndUpdate(req.params.id, req.body)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    delete: (req, res) => {
        ClientBusiness.findByIdAndDelete(req.params.id)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    }
    /*TODO clients*/
}
