var delJegyzetMW = require('../middleware/jegyzetek/delJegyzetMW');
var getJegyzetekMW = require('../middleware/jegyzetek/getJegyzetekMW');
var getJegyzetMW = require('../middleware/jegyzetek/getJegyzetMW');
var saveJegyzetMW = require('../middleware/jegyzetek/saveJegyzetMW');

var delTargyMW = require('../middleware/targyak/delTargyMW');
var getTargyakMW = require('../middleware/targyak/getTargyakMW');
var getTargyMW = require('../middleware/targyak/getTargyMW');
var saveTargyMW = require('../middleware/targyak/saveTargyMW');

var renderMW = require('../middleware/rendering/renderMW');


var TargyModel = require('../models/targy');
var JegyzetModel = require('../models/jegyzet');

module.exports = function (app) {
  var objectRepository = {
    TargyModel: TargyModel,
    JegyzetModel: JegyzetModel
  }
   
  

  /**
   *  Új tárgy felvétel
   */
  app.use('/ujtargy',
    saveTargyMW(objectRepository),
    renderMW(objectRepository, 'targyfelvet')
  );

  /**
   *  Tárgy törlés
   */
   app.get('/targytorles/:targyid',
        getTargyMW(objectRepository),
        getJegyzetekMW(objectRepository),
        delTargyMW(objectRepository)
 );

  /**
   *  Tárgy módosítás
   */
    app.use('/targyak/:targyid',
        getTargyMW(objectRepository),
        saveTargyMW(objectRepository),
        renderMW(objectRepository, 'targyfelvet')
  );


  /**
   *  Tárgyak listázása
   */
   app.get('/targyak',
   getTargyakMW(objectRepository), 
   renderMW(objectRepository,'index')
 ); 

  
   /**
   *  Új jegyzet
   */
    app.use('/ujjegyzet/:targyid',
        getTargyMW(objectRepository),
        saveJegyzetMW(objectRepository),
        renderMW(objectRepository, 'jegyzetfelvet')
    );

  /**
   *  Jegyzet módosítása
   */
    app.use('/jegyzetek/:targyid/:jegyzetid',
        getTargyMW(objectRepository),
        getJegyzetMW(objectRepository),
        saveJegyzetMW(objectRepository),
        renderMW(objectRepository, 'jegyzetfelvet')
    );

  /**
   *  Jegyzet törlése
   */
    app.use('/jegyzettorles/:targyid/:jegyzetid/',
        getTargyMW(objectRepository),
        getJegyzetMW(objectRepository),
        delJegyzetMW(objectRepository)
);

/**
   *  Egy tárgyhoz tartozó jegyzetek megjelenítése
   */
 app.get('/jegyzetek/:targyid',
 getTargyMW(objectRepository),
 getJegyzetekMW(objectRepository),
 renderMW(objectRepository, 'jegyzetek')
);


app.get('/',
function (req, res, next) {
  return res.redirect('/targyak');
});


    
};
