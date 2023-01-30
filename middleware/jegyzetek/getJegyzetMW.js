/*
    Betölti az adott id-hoz tartozó jegyzetet, ha létezik
*/

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const JegyzetModel = requireOption(objectrepository, 'JegyzetModel');

    return function(req, res, next) {
        JegyzetModel.findOne(
            {
                _id: req.params.jegyzetid
            },
            (err, jegyzet) => {
                if (err || !jegyzet) {
                    return next(err);
                }

                res.locals.jegyzet = jegyzet;
                return next();
            }
        );
    };

};