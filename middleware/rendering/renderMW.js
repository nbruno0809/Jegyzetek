/*
     ha form-on keresztül volt adat beküldve, akkor ezekkel kitöltve jelníti meg az oldalt
     különben csak simán megjeleníti a paraméterben megadott html-t
*/

module.exports = function(objectrepository, viewName) {

    return function(req, res,next) {
        res.render(viewName, res.tpl);
    };

};