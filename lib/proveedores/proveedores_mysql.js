//-----------------------------------------------------------------
// clientes-agente_mysql
// implementa el acceso a la basde de datos mysql
//-----------------------------------------------------------------

var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

// getProvedores
// devuelve los proveedores cuyo nombre coincide con el
// parcial pasado
module.exports.getProveedores = function (parnom, callback) {
    var clientes = null;
    var sql = "SELECT";
    sql += " p.codprove,";
    sql += " p.nomprove,";
    sql += " COALESCE(p.nomcomer,'') AS nomcomer,";
    sql += " COALESCE(p.domprove,'') AS domprove,";
    sql += " COALESCE(p.codpobla,'') AS codpobla,";
    sql += " COALESCE(p.pobprove,'') AS pobprove,";
    sql += " COALESCE(p.proprove,'') AS proprove,";
    sql += " COALESCE(p.nifPROVE,'') AS nifprove,";
    sql += " COALESCE(p.perprov1,'') AS perprov1,";
    sql += " COALESCE(p.telprov1,'') AS telprov1,";
    sql += " COALESCE(p.faxprov1,'') AS faxprov1,";
    sql += " COALESCE(p.perprov2,'') AS perprov2,";
    sql += " COALESCE(p.telprov2,'') AS telprov2,";
    sql += " COALESCE(p.faxprov2,'') AS faxprov2,";
    sql += " COALESCE(p.maiprov1,'') AS maiprov1,";
    sql += " COALESCE(p.maiprov2,'') AS maiprov2";
    sql += " FROM sprove AS p";
    sql += " WHERE nomprove LIKE ?";
    sql += " ORDER BY nomprove";
    sql = mysql.format(sql, ['%' + parnom + '%']);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)) {
            clientes = result;
        }
        callback(null, clientes);
        conector.closeConnection(connection);
    });

};

// getDescuentosRappeles
// devuelve los descuentos y rappeles aplicables
// al proveedor con el código pasado.
module.exports.getDescuentosRappeles = function (codprove, callback) {
    var clientes = null;
    var sql = "SELECT";
    sql += " dr.codfamia,";
    sql += " COALESCE(f.nomfamia,'') AS nomfamia,";
    sql += " COALESCE(dr.codmarca,0) AS codmarca,";
    sql += " COALESCE(m.nommarca,'') AS nomarca,";
    sql += " dr.fechadto,";
    sql += " dr.dtoline1,";
    sql += " dr.dtoline2,";
    sql += " COALESCE(dr.rap1,0) as rap1,";
    sql += " COALESCE(dr.rap2,0) AS rap2";
    sql += " FROM sdtomp AS dr";
    sql += " LEFT JOIN sfamia AS f ON f.codfamia = dr.codfamia";
    sql += " LEFT JOIN smarca AS m ON m.codmarca = dr.codmarca";
    sql += " WHERE dr.codprove = ?";
    sql = mysql.format(sql, codprove);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)) {
            clientes = result;
        }
        callback(null, clientes);
        conector.closeConnection(connection);
    });

};
