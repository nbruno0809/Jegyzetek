/*
     ha nincs post parameterben ehhez tartozó adat, akkor csak tovább lép
     ha hiba van az inputban, elmenti a beírt adatokat és újra kéri a hibás adatok megadását
     ha sikeres akkor menti a változásokat/létrehozza az új tárgyat és redirect -> /targyak
*/

const requireOption = require('../requireOption');


module.exports = function(objectrepository) {
    const TargyModel = requireOption(objectrepository, 'TargyModel');

    return function(req, res,next) {
        if ((typeof req.body.nev === 'undefined') ||
            (typeof req.body.kod === 'undefined') ||
            (typeof req.body.kredit === 'undefined'))
            {
                return next();
            }


        if (typeof res.locals.targy === 'undefined') {
                res.locals.targy = new TargyModel();
        }

        res.locals.targy.nev = req.body.nev;
        res.locals.targy.kod = req.body.kod;
        res.locals.targy.kredit = req.body.kredit;

        res.locals.targy.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/targyak')
        })        
    }
}