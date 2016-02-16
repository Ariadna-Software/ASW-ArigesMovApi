var express = require('express');
var router = express.Router();
var fpagoMysql = require('./fpago_mysql');

router.get('/', function (req, res) {
    // confirmar que se han recibido correctamente los parámetros
    // parnom: Nombre parcial de los fpago buscados
    var query = req.query;
    fpagoMysql.getFPago(query.parnom, function (err, fpago) {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (fpago) {
            return res.json(fpago)
        } else {
            return res.status(404).send('No se han encontrado formas de pago con esos criterios');
        }
    });
});



// Exports
module.exports = router;