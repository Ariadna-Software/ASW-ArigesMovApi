var express = require('express');
var router = express.Router();
var indicadoresMysql = require('./indicadores_mysql');


router.get('/', function(req, res) {
    var codclien = req.query.codclien;
    var codmacta = req.query.codmacta;
    if (codclien && codmacta) {
        indicadoresMysql.getIndicadores(codclien, codmacta, function(err, indicadores) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.json(indicadores);
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }

});

// exportar router
module.exports = router;
