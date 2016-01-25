var express = require('express');
var router = express.Router();
var fpagoMysql = require('./fpago_mysql');

router.get('/', function(req, res) {
    // confirmar que se han recibido correctamente los parámetros
    // parnom: Nombre parcial de los fpago buscados
    var query = req.query;
    if (query.parnom) {
        fpagoMysql.getFPago(query.parnom, function(err, fpago) {
            if (err) {
                res.status(500).send(err.message);
            }
            if (fpago) {
                res.json(fpago)
            } else {
                res.status(404).send('No se han encontrado formas de pago con esos criterios');
            }
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }
});



// Exports
module.exports = router;