var express = require('express');
var router = express.Router();
var albaranesMysql = require('./albaranes_mysql');
var rp = require('request-promise');
var cfg = require("../../config/config.json");
var dbcfg = require("../../config/mysql_config.json");

router.get('/cliente/:codclien', function (req, res) {
    var codclien = req.params.codclien;
    if (codclien) {
        albaranesMysql.getAlbaranesCliente(codclien, function (err, albaranes) {
            if (err) {
                return res.status(500).send(err.message);
            }
            return res.json(albaranes)
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }
});

router.get('/', function (req, res) {
    albaranesMysql.getAlbaranes(function (err, albaranes) {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.json(albaranes);
    });
});

router.get('/detalle', function (req, res) {
    var codtipom = req.query.codtipom;
    var numalbar = req.query.numalbar
    if (!(codtipom && numalbar)){
        return res.status(400).send('Falta tipo y número de albarán');
    }
    albaranesMysql.getAlbaranDetalle(codtipom, numalbar, function (err, albaranes) {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (albaranes.length == 0){
            return res.status(400).send('Albarán no encontrado');
        }
        return res.json(albaranes[0]);
    });
});

router.get('/pendientes', function (req, res) {
    albaranesMysql.getAlbaranesPendientes(function (err, albaranes) {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.json(albaranes);
    });
});

router.get('/enviados', function (req, res) {
    albaranesMysql.getAlbaranesEnviados(function (err, albaranes) {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.json(albaranes);
    });
});

router.get('/agente', function (req, res) {
    var codagent = req.query.codagent;
    albaranesMysql.getAlbaranesAgente(codagent, function (err, albaranes) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(albaranes)
    });
});

router.post('/enviar', function (req, res) {
    albaranesMysql.postEnviar(req.body, function (err) {
        if (err) return res.status(500).send(err);
        res.json('OK');
    })
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
        var tipo = "ALB";
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

router.post('/desenviar', function (req, res) {
    albaranesMysql.postDesEnviar(req.body, function (err) {
        if (err) return res.status(500).send(err);
        res.json('OK');
    })
});

//
module.exports = router;
