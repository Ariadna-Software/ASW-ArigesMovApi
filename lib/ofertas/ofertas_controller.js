var express = require('express');
var router = express.Router();
var ofertasMysql = require('./ofertas_mysql');

router.get('/cliente/:codclien', function(req, res) {
    var codclien = req.params.codclien;
    if (codclien) {
        ofertasMysql.getOfertasCliente(codclien, function(err, ofertas) {
            if (err) {
                res.status(500).send(err.message);
            }
            res.json(ofertas)
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }
});

//
module.exports = router;
