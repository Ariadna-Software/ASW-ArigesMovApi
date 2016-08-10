var express = require('express');
var router = express.Router();
var albaranesMysql = require('./albaranes_mysql');

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

router.post('/enviar', function (req, res) {
    albaranesMysql.postEnviar(req.body, function (err) {
        if (err) return res.status(500).send(err);
        res.json('OK');
    })
});

router.post('/desenviar', function (req, res) {
    albaranesMysql.postDesEnviar(req.body, function (err) {
        if (err) return res.status(500).send(err);
        res.json('OK');
    })
});

//
module.exports = router;
