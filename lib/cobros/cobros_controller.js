var express = require('express');
var router = express.Router();
var cobrosMysql = require('./cobros_mysql');

router.get('/', function (req, res) {
    var query = req.query;
    if (query.codmacta) {
        cobrosMysql.getCobros(query.codmacta, function (err, cobros) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (cobros) {
                res.json(cobros)
            } else {
                res.status(404).send('No se han encontrado cobros para la cuenta');
            }
        });
    } else {
        res.status(400).send('Formato de la petición incorrecto');
    }

});

router.put('/', function (req, res) {
    cobrosMysql.putCobro(req.body, function (err, pago) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(pago);
    });
});

router.get('/lineas', function (req, res) {
    var query = req.query;
    var numserie = query.numserie;
    var codfaccl = query.codfaccl;
    var fecfaccl = query.fecfaccl;
    var numorden = query.numorden;
    if (!numserie || !codfaccl || !fecfaccl || !numorden) {
        return res.status(400).send('Formato de la petición incorrecto');
    }
    cobrosMysql.getLinsCobro(numserie, codfaccl, fecfaccl, numorden, function (err, lineas) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(lineas);
    })
});

router.get('/lineas/agente', function (req, res) {
    var query = req.query;
    var codagent = query.codagent;
    cobrosMysql.getLinsCobroAgente(codagent, function (err, lineas) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(lineas);
    })
});

router.post('/lineas', function (req, res) {
    var lincobro = req.body;
    if (!lincobro) {
        res.status(400).send('Formato de la petición incorrecto');
    }
    cobrosMysql.postLinCobro(lincobro, function (err, result) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(result);
    });
});

router.delete('/lineas', function (req, res) {
    var query = req.query;
    var numserie = query.numserie;
    var codfaccl = query.codfaccl;
    var fecfaccl = query.fecfaccl;
    var numorden = query.numorden;
    var id = query.id;
    var importe = query.importe
    if (!numserie || !codfaccl || !fecfaccl || !numorden || !id || !importe) {
        res.status(400).send('Formato de la petición incorrecto');
    }
    cobrosMysql.deleteLinCobro(numserie, codfaccl, fecfaccl, numorden, id, importe,
        function (err, result) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.json(result);
        })
});


// Exports
module.exports = router;
