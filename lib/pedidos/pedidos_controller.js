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

router.post('/cabpedido', function (req, res) {
    pedidosMysql.postCabPedido(req.body, function (err, pedidos) {
        if (err) {
            res.status(500).send(err.message);
        }
        res.json(pedidos)
    });
});

router.put('/cabpedido', function (req, res) {
    pedidosMysql.putCabPedido(req.body, function (err, pedidos) {
        if (err) {
            res.status(500).send(err.message);
        }
        res.json(pedidos)
    });
});

router.delete('/cabpedido', function (req, res) {
    pedidosMysql.deleteCabPedido(req.body, function (err, pedidos) {
        if (err) {
            res.status(500).send(err.message);
        }
        res.json(pedidos)
    });
});

router.post('/linpedido', function (req, res) {
    pedidosMysql.postLinPedido(req.body, function (err, pedidos) {
        if (err) {
            res.status(500).send(err.message);
        }
        res.json(pedidos)
    });
});

router.put('/linpedido', function (req, res) {
    pedidosMysql.putLinPedido(req.body, function (err, pedidos) {
        if (err) {
            res.status(500).send(err.message);
        }
        res.json(pedidos)
    });
});

router.delete('/linpedido', function (req, res) {
    pedidosMysql.deleteLinPedido(req.body, function (err, pedidos) {
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
