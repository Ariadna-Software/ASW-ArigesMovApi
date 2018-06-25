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
    sql += " c.dtognral AS dtognral,";
    sql += " tc.nomTipoCredito AS nomCreditoPrivado";
    sql += " FROM sclien AS c";
    sql += " LEFT JOIN stipocredito AS tc ON tc.codTipoCredito = c.credipriv";
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
//versión extendida de getClientesAgente que nos devuelve de sclientdp 
//nombre, dpto, cargo, telefono, movil y email

module.exports.getClientesAgenteExt = function(parnom, agente, porNomComer, callback) {
    var clientes = null;
    var sql = "SELECT DISTINCT";
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
    sql += " c.dtognral AS dtognral,";
    sql += " tc.nomTipoCredito AS nomCreditoPrivado,";
    sql += " scdp.nombre AS nombre,";
    sql += " scdp.dpto AS departamento,";
    sql += " scdp.cargo AS cargo,";
    sql += " scdp.telefono AS telefono,";
    sql += " scdp.movil AS movil,";
    sql += " scdp.maidirec AS maidirec"
    sql += " FROM sclien AS c";
    sql += " LEFT JOIN stipocredito AS tc ON tc.codTipoCredito = c.credipriv";
    sql += " LEFT JOIN ssitua AS s ON s.codsitua = c.codsitua";
    sql += " LEFT JOIN sagent AS sa ON sa.codagent = c.codagent";
    sql += " LEFT JOIN sactiv AS sac ON sac.codactiv = c.codactiv";
    sql += " LEFT JOIN sforpa AS sfp ON sfp.codforpa = c.codforpa";
    sql += " LEFT JOIN scliendp AS scdp ON scdp.codclien = c.codclien";
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
    sql += " ORDER BY scdp.dpto";
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        if (result && (result.length > 0)) {
            clientes = result;
            clientes = montaObjetoCliente(clientes);
        }
        return callback(null, clientes);
    });

};

var  montaObjetoCliente = function(clientes) {
    var obj = [];
    var result = {};
    var artis = [];
    var  antCliente = clientes[0].codartic;
    clientes.forEach(function(a) {
        //como puede haber mas de un registro por articulo los agrupamos por el codigo del articulo
        if(antCliente == a.codartic) {
            obj.push(a);
            antCliente = a.codartic
        } else {
            antCliente = a.codartic
            result = procesarCliente(obj);
            obj = [];
            obj.push(a);
            artis.push(result);
        }
    });
    result = procesarCliente(obj);
    artis.push(result);
    return  artis;
}


var procesarCliente = function(cli) {
    var clien = {
        codclien: cli[0].codclien,
        nomclien : cli[0].nomclien,
        nomcomer: cli[0].nomcomer,
        domclien: cli[0].domclien,
        nomcomer: cli[0].nomcomer,
        codpobla: cli[0].codpobla,
        pobclien: cli[0].pobclien,
        proclien: cli[0].proclien,
        nifclien: cli[0].nifclien,
        perclie1: cli[0].perclie1,
        telclie1: cli[0].telclie1,
        faxclie1: cli[0].faxclie1,
        perclie2: cli[0].perclie2,
        telclie2: cli[0].telclie2,
        faxclie2: cli[0].faxclie2,
        maiclie1: cli[0].maiclie1,
        maiclie2: cli[0].maiclie2,
        codmacta: cli[0].codmacta,
        codactiv: cli[0].codactiv,
        codtarif: cli[0].codtarif,
        codforpa: cli[0].codforpa,
        nomforpa: cli[0].nomforpa,
        codagent: cli[0].codagent,
        observac: cli[0].observac,
        nomagent: cli[0].nomagent,
        nomactiv: cli[0].nomactiv,
        promocio: cli[0].promocio,
        situacio: cli[0].situacio,
        limiteCredito: cli[0].limiteCredito,
        creditoPrivado: cli[0].creditoPrivado,
        tipofact: cli[0].tipofact,
        dtoppago: cli[0].dtoppago,
        dtognral: cli[0].dtognral,
        nomCreditoPrivado: cli[0].nomCreditoPrivado,
        departamentos: []
    }
    cli.forEach( function(a){
        var obj = {
            nombre: a.nombre,
            departamento: a.departamento,
            cargo: a.cargo,
            telefono: a.telefono,
            movil: a.movil,
            maidirec: a.maidirec
        }
        clien.departamentos.push(obj);
    });
    return clien;
}



