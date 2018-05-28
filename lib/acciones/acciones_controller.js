var express = require('express');
var router = express.Router();
var accionesMysql = require('./acciones_mysql');

router.get('/', function(req, res) {
    
    var query = req.query;
    if (query.tipo) {
        accionesMysql.getAcciones(query.tipo, function(err, acciones) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (acciones) {
                return res.json(acciones)
            } else {
                return res.status(404).send('No se han encontrado actividades con esos criterios');
            }
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }
});


// Exports
module.exports = router;