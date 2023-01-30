/*

    Betölti a megadott tárgy id-hez tartozó jegyzetek listáját
*/
const requireOption = require('../requireOption');
module.exports = function(objectrepository) {
    const JegyzetModel = requireOption(objectrepository, 'JegyzetModel');

    return function(req, res, next) {
        if (typeof res.locals.targy === 'undefined') {
            return next();
        }

        JegyzetModel.find({ _targy: res.locals.targy._id }, (err, jegyzetek) => {
            if (err) {
                return next(err);
            }

            res.locals.jegyzetek = jegyzetek;
            return next();
        });
    };

};