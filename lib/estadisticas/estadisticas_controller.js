var express = require('express');
var router = express.Router();
var estadisticasMysql = require('./estadisticas_mysql');


router.get('/ventas_agente', function (req, res) {
    var codagen = req.query.codagen;
    var fechaini = req.query.fechaini;
    var fechafin = req.query.fechafin;
    if (codagen && fechaini && fechafin) {
        estadisticasMysql.getEstadisticasVentas(codagen, fechaini, fechafin, function (err, estadisticas) {
            if (err) {
                return res.status(500).send(err.message);
            }
            return res.json(estadisticas);
        });
    } else {
        return res.status(400).send('Formato de la petición incorrecto');
    }

});

// exportar router
module.exports = router;
