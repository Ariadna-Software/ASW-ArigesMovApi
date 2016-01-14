var express = require('express');
var router = express.Router();
var albaranesMysql = require('./albaranes_mysql');

router.get('/cliente/:codclien', function(req, res) {
    var codclien = req.params.codclien;
    if (codclien) {
        albaranesMysql.getAlbaranesCliente(codclien, function(err, albaranes) {
            if (err) {
                res.status(500).send(err.message);
            }
            res.json(albaranes)
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }
});

//
module.exports = router;
