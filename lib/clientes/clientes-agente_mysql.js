//-----------------------------------------------------------------
// clientes-agente_mysql
// implementa el acceso a la basde de datos mysql
//-----------------------------------------------------------------

var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

// [export] getTrabajador
// 
module.exports.getClientesAgente = function(parnom, agente, porNomComer, callback) {
    var clientes = null;
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
    sql += " sfp.nomforpa AS nomforpa,";
    sql += " c.codagent AS codagent,";
    sql += " c.observac AS observac,";
    sql += " sa.nomagent AS nomagent,";
    sql += " sac.nomactiv AS nomactiv,";
    sql += " c.promocio AS promocio,";
    sql += " s.nomsitua AS situacio,";
    sql += " c.limcredi AS limiteCredito,";
    sql += " c.credipriv AS creditoPrivado,";
    sql += " c.tipofact AS tipofact,";
    sql += " c.dtoppago AS dtoppago,";
    sql += " c.dtognral AS dtognral";
    sql += " FROM sclien AS c";
    sql += " LEFT JOIN ssitua AS s ON s.codsitua = c.codsitua";
    sql += " LEFT JOIN sagent AS sa ON sa.codagent = c.codagent";
    sql += " LEFT JOIN sactiv AS sac ON sac.codactiv = c.codactiv";
    sql += " LEFT JOIN sforpa AS sfp ON sfp.codforpa = c.codforpa";
    if (porNomComer == "true") {
        sql += " WHERE c.nomcomer LIKE ?";
    } else {
        sql += " WHERE c.nomclien LIKE ?";
    }
    sql = mysql.format(sql, '%' + parnom + '%');
    if (agente) {
        sql += " AND c.codagent = ?";
        sql = mysql.format(sql, agente);
    }
    sql += " AND s.ocultarbus = 0";
    sql += " ORDER BY c.nomclien";
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
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
