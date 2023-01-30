/*
    Betölti a tárgyak lisáját
*/

const requireOption = require("../requireOption")

module.exports = function(objectrepository) {
    const TargyModel = requireOption(objectrepository,"TargyModel")

    return function(req, res,next) {
        TargyModel.find(
            {},
            (err,targyak) => {
                if (err) {
                    return next(err) 
                }

                res.locals.targyak = targyak
                return next()
            }
        )    
    };
};