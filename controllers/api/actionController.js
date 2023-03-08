const Action = require('../../models/ActionModel');
const Client = require('../../models/ClientModel');
const User = require("../../models/UserModel");
const ActionType = require("../../models/ActionTypeModel");
const jwt = require('jsonwebtoken');
module.exports = {
    index: (req, res) => {
        const query = req.query || {};
        Action.find(query)
            .populate('client')
            .populate('user')
            .populate('type')
            .lean()
            .then((result) => {
                /*TODO czy da się populte w tabelii? (jakoś prościej)*/
                return res.json(result);
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    create: (req, res) => {
        const userId = jwt.decode(req.body.token)._id;
        let user;
        let actionType;
        let client;
        User.findById(userId)
            .then(
                (userResult) => {
                    user = userResult;
                    return ActionType.findById(req.body.typeId);
                }
            )
            .then(
                (actionTypeResult) => {
                    actionType = actionTypeResult;
                    return Client.findById(req.body.clientId);
                }
            )
            .then(
                (clientResult) => {
                    client = clientResult;
                    let newAction = new Action(
                        {user: user._id,
                            subject: req.body.subject,
                            description: req.body.description,
                            type: actionType._id,
                            client: clientResult._id});
                    return newAction.save();
                }
            )
            .then(
                (actionResult) => {
                    client.actions.push(actionResult._id);
                    client.save();
                    actionType.actions.push(actionResult._id);
                    actionType.save();
                    user.actions.push(actionResult._id);
                    user.save();
                    return res.json({result: 'Action created'})
                }
            )
        /*let newAction = new Action({...req.body});
        newAction.save()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));*/
    },
    action: (req, res) => {
        Action.findById(req.params.id)
            .then((action) => {
                /*const actionDTO = {};*/
                /*TODO actionDTO*/
                res.json(action);
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
        /*TODO token z nagłówka req.header("Authorization"); */
        Action.findByIdAndDelete(req.params.id)
            .then((actionResult) => {
                const userId = jwt.decode(req.body.token)._id;
                return User.findById(userId);
            })
            .then(
                (userResult) => {
                    userResult.actions.pull({_id: req.params.id});
                    userResult.save();
                    return Client.findById(req.body.clientId);
                }
            )
            .then((clientResult) => {
                clientResult.actions.pull({_id: req.params.id});
                clientResult.save();
                return ActionType.findById(req.body.typeId);
            })
            .then((typeResult) => {
                typeResult.actions.pull({_id: req.params.id});
                typeResult.save();
                return res.json({result: 'Action removed successfully'});
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    addClient: (req, res) => {
        let action;
        Action.findById(req.body.actionId)
            .then(
                (actionResult) => {
                    action = actionResult;
                    return Client.findById(req.body.clientId);
                }
            )
            .then(
                (clientResult) => {
                    action.client = clientResult._id;
                    action.save();
                    clientResult.actions.push(action._id);
                    return res.json({result: 'Clients have been added'});
                }
            )
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    deleteClient: (req, res) => {
        let action;
        Action.findById(req.body.actionId)
            .then(
                (actionResult) => {
                    action = actionResult;
                    return Client.findById(req.body.clientId);
                }
            )
            .then(
                (clientResult) => {
                    clientResult.actions.pull({_id: req.body.actionId});
                    clientResult.save();
                    action.client = null;
                    action.save();
                    return res.json({result: 'Clients have been removed'});
                }
            )
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    }
}
