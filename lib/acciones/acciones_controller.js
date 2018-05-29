var express = require('express');
var router = express.Router();
var accionesMysql = require('./acciones_mysql');

router.get('/', function(req, res) {
    
    var query = req.query;
    if (query.tipo &&  query.login && query.codclien ) {
        accionesMysql.getAcciones(query.tipo, query.login, query.codclien, function(err, acciones) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (acciones) {
                return res.json(acciones)
            } else {
                return res.status(404).send('No se han encontrado visitas con esos criterios');
            }
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }
});


router.get('/tipos', function(req, res) {
    
    var query = req.query;
    if (query.tipo) {
        accionesMysql.getAccionesTipo(query.tipo, function(err, tipoAcciones) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (tipoAcciones) {
                return res.json(tipoAcciones)
            } else {
                return res.status(404).send('No se han encontrado tipos con esos criterios');
            }
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }
});

router.get('/tipos/uno', function(req, res) {
    
    var query = req.query;
    if (query.tipo) {
        accionesMysql.getAccionTipo(query.tipo, function(err, tipoAcciones) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (tipoAcciones) {
                return res.json(tipoAcciones)
            } else {
                return res.status(404).send('No se han encontrado tipos con esos criterios');
            }
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }
});

router.post('/', function (req, res) {
    var visita = req.body;
    if (!visita) {
        return res.status(400).send('Formato de la petición incorrecto');
    }
    cobrosMysql.postVisita(visita, function (err, result) {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.json(result);
    });
});

router.put('/', function (req, res) {
    var visita = req.body;
    if (!visita) {
        return res.status(400).send('Formato de la petición incorrecto');
    }
    accionesMysql.putVisita(visita, function (err, result) {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.json(result);
    });
});

// Exports
module.exports = router;