var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

// getAcciones
//devuelve todas las acciones con el tipo >= a 21

module.exports.getAcciones = function (tipo, login, codclien, callback) {
    
    var sql = "SELECT ac.*, tip.denominacion AS denominacion FROM scrmacciones AS ac";
    sql += " LEFT JOIN scrmtipo AS tip ON tip.codigo = ac.tipo";
    sql += " WHERE ac.tipo >=  ? AND ac.usuario = ? AND ac.codclien = ?";
    sql += " ORDER BY ac.fechora DESC"
    sql = mysql.format(sql, [tipo, login, codclien]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        
        callback(null, result );
    });

};

module.exports.getAccionesAgente = function (tipo, login, fechaInicial, fechaFinal, callback) {
    
    var sql = "SELECT ac.*, tip.denominacion AS denominacion, sc.nomclien as nombreCliente FROM scrmacciones AS ac";
    sql += " LEFT JOIN scrmtipo AS tip ON tip.codigo = ac.tipo";
    sql += " LEFT JOIN sclien AS sc ON sc.codclien = ac.codclien";
    sql += " WHERE ac.tipo >=  ? AND ac.usuario = ?";
    sql += " AND fechora >= ? AND fechora <= ?"
    sql += " ORDER BY ac.fechora DESC"
    sql = mysql.format(sql, [tipo, login, fechaInicial, fechaFinal]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        
        callback(null, result );
    });

};

module.exports.getAccionesTipo = function (tipo, callback) {
    var tipos = null
    var sql = "SELECT * FROM scrmtipo";
    sql += " WHERE codigo >=  ?";
    sql = mysql.format(sql, tipo);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        if (result && (result.length > 0)) {
            tipos = result;
        }
        callback(null, tipos );
    });

};

module.exports.getAccionTipo = function (tipo, callback) {
    var tipos = null
    var sql = "SELECT * FROM scrmtipo";
    sql += " WHERE codigo =  ?";
    sql = mysql.format(sql, tipo);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        if (result && (result.length > 0)) {
            tipos = result;
        }
        callback(null, tipos );
    });

};

module.exports.postVisita = function (visita, callback) {
    
    var sql = "";
    var connection = conector.getConnectionAriges();
    sql = "INSERT INTO scrmacciones SET ?";
    sql = mysql.format(sql, visita);
    connection.query(sql, function (err, result) {
        if (err) {
            return callback(err, null)
        }
        return callback(null, visita);
    });
};

module.exports.putVisita = function (visita, callback) {
    var sql = "UPDATE scrmacciones SET ? WHERE usuario = ? AND fechora = ? AND codclien = ?";
    sql = mysql.format(sql, [visita, visita.usuario, visita.fechora, visita.codclien]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        return callback(null, visita);
    });
};