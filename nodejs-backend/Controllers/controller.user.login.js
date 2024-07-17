const UserLogin = require('../Models/user.login.model')

function isEmpty(obj) {
    return JSON.stringify(obj) === JSON.stringify({});
}

exports.findByQuery = (req, res) => {
    var queryObj = {};
    if( typeof(req.query.userName) != "undefined" ) {
        //The search is insensitive
        queryObj["userName"] = req.query.userName;
    }

    if( typeof(req.query.password) != "undefined" ) {
        //The search is insensitive
        queryObj["password"] = req.query.password;
    }

    UserLogin.find(queryObj)
        .then(userLogin => {
            if (userLogin.length === 0) {
                return res.status(404).send({
                    message: 'No userLogin found'
                });
            }
            res.send(userLogin);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while retrieving userLogin.'
            });
        });
};