var mysql = require('mysql');
var conector = require('../comun/conector_mysql');
// getClipots
// devuelve todos los clientes potenciales de la base de datos
module.exports.getClipots = function (parnom, callback) {
    var sql = "SELECT c.*, a.nomactiv FROM sclipot AS c";
    sql += " LEFT JOIN sactiv AS a ON a.codactiv = c.codactiv";
    sql += " WHERE nomclien LIKE ?";
    sql = mysql.format(sql, '%' + parnom + '%')
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        // hay que procesar a JSON
        callback(null, result);
    });
};

module.exports.getClipot = function (codclien, callback) {
    var sql = "SELECT c.*, a.nomactiv FROM sclipot AS c"; 
    sql += " LEFT JOIN sactiv AS a ON a.codactiv = c.codactiv";
    sql += " WHERE codclien = ?";
    sql = mysql.format(sql, codclien)
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        if (result.length == 0) {
            return callback(null, null);
        }
        // hay que procesar a JSON
        callback(null, result[0]);
    });
};

// postClipot
// crea un cliente potencial
module.exports.postClipot = function (clipot, callback) {
    getNextCodclien(function (err, res) {
        if (err) {
            return callback(err);
        }
        clipot.codclien = res;
        var sql = "INSERT INTO sclipot SET ?";
        sql = mysql.format(sql, clipot);
        var connection = conector.getConnectionAriges();
        connection.query(sql, function (err, result) {
            conector.closeConnection(connection);
            if (err) {
                return callback(err, null);
            }
            callback(null, clipot);
        });
    });
};

// putClipot
// modifica un cliente potencial
module.exports.putClipot = function (clipot, callback) {
    var sql = "UPDATE sclipot SET ? WHERE codclien = ?";
    sql = mysql.format(sql, [clipot, clipot.codclien]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        callback(null, clipot);
    });
}

// deleteClipot
// elimina un cliente potencial
module.exports.deleteClipot = function (codclien, callback) {
    var sql = "DELETE FROM sclipot WHERE codclien = ?";
    sql = mysql.format(sql, codclien);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        callback(null, codclien);
    });
}



// getNextCodclien
// obtiene el siguiente número de código de cliente según el orden dado
var getNextCodclien = function (callback) {
    var sql = "SELECT MAX(codclien) + 1 AS nxt FROM sclipot";
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        var nxt = result[0].nxt;
        if (!nxt) {
            nxt = 1;
        }
        callback(null, nxt);
    });
};
