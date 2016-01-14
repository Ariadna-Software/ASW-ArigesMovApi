var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

module.exports.getAlbaranesCliente = function(codclien, callback) {
    var albaranes = [];
    var sql = "SELECT";
    sql += " sc.codtipom AS codtipom,";
    sql += " sc.numalbar AS numalbar,";
    sql += " sc.codclien AS codclien,";
    sql += " sc.fechaalb AS fechaalb,";
    sql += " sl2.totalalb AS totalalb,";
    sql += " sl.numlinea AS numlinea,";
    sql += " sl.codartic AS codartic,";
    sql += " sl.nomartic AS nomartic,";
    sql += " sl.precioar AS precioar,";
    sql += " sl.cantidad AS cantidad,";
    sql += " sl.dtoline1 AS dtoline1,";
    sql += " sl.dtoline2 AS dtoline2,";
    sql += " sl.importel AS importel";
    sql += " FROM scaalb AS sc";
    sql += " LEFT JOIN slialb AS sl ON (sl.codtipom = sc.codtipom AND sl.numalbar = sc.numalbar)";
    sql += " LEFT JOIN (SELECT codtipom, numalbar, SUM(importel) AS totalalb";
    sql += " FROM slialb";
    sql += " GROUP BY codtipom, numalbar) AS sl2 ON (sl2.codtipom = sc.codtipom AND sl2.numalbar = sc.numalbar)";
    sql += " WHERE sc.codclien = ?";
    sql += " ORDER BY sc.fechaalb DESC,sc.codtipom,sc.numalbar,sl.numlinea;";
    sql = mysql.format(sql, codclien);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            closeConnection(connection);
            return;
        }
        // hay que procesar a JSON
        callback(null, fnAlbaranesFromDbToJson(result));
        conector.closeConnection(connection);
    });
};

var fnAlbaranesFromDbToJson = function(albaranes) {
    var pdJs = [];
    var cabJs = null;
    var linJs = null;
    var numalbAnt = 0;
    var tipomAnt = 0;
    for (var i = 0; i < albaranes.length; i++) {
        var albaran = albaranes[i];
        if (numalbAnt != albaran.numalbar || tipomAnt != albaran.codtipom) {
            // es una albaran nueva
            // si ya habiamos procesado una la pasamos al vector
            if (cabJs) {
                pdJs.push(cabJs);
            }
            cabJs = {
                numalbar: albaran.numalbar,
                codtipom: albaran.codtipom,
                fechaalb: albaran.fechaalb,
                totalalb: albaran.totalalb,
                lineas: []
            };
            numalbAnt = albaran.numalbar;
            tipomAnt = albaran.codtipom;
        }
        // siempre se procesa una linea
        if (albaran.numlinea) {
            linJs = {
                numlinea: albaran.numlinea,
                codartic: albaran.codartic,
                nomartic: albaran.nomartic,
                precioar: albaran.precioar,
                cantidad: albaran.cantidad,
                dtoline1: albaran.dtoline1,
                dtoline2: albaran.dtoline2,
                importel: albaran.importel
            };
            cabJs.lineas.push(linJs);
        }
    }
    if (cabJs) {
        pdJs.push(cabJs);
    }
    return pdJs;
}
