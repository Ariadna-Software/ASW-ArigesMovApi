var express = require('express');
var router = express.Router();
var pedidosMysql = require('./pedidos_mysql');

router.get('/', function (req, res) {
    pedidosMysql.getPedidos(function (err, pedidos) {
        if (err) {
            res.status(500).send(err.message);
        }
        res.json(pedidos)
    });
});



router.get('/cliente/:codclien', function (req, res) {
    var codclien = req.params.codclien;
    if (codclien) {
        pedidosMysql.getPedidosCliente(codclien, function (err, pedidos) {
            if (err) {
                res.status(500).send(err.message);
            }
            res.json(pedidos)
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }
});

//
module.exports = router;
