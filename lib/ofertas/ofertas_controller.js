var express = require('express');
var router = express.Router();
var ofertasMysql = require('./ofertas_mysql');
var rp = require('request-promise');
var cfg = require("../../config/config.json");
var dbcfg = require("../../config/mysql_config.json");

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
        var tipo = "OFE";
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
