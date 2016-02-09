var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

// putCliente
// modifica un cliente real
module.exports.putCliente = function(cliente, callback) {
    var sql = "UPDATE sclien SET ? WHERE codclien = ?";
    sql = mysql.format(sql, [cliente, cliente.codclien]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        callback(null, cliente);
    });
}


// putCliente
// modifica un cliente real
module.exports.getCliente = function(codclien, callback) {
    var sql = "SELECT";
    sql += " c.codclien AS codclien,";
    sql += " c.nomclien AS nomclien,";
    sql += " c.nomcomer AS nomcomer,";
    sql += " c.domclien AS domclien,";
    sql += " c.codpobla AS codpobla,";
    sql += " c.pobclien AS pobclien,";
    sql += " c.proclien AS proclien,";
    sql += " c.nifclien AS nifclien,";
    sql += " c.perclie1 AS perclie1,";
    sql += " c.telclie1 AS telclie1,";
    sql += " c.faxclie1 AS faxclie1,";
    sql += " c.perclie2 AS perclie2,";
    sql += " c.telclie2 AS telclie2,";
    sql += " c.faxclie2 AS faxclie2,";
    sql += " c.maiclie1 AS maiclie1,";
    sql += " c.maiclie2 AS maiclie2,";
    sql += " c.codmacta AS codmacta,";
    sql += " c.codactiv AS codactiv,";
    sql += " c.codtarif AS codtarif,";
    sql += " c.codforpa AS codforpa,";
    sql += " c.codagent AS codagent,";
    sql += " c.observac AS observac,";
    sql += " sa.nomagent AS nomagent,";
    sql += " sac.nomactiv AS nomactiv,";
    sql += " c.promocio AS promocio,";
    sql += " s.nomsitua AS situacio,";
    sql += " c.limcredi AS limiteCredito,";
    sql += " c.credipriv AS creditoPrivado";
    sql += " FROM sclien AS c";
    sql += " LEFT JOIN ssitua AS s ON s.codsitua = c.codsitua";
    sql += " LEFT JOIN sagent AS sa ON sa.codagent = c.codagent";
    sql += " LEFT JOIN sactiv AS sac ON sac.codactiv = c.codactiv";
    sql += " WHERE c.codclien = ?"
    sql = mysql.format(sql, codclien);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

// getVentaAnual
// obtiene la venta anual de un cliente en formato
// para gráfica estadística
module.exports.getVentaAnual = function(codclien, callback) {
    var sql = "SELECT";
    sql += " (SUM(COALESCE(f.baseimp1,0) + COALESCE(f.baseimp2,0) + COALESCE(f.baseimp3,0)) / COUNT(DISTINCT(f.codclien))) AS venta,";
    sql += " COALESCE(f2.VENTAC,0) AS ventac,";
    sql += " YEAR(f.fecfactu) AS ano";
    sql += " FROM scafac AS f";
    sql += " LEFT JOIN (SELECT";
    sql += " COALESCE(SUM(COALESCE(f.baseimp1,0) + COALESCE(f.baseimp2,0) + COALESCE(f.baseimp3,0)),0) AS VENTAC,";
    sql += " YEAR(f.fecfactu) AS ANOC";
    sql += " FROM scafac AS f";
    sql += " WHERE f.codclien = ?";
    sql += " GROUP BY ANOC) AS f2";
    sql += " ON f2.ANOC = YEAR(f.fecfactu)";
    sql += " GROUP BY ANO";
    sql = mysql.format(sql, codclien);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        // hay que procesar el resultado
        var vmed = [];
        var vcli = [];
        var res = {
            labels: [],
            series: ['Media', 'Cliente'],
            data: [vmed, vcli]
        };
        for (var i=0; i< result.length; i++){
            var d = result[i];
            res.labels.push(d.ano);
            vmed.push(d.venta);
            vcli.push(d.ventac);
        }
        callback(null, res);
    });
}
