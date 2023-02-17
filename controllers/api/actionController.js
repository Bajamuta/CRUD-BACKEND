const Action = require('../../models/ActionModel');
const Client = require('../../models/ClientModel');
module.exports = {
    index: (req, res) => {
        const query = req.query || {};
        Action.find(query)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    create: (req, res) => {
        let newAction = new Action({...req.body});
        newAction.save()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    action: (req, res) => {
        Action.findById(req.params.id)
            .then((action) => {
                const actionDTO = {};
                /*TODO actionDTO*/
                res.json(actionDTO);
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    update: (req, res) => {
        Action.findByIdAndUpdate(req.params.id, req.body)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    delete: (req, res) => {
        Action.findByIdAndDelete(req.params.id)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    addClients: (req, res) => {
        /*TODO is it the correct way to add clients to action?*/
        Action.findById(req.params.id)
            .then(
                (actionResult) => {
                    actionResult.clients.push(req.body.clientsId);
                    return actionResult.save();
                }
            )
            .then(
                (actionResult) => {
                    req.body.clientsId.forEach(
                        (id) => {
                            Client.findById(id)
                                .then(
                                    (clientResult) => {
                                        clientResult.actions.push(actionResult._id);
                                        clientResult.save();
                                    }
                                )
                                .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
                        }
                    );
                    return res.json({result: 'Clients have been added'});
                }
            )
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    deleteClients: (req, res) => {
        Action.findById(req.params.id)
            .then(
                (actionResult) => {
                    req.body.clientsId.forEach(
                        (id) => {
                            actionResult.clients.pull({_id: id});
                            actionResult.save();
                            /*TODO usunąć przez wyfiltrowanie*/
                        }
                    );
                    /*TODO how to correctly remove many objects?*/
                    return res.json({result: 'Clients have been removed'});
                }
            )
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    }
    /*TODO clients & user*/
}
