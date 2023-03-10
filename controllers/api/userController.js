const User = require('../../models/UserModel');
const Action = require('../../models/ActionModel');
const ActionType = require('../../models/ActionTypeModel');
module.exports = {
    index: (req, res) => {
        const query = req.query || {};
        User.find(query)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    create: (req, res) => {
        let newUser = new User({...req.body});
        newUser.save()
            .then((result) => {
                res.json(result)
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    user: (req, res) => {
        User.findById(req.params.id)
            .then((user) => {
                const userDTO = {
                    firstname: user.firstname,
                    surname: user.surname,
                    username: user.username,
                    email: user.email,
                    _id: user._id,
                    actions: user.actions,
                    avatarUrl: user.avatarUrl,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
                /*TODO awatary jako zdjęcia na serwerze?*/
                res.json(userDTO);
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    update: (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    },
    delete: (req, res) => {
        User.findByIdAndDelete(req.params.id)
            .lean()
            .then((result) => res.json(result))
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    }
    /*TODO actions*/
}
