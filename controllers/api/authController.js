const User = require('../../models/UserModel');
const bcrypt = require('bcrypt');
module.exports = {
    getToken: (req, res) => {
        User.findOne({username: req.body.username})
            .then((user) => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password, (err, logged) => {
                        if (logged) {
                            const token = user.generateAuthToken(user);
                            if (token) {
                                res.json({jwt_token: token, username: user.username, id: user._id, ttl: new Date()});
                            }
                        }
                        else
                        {
                            res.json({error: `Wrong password`});
                        }
                    });
                }
                else
                {
                    res.json({error: `User does not exist`})
                }
                /*res.json(user)*/
            })
            .catch((err) => res.json({error: `An error has occurred: ${err}}`}));
    }
}
