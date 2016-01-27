//-----------------------------------------------------------------
// clientes-agente_mysql
// implementa el acceso a la basde de datos mysql
//-----------------------------------------------------------------

var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

// [export] getTrabajador
// 
module.exports.getClientesAgente = function(parnom, agente, callback){
    var clientes = null;
    var sql = "SELECT"
     + " c.codclien AS codclien,"
     + " c.nomclien AS nomclien,"
     + " c.nomcomer AS nomcomer,"
     + " c.domclien AS domclien,"
     + " c.codpobla AS codpobla,"
     + " c.pobclien AS pobclien,"
     + " c.proclien AS proclien,"
     + " c.nifclien AS nifclien,"
     + " c.perclie1 AS perclie1,"
     + " c.telclie1 AS telclie1,"
     + " c.faxclie1 AS faxclie1," 
     + " c.perclie2 AS perclie2,"
     + " c.telclie2 AS telclie2,"
     + " c.faxclie2 AS faxclie2," 
     + " c.maiclie1 AS maiclie1,"
     + " c.maiclie2 AS maiclie2,"
     + " c.codmacta AS codmacta,"
     + " c.codactiv AS codactiv,"
     + " c.codtarif AS codtarif,"
     + " c.codforpa AS codforpa,"
     + " c.codagent AS codagent,"
     + " sa.nomagent AS nomagent,"
     + " c.promocio AS promocio,"
     + " s.nomsitua AS situacio,"
     + " c.limcredi AS limiteCredito,"
     + " c.credipriv AS creditoPrivado"
     + " FROM sclien AS c"
     + " LEFT JOIN ssitua AS s ON s.codsitua = c.codsitua"
     + " LEFT JOIN sagent AS sa ON sa.codagent = c.codagent"     
     + " WHERE c.nomclien LIKE ?"
     + " AND s.ocultarbus = 0"
     if (agente){
        sql += " AND c.codagent = ?";
        sql = mysql.format(sql,['%' + parnom + '%', agente]);
     } else {
        sql = mysql.format(sql,['%' + parnom + '%']);
     }
     
    sql = mysql.format(sql,['%' + parnom + '%', agente]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result){
        if (err){
            callback(err, null);
            closeConnection(connection);
            return;
        }
        if (result && (result.length > 0)){
            clientes = result;
        }
        callback(null, clientes);
        conector.closeConnection(connection);
    });

};

