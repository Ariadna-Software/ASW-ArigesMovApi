var express = require('express');
var router = express.Router();
var ofertasMysql = require('./ofertas_mysql');

router.get('/cliente/:codclien', function(req, res) {
    var codclien = req.params.codclien;
    if (codclien) {
        ofertasMysql.getOfertasCliente(codclien, function(err, ofertas) {
            if (err) {
                return res.status(500).send(err.message);
            }
            return res.json(ofertas)
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }
});

router.get('/agente', function (req, res) {
    var codagent = req.query.codagent;
    ofertasMysql.getOfertasAgente(codagent, function (err, ofertas) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(ofertas)
    });
});

router.get('/oferta', function (req, res) {
    ofertasMysql.getOferta(req.query.numofert, function (err, ofertas) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(ofertas)
    });
});

router.post('/caboferta', function (req, res) {
    ofertasMysql.postCabOferta(req.body, function (err, ofertas) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(ofertas)
    });
});

router.put('/caboferta', function (req, res) {
    ofertasMysql.putCabOferta(req.body, function (err, ofertas) {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.json(ofertas)
    });
});

router.delete('/caboferta', function (req, res) {
    ofertasMysql.deleteCabOferta(req.query.numofert, function (err, ofertas) {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.json(ofertas)
    });
});

router.post('/linoferta', function (req, res) {
    ofertasMysql.postLinOferta(req.body, function (err, ofertas) {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.json(ofertas)
    });
});

router.put('/linoferta', function (req, res) {
    ofertasMysql.putLinOferta(req.body, function (err, ofertas) {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.json(ofertas)
    });
});

router.delete('/linoferta', function (req, res) {
    ofertasMysql.deleteLinOferta(req.query.numofert, req.query.numlinea, function (err, ofertas) {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.json(ofertas)
    });
});


router.get('/cliente/:codclien', function (req, res) {
    var codclien = req.params.codclien;
    if (codclien) {
        ofertasMysql.getOfertasCliente(codclien, function (err, ofertas) {
            if (err) {
                return res.status(500).send(err.message);
            }
            return res.json(ofertas)
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }
});

//
module.exports = router;

//
module.exports = router;
