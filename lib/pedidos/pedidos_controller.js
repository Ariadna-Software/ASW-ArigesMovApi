var express = require('express');
var router = express.Router();
var pedidosMysql = require('./pedidos_mysql');
var rp = require('request-promise');
var cfg = require("../../config/config.json");
var dbcfg = require("../../config/mysql_config.json");


router.get('/', function (req, res) {
    pedidosMysql.getPedidos(function (err, pedidos) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(pedidos)
    });
});

router.get('/agente', function (req, res) {
    var codagent = req.query.codagent;
    pedidosMysql.getPedidosAgente(codagent, function (err, pedidos) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(pedidos)
    });
});

router.get('/pedido', function (req, res) {
    pedidosMysql.getPedido(req.query.numpedcl, function (err, pedidos) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(pedidos)
    });
});

router.post('/cabpedido', function (req, res) {
    pedidosMysql.postCabPedido(req.body, function (err, pedidos) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(pedidos)
    });
});

router.put('/cabpedido', function (req, res) {
    pedidosMysql.putCabPedido(req.body, function (err, pedidos) {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.json(pedidos)
    });
});

router.delete('/cabpedido', function (req, res) {
    pedidosMysql.deleteCabPedido(req.query.numpedcl, function (err, pedidos) {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.json(pedidos)
    });
});

router.post('/linpedido', function (req, res) {
    pedidosMysql.postLinPedido(req.body, function (err, pedidos) {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.json(pedidos)
    });
});

router.put('/linpedido', function (req, res) {
    pedidosMysql.putLinPedido(req.body, function (err, pedidos) {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.json(pedidos)
    });
});

router.delete('/linpedido', function (req, res) {
    pedidosMysql.deleteLinPedido(req.query.numpedcl, req.query.numlinea, function (err, pedidos) {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.json(pedidos)
    });
});


router.get('/cliente/:codclien', function (req, res) {
    var codclien = req.params.codclien;
    if (codclien) {
        pedidosMysql.getPedidosCliente(codclien, function (err, pedidos) {
            if (err) {
                return res.status(500).send(err.message);
            }
            return res.json(pedidos)
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }
});

router.post('/enviar-s2', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send(new Error('Falta un cuerpo con información en el mensaje'));
        }
        if (!req.body.clave || !req.body.email) {
            return res.status(400).send(new Error('Debe incluir la clave y el correo en la solicitud del mensaje'));
        }
        var url = cfg.docUrl + '/intercambio';
        var sistema = dbcfg.database_ariges;
        var tipo = "PED";
        var clave = req.body.clave;
        var email = req.body.email;
        var options = {
            method: 'POST',
            uri: url,
            body: {
                sistema,
                tipo,
                clave,
                email
            },
            json: true // Automatically stringifies the body to JSON
        };
        var respuesta = await rp(options);
        res.json(respuesta);
    } catch (error) {
        return res.status(500).send(error);
    }
});


//
module.exports = router;
