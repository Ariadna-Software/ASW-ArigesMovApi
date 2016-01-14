var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

module.exports.getOfertasCliente = function(codclien, callback) {
    var ofertas = [];
    var sql = "SELECT";
    sql += " sc.numofert AS numofert,";
    sql += " sc.codclien AS codclien,";
    sql += " sc.fecofert AS fecofert,";
    sql += " sc.fecentre AS fecentre,";
    sql += " sc.aceptado AS aceptado,";
    sql += " sl2.total AS totalofe,";
    sql += " sl.numlinea AS numlinea,";
    sql += " sl.codartic AS codartic,";
    sql += " sl.nomartic AS nomartic,";
    sql += " sl.precioar AS precioar,";
    sql += " sl.cantidad AS cantidad,";
    sql += " sl.dtoline1 AS dtoline1,";
    sql += " sl.dtoline2 AS dtoline2,";
    sql += " sl.importel AS importel";
    sql += " FROM scapre AS sc";
    sql += " LEFT JOIN slipre AS sl ON sl.numofert = sc.numofert";
    sql += " LEFT JOIN (SELECT numofert, SUM(importel) AS total";
    sql += " FROM slipre";
    sql += " GROUP BY numofert) AS sl2 ON sl2.numofert = sc.numofert";
    sql += " WHERE sc.codclien = ?";
    sql += " ORDER BY sc.fecofert DESC,sc.numofert,sl.numlinea;";
    sql = mysql.format(sql, codclien);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            closeConnection(connection);
            return;
        }
        // hay que procesar a JSON
        callback(null, fnOfertasFromDbToJson(result));
        conector.closeConnection(connection);
    });
};

var fnOfertasFromDbToJson = function(ofertas) {
    var ofJs = [];
    var cabJs = null;
    var linJs = null;
    var numofertAnt = 0;
    for (var i = 0; i < ofertas.length; i++) {
        var oferta = ofertas[i];
        if (numofertAnt != oferta.numofert) {
            // es una oferta nueva
            // si ya habiamos procesado una la pasamos al vector
            if (cabJs) {
                ofJs.push(cabJs);
            }
            cabJs = {
                numofert: oferta.numofert,
                fecofert: oferta.fecofert,
                fecentre: oferta.fecentre,
                totalofe: oferta.totalofe,
                aceptado: oferta.aceptado,
                lineas: []
            };
            numofertAnt = oferta.numofert;
        }
        // siempre se procesa una linea
        if (oferta.numlinea) {
            linJs = {
                numlinea: oferta.numlinea,
                codartic: oferta.codartic,
                nomartic: oferta.nomartic,
                precioar: oferta.precioar,
                cantidad: oferta.cantidad,
                dtoline1: oferta.dtoline1,
                dtoline2: oferta.dtoline2,
                importel: oferta.importel
            };
            cabJs.lineas.push(linJs);
        }
    }
    if (cabJs) {
        ofJs.push(cabJs);
    }
    return ofJs;
}
