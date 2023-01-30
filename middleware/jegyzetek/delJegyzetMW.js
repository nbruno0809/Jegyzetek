/*

    Kitörli a megadott id-val rendelkező jegyzetet az adatbázisból, majd redirect -> /jegyzetek/:targyid
*/

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.jegyzet === 'undefined') {
            return next();
        }

        res.locals.jegyzet.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/jegyzetek/'+res.locals.targy._id);
        });
    };
};