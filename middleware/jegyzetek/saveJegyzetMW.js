/*
     ha nincs post parameterben ehhez tartozó adat, akkor csak tovább lép
     ha hiba van az inputban, elmenti a beírt adatokat és újra kéri a hibás adatok megadását
     ha sikeres akkor menti a változásokat/létrehozza az új jegyzetet és redirect -> /jegyzetek/:targyid
*/

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const JegyzetModel = requireOption(objectrepository, 'JegyzetModel');


    return function(req, res, next) {

        if (
            typeof req.body.oldalszam === 'undefined' ||
            typeof req.body.nyelv === 'undefined' ||
            typeof req.body.ev === 'undefined' ||
            typeof req.body.tipus === 'undefined' ||
            typeof res.locals.targy === 'undefined'
        ) {
            return next();
        }

        
        if (typeof res.locals.jegyzet === 'undefined') {
            res.locals.jegyzet = new JegyzetModel();
        }
        
        
        if (Number.isNaN(parseInt(req.body.oldalszam, 10)) ||
            Number.isNaN(parseInt(req.body.ev, 10))) {
            return next(new Error('Az oldalszám és az év szám kell hogy legyen!'));
        }

        res.locals.jegyzet.oldalszam = req.body.oldalszam //parseInt(req.body.oldalszam, 10);
        res.locals.jegyzet.nyelv = req.body.nyelv
        res.locals.jegyzet.ev = req.body.ev //parseInt(req.body.ev, 10);
        res.locals.jegyzet.tipus = req.body.tipus;
        res.locals.jegyzet._targy = res.locals.targy._id;

        res.locals.jegyzet.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/jegyzetek/'+res.locals.targy._id);
        });
    };
};

