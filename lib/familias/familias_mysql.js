﻿//-----------------------------------------------------------------
// familias_mysql
// implementa el acceso a la basde de datos mysql
//-----------------------------------------------------------------

var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

// getFamilias
// devuelve las familias cuyo nombre coincide con el
// parcial pasado
module.exports.getFamilias = function (parnom, callback) {
    var clientes = null
    var sql = "SELECT * from sfamia";
    sql += " WHERE nomfamia LIKE ?";
    sql += " order by nomfamia";
    sql = mysql.format(sql, ['%' + parnom + '%']);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        if (result && (result.length > 0)) {
            clientes = result;
        }
        return callback(null, clientes);
    });

};

