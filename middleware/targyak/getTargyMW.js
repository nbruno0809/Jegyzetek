/*
    Betölti az adott id-hoz tartozó tárgyat, ha létezik
*/
const requireOption = require("../requireOption")

module.exports = function(objectrepository) {
    const TargyModel = requireOption(objectrepository, 'TargyModel');

    return function(req, res,next) {
        TargyModel.findOne(
            {_id: req.params.targyid},
            (err,targy) => {
                if (err) {
                    return next(err) 
                }  

                if (!targy) {
                    return res.redirect('/targyak');
                }

                res.locals.targy = targy
                return next()
            }
        )    
    };

};