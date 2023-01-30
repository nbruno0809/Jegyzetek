/*
  Kitörli a megadott id-val rendelkező tárgyat és a hozzá tartozó jegyzeteket adatbázisból, majd redirect -> /targyak
*/
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
  
    return function(req, res,next) {
      if (typeof res.locals.targy ==='undefined') {
        return next();
      }


      for (let i=0; i<res.locals.jegyzetek.length;i++) {
      res.locals.jegyzetek[i].remove(err => {
        if (err) {
            return next(err);
        }
    })
  }

      res.locals.targy.remove(
        err => {
          if (err) {
            return next(err)
          }

          return res.redirect('/targyak');
        })
    };
};