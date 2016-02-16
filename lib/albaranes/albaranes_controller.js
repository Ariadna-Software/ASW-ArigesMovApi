var express = require('express');
var router = express.Router();
var albaranesMysql = require('./albaranes_mysql');

router.get('/cliente/:codclien', function(req, res) {
    var codclien = req.params.codclien;
    if (codclien) {
        albaranesMysql.getAlbaranesCliente(codclien, function(err, albaranes) {
            if (err) {
                return res.status(500).send(err.message);
            }
            return res.json(albaranes)
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }
});

//
module.exports = router;
