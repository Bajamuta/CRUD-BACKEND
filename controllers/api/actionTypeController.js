const ActionType = require('../../models/ActionTypeModel');
module.exports = {
    index: (req, res) => {
        console.log('here', req);
        const query = req.query || {};
        ActionType.find(query)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    create: (req, res) => {
        console.log('here', req);
        let newActionType = new ActionType({...req.body});
        newActionType.save()
            .then((result) => {
                res.json(result)
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    type: (req, res) => {
        ActionType.findById(req.params.id)
            .then((action) => {
                const actionTypeDTO = {};
                /*TODO actionTypeDTO*/
                res.json(actionTypeDTO);
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    update: (req, res) => {
        ActionType.findByIdAndUpdate(req.params.id, req.body)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    delete: (req, res) => {
        ActionType.findByIdAndDelete(req.params.id)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    }
    /*TODO actions*/
}