var mysql = require('mysql');
var conector = require('../comun/conector_mysql');


module.exports.getEstadisticasVentas = function (codagen, fechaini, fechafin, callback) {
    var sql = `SELECT tot.nomtipar, SUM(tot.total) AS total
        FROM
        (SELECT 
        tip.nomtipar, SUM(lin.importel) AS total
        FROM scafac AS cab
        LEFT JOIN slifac AS lin ON lin.codtipom = cab.codtipom AND lin.numfactu = cab.numfactu AND lin.fecfactu = cab.fecfactu
        LEFT JOIN sartic AS art ON art.codartic = lin.codartic
        LEFT JOIN stipar AS tip ON tip.codtipar = art.codtipar
        WHERE cab.codagent = ${codagen}
        AND cab.fecfactu >= '${fechaini}' AND cab.fecfactu <= '${fechafin}'
        GROUP BY 1
        UNION
        SELECT 
        tip.nomtipar, SUM(lin.importel) AS total
        FROM scaalb AS cab
        LEFT JOIN slialb AS lin ON lin.codtipom = cab.codtipom AND lin.numalbar = cab.numalbar
        LEFT JOIN sartic AS art ON art.codartic = lin.codartic
        LEFT JOIN stipar AS tip ON tip.codtipar = art.codtipar
        WHERE cab.codagent = ${codagen}
        AND cab.fechaalb >= '${fechaini}' AND cab.fechaalb <= '${fechafin}'
        GROUP BY 1) AS tot
        GROUP BY 1`;
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        return callback(null, result);
    });
};
