//-----------------------------------------------------------------
// clientes-agente_mysql
// implementa el acceso a la basde de datos mysql
//-----------------------------------------------------------------

var mysql = require('mysql');
var conector = require('../comun/conector_mysql');
var async = require('async');

// 
// 
module.exports.getArticulos = function (parnom, callback) {
    var articulos = null;
    var sql = "SELECT"
    sql += " codartic AS codartic,";
    sql += " nomartic AS nomartic,";
    sql += " preciove AS preciove,";
    sql += " codfamia AS codfamia,";
    sql += " codmarca AS codmarca";
    sql += " FROM sartic"
    sql += " WHERE nomartic LIKE ?"
    sql += " AND  codstatu <> 1"
    sql += " ORDER BY nomartic"
    sql = mysql.format(sql, ['%' + parnom + '%']);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)) {
            articulos = result;
        }
        callback(null, articulos);
        conector.closeConnection(connection);
    });

};
// 
module.exports.getArticulosCliente = function (parnom, codclien, codtarif, callback) {
    var articulos = null;
    var sql = "SELECT"
    sql += " codartic AS codartic,";
    sql += " nomartic AS nomartic,";
    sql += " preciove AS preciove,";
    sql += " codfamia AS codfamia,";
    sql += " codmarca AS codmarca";
    sql += " FROM sartic"
    sql += " WHERE nomartic LIKE ?"
    sql += " AND  codstatu <> 1"
    sql += " ORDER BY nomartic"
    sql = mysql.format(sql, ['%' + parnom + '%']);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)) {
            articulos = [];
            for (var i = 0; i < result.length; i++) {
                var articulo = result[i];
                fnPrecioMinimo(function (err, result) {
                    if (err) {
                        callback(err, null);
                        return;
                    }
                    if (result) {
                        // precio mínimo true
                    } else {
                        // precio mínimo false
                    }
                });
            }
        }
        callback(null, articulos);
        conector.closeConnection(connection);
    });

};

// Consultar en los parámetros si hay un precio mínimo o nó
var fnPrecioMinimo = function (callback) {
    var res = false;
    var sql = "SELECT preciominimo FROM spara1";
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)) {
            if (result[0].preciominimo) res = true;
        }
        callback(null, res);
        conector.closeConnection(connection);
    });
};

// fnPrecioPromocion
var fnPrecioPromocion = function (codartic, codclien, codtarif, callback) {
    var precio = {
        pvp: 0,
        dto1: 0,
        dto2: 0,
        importe: 0,
        origen: "PROMOCION"
    };
    var dtopermi = false;
    async.series({
        // (1) spromo --> precioac
        p1: function (callback2) {
            var sql = "SELECT dtopermi, precioac from spromo";
            sql += " WHERE codartic = ?";
            sql += " AND codlista = ?";
            sql += " AND (fechaini <= ? AND fechafin >= ?)";
            sql = mysql.format(sql, [codartic, codtarif, new Date()]);
            var connection = conector.getConnectionAriges();
            connection.query(sql, function (err, result) {
                if (err) {
                    closeConnection(connection);
                    callback2(err);
                    return;
                }
                if (result && (result.length > 0)) {
                    var r = result[0];
                    precio.pvp = r.precioac;
                    dtopermi = r.dtopermi;
                }
                conector.closeConnection(connection);
                callback2();
            });
        },
        // (2) spromo --> precionu
        p2: function (callback2) {
            var sql = "SELECT dtopermi, precionu from spromo";
            sql += " WHERE codartic = ?";
            sql += " AND codlista = ?";
            sql += " AND (fechaini <= ? AND fechafin >= ?)";
            sql = mysql.format(sql, [codartic, codtarif, new Date()]);
            var connection = conector.getConnectionAriges();
            connection.query(sql, function (err, result) {
                if (err) {
                    closeConnection(connection);
                    callback2(err);
                    return;
                }
                if (result && (result.length > 0)) {
                    var r = result[0];
                    precio.pvp = r.precionu;
                    dtopermi = r.dtopermi;
                }
                conector.closeConnection(connection);
                callback2();
            });
        }
    },
        function (err, results) {
            if (err) {
                callback(err);
                return;
            }
            // antes de devolver el precio hay que calcular los descuentos
            if (precio.pvp != 0 && dtopermi){
               // precio = getDescuento(codartic, codclien, precio); 
            }
            // precio = calcularDescuento(precio);
            callback(null, precio);
        });
};