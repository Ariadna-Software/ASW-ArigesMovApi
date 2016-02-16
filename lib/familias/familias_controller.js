var express = require('express');
var router = express.Router();
var familiasMysql = require('./familias_mysql');

router.get('/', function(req, res) {
    // confirmar que se han recibido correctamente los parámetros
    // parnom: Nombre parcial de los familias buscados
    var query = req.query;
    if (query.parnom) {
        familiasMysql.getFamilias(query.parnom, function(err, familias) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (familias) {
                return res.json(familias)
            } else {
                return res.status(404).send('No se han encontrado familias con esos criterios');
            }
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }
});



// Exports
module.exports = router;