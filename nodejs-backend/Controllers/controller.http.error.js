const HttpError = require('../Models/http.error.model')

exports.findByCode = (req, res) => {
    var queryObj = {};
    if( typeof(req.query.code) != "undefined" ) {
        //The search is insensitive
        queryObj["code"] = req.query.code;
    }

    HttpError.find(queryObj)
        .then(httpError => {
            if (httpError.length === 0) {
                return res.status(404).send({
                    message: 'No code found'
                });
            }
            res.send(httpError);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while retrieving code.'
            });
        });
};