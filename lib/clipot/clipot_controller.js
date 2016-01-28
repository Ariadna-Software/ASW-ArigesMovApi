var express = require('express');
var router = express.Router();
var clipotMysql = require('./clipot_mysql');

router.get('/', function (req, res) {
    if (!req.query.parnom) {
        return res.status(500).send("Formato de la petición incorrecto");
    }
    clipotMysql.getClipots(req.query.parnom, function (err, clipots) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(clipots)
    });
});

router.get('/:codclien', function (req, res) {
    if (!req.params.codclien) {
        return res.status(500).send("Formato de la petición incorrecto");
    }
    var codclien = req.params.codclien;
    if (codclien) {
        clipotMysql.getClipot(codclien, function (err, clipot) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.json(clipot)
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }
});

router.post('/', function (req, res) {
    if (!req.body) {
        return res.status(500).send("Formato de la petición incorrecto");
    }
    clipotMysql.postClipot(req.body, function (err, clipot) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(clipot)
    });
});

router.put('/', function (req, res) {
    if (!req.body) {
        return res.status(500).send("Formato de la petición incorrecto");
    }    
    clipotMysql.putClipot(req.body, function (err, clipot) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(clipot)
    });
});

router.delete('/', function (req, res) {
    if (!req.query.codclien) {
        return res.status(500).send("Formato de la petición incorrecto");
    }
    clipotMysql.deleteClipot(req.query.codclien, function (err, clipot) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(clipot)
    });
});



//
module.exports = router;
