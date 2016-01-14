var express = require('express');
var router = express.Router();
var facturasMysql = require('./facturas_mysql');

router.get('/cliente/:codclien', function(req, res) {
    var codclien = req.params.codclien;
    if (codclien) {
        facturasMysql.getFacturasCliente(codclien, function(err, facturas) {
            if (err) {
                res.status(500).send(err.message);
            }
            res.json(facturas)
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }
});

//
module.exports = router;
