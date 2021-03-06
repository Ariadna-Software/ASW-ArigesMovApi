var mysql = require('mysql');
var conector = require('../comun/conector_mysql');
var dbcfg = require("../../config/mysql_config.json");

module.exports.getCobros = function (codmacta, callback) {
    var cobros = null;
    var sql = "SELECT";
    sql += " fecvenci AS fechavenci,";
    sql += " c.numserie AS numserie,";
    sql += " c.codfaccl AS codfaccl,";
    sql += " c.fecfaccl AS fecfaccl,";
    sql += " c.numorden AS numorden,";
    sql += " CONCAT(c.numserie,RIGHT(CONCAT('00000000',CAST(c.codfaccl AS CHAR)),7)) AS numfact,";
    sql += " c.fecfaccl AS fechafact,";
    sql += " c.codforpa AS codforpa,";
    sql += " f.nomforpa AS nomforpa,";
    sql += " c.impvenci AS impvenci,";
    sql += " COALESCE(c.gastos,0) AS gastos,";
    sql += " COALESCE(c.impcobro,0) AS impcobro,";
    sql += " COALESCE(cl.imporlin,0) AS imporlin,";
    sql += " c.impvenci + COALESCE(c.gastos,0) - COALESCE(c.impcobro,0) - COALESCE(cl.imporlin,0) AS total";
    sql += " FROM  scobro AS c";
    sql += " LEFT JOIN sforpa AS f ON c.codforpa=f.codforpa";
    sql += " LEFT JOIN (SELECT SUM(importe) AS imporlin, numserie, codfaccl, fecfaccl, numorden FROM scobrolin GROUP BY numserie, codfaccl, fecfaccl, numorden) AS cl ";
    sql += " ON (cl.numserie = c.numserie AND cl.codfaccl = c.codfaccl AND cl.fecfaccl = c.fecfaccl AND cl.numorden = c.numorden) ";
    sql += " WHERE c.codmacta = ?";
    sql += " AND c.impvenci + COALESCE(c.gastos,0) - COALESCE(c.impcobro,0)- COALESCE(cl.imporlin,0) <> 0";
    sql += " ORDER BY c.fecvenci";
    if (dbcfg.database_conta.indexOf("ariconta") > -1) {
        sql = "SELECT";
        sql += " fecvenci AS fechavenci,";
        sql += " c.numserie AS numserie,";
        sql += " c.numfactu AS codfaccl,";
        sql += " c.fecfactu AS fecfaccl,";
        sql += " c.numorden AS numorden,";
        sql += " CONCAT(c.numserie,RIGHT(CONCAT('00000000',CAST(c.numfactu AS CHAR)),7)) AS numfact,";
        sql += " c.fecfactu AS fechafact,";
        sql += " c.codforpa AS codforpa,";
        sql += " f.nomforpa AS nomforpa,";
        sql += " c.impvenci AS impvenci,";
        sql += " COALESCE(c.gastos,0) AS gastos,";
        sql += " COALESCE(c.impcobro,0) AS impcobro,";
        sql += " c.impvenci + COALESCE(c.gastos,0) - COALESCE(c.impcobro,0) AS total";
        sql += " FROM  cobros AS c";
        sql += " LEFT JOIN formapago AS f ON c.codforpa=f.codforpa";
        sql += " WHERE c.codmacta = ?";
        sql += " AND c.impvenci + COALESCE(c.gastos,0) - COALESCE(c.impcobro,0) <> 0";
        sql += " ORDER BY c.fecvenci";
    }
    sql = mysql.format(sql, codmacta);
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        if (result) {
            cobros = result;
        }
        return callback(null, cobros);
    });
};

//devuelve los cobroas parciales asociados a un usuario
module.exports.getCobrosUsuario = function (codusu, callback) {
    var cobros = null;
    var sql = "SELECT";
    sql += " fecvenci AS fechavenci,";
    sql += " c.numserie AS numserie,";
    sql += " c.codfaccl AS codfaccl,";
    sql += " c.fecfaccl AS fecfaccl,";
    sql += " c.numorden AS numorden,";
    sql += " CONCAT(c.numserie,RIGHT(CONCAT('00000000',CAST(c.codfaccl AS CHAR)),7)) AS numfact,";
    sql += " c.fecfaccl AS fechafact,";
    sql += " c.codforpa AS codforpa,";
    sql += " f.nomforpa AS nomforpa,";
    sql += " c.impvenci AS impvenci,";
    sql += " c.nomclien AS nomclien,"
    sql += " COALESCE(c.gastos,0) AS gastos,";
    sql += " COALESCE(c.impcobro,0) AS impcobro,";
    sql += " COALESCE(cl.imporlin,0) AS imporlin,";
    sql += " c.impvenci + COALESCE(c.gastos,0) - COALESCE(c.impcobro,0) - COALESCE(cl.imporlin,0) AS total";
    sql += " FROM  scobro AS c";
    sql += " LEFT JOIN sforpa AS f ON c.codforpa=f.codforpa";
    sql += " LEFT JOIN (SELECT SUM(importe) AS imporlin, numserie, codfaccl, fecfaccl, numorden FROM scobrolin GROUP BY numserie, codfaccl, fecfaccl, numorden) AS cl ";
    sql += " ON (cl.numserie = c.numserie AND cl.codfaccl = c.codfaccl AND cl.fecfaccl = c.fecfaccl AND cl.numorden = c.numorden) ";
    sql += " WHERE c.agente = -1";//ponia ? donde pone -1
    sql += " AND c.impvenci + COALESCE(c.gastos,0) - COALESCE(c.impcobro,0)- COALESCE(cl.imporlin,0) <> 0";
    sql += " ORDER BY c.fecvenci";
    if (dbcfg.database_conta.indexOf("ariconta") > -1) {
        sql = "SELECT";
        sql += " c.fecvenci AS fechavenci,";
        sql += " cp.numserie AS numserie,";
        sql += " cp.numfactu AS codfaccl,";
        sql += " cp.fecfactu AS fechafact,";
        sql += " cp.fecha AS fecha,";
        sql += " cp.numorden AS numorden,";
        sql += " CONCAT(cp.numserie,RIGHT(CONCAT('00000000',CAST(cp.numfactu AS CHAR)),7)) AS numfact,";
        sql += " cp.tipoformapago AS codforpa,";
        sql += " tf.descformapago AS nomforpa,";
        sql += " cp.impcobrado AS impcobrado,";
        sql += " cp.codusu AS codusu,";
        sql += " c.impvenci + COALESCE(c.gastos,0) - COALESCE(c.impcobro,0) AS total,";
        sql += " c.nomclien AS nomclien,"
        sql += " cp.observa AS observa"
        sql += " FROM  cobros_parciales AS cp";
        sql += " LEFT JOIN tipofpago AS tf ON tf.tipoformapago =  cp.tipoformapago";
        sql += " LEFT JOIN cobros AS c ON cp.numserie = c.numserie AND cp.numfactu = c.numfactu AND cp.fecfactu = c.fecfactu AND cp.numorden = c.numorden";
        sql += " WHERE cp.codusu = ?";
        sql += " ORDER BY cp.fecha DESC";
    }
    sql = mysql.format(sql, codusu);
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        if (result) {
            cobros = result;
        }
        return callback(null, cobros);
    });
};

module.exports.putCobro = function (pago, callback) {
    var sql = "UPDATE scobro SET ? WHERE numserie = ? AND codfaccl = ? AND fecfaccl = ? AND numorden = ?";
    sql = mysql.format(sql, [pago, pago.numserie, pago.codfaccl, pago.fecfaccl, pago.numorden]);
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        return callback(null, pago);
    });
};

module.exports.putCobroParcial = function (pago, callback) {
    var sql = "UPDATE cobros_parciales SET ? WHERE numserie = ? AND numfactu = ? AND fecfactu = ? AND numorden = ?";
    sql = mysql.format(sql, [pago, pago.numserie, pago.numfactu, pago.fecfactu, pago.numorden]);
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        return callback(null, pago);
    });
};

// getCobroParcial
// Devuelve el cobro parcial asiciado a un cobro
module.exports.getCobroParcial = function (numserie, numfactu, fecfactu, numorden, callback) {
    var sql = "SELECT";
        sql += " c.fecvenci AS fechavenci,";
        sql += " cp.numserie AS numserie,";
        sql += " cp.numfactu AS codfaccl,";
        sql += " cp.fecfactu AS fechafact,";
        sql += " cp.fecha AS fecha,";
        sql += " cp.numorden AS numorden,";
        sql += " CONCAT(cp.numserie,RIGHT(CONCAT('00000000',CAST(cp.numfactu AS CHAR)),7)) AS numfact,";
        sql += " cp.tipoformapago AS codforpa,";
        sql += " tf.descformapago AS nomforpa,";
        sql += " cp.impcobrado AS impcobrado,";
        sql += " cp.codusu AS codusu,";
        sql += " c.impvenci + COALESCE(c.gastos,0) - COALESCE(c.impcobro,0) AS total,";
        sql += " c.nomclien AS nomclien,"
        sql += " cp.observa AS observa"
        sql += " FROM  cobros_parciales AS cp";
        sql += " LEFT JOIN tipofpago AS tf ON tf.tipoformapago =  cp.tipoformapago";
        sql += " LEFT JOIN cobros AS c ON cp.numserie = c.numserie AND cp.numfactu = c.numfactu AND cp.fecfactu = c.fecfactu AND cp.numorden = c.numorden";
        sql += " WHERE cp.numserie = ? AND cp.numfactu = ? AND cp.fecfactu = ? AND cp.numorden = ?";
        sql += " ORDER BY cp.fecha DESC";
  
    sql = mysql.format(sql, [numserie, numfactu, fecfactu, numorden]);
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, res) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    });
};


// getCobroCliente
// Devuelve las lineas de cobro asociada con la clave primaria compuesta 
module.exports.getCobroCliente = function (numserie, codfaccl, fecfaccl, numorden, callback) {
    var sql = "SELECT";
    sql += " fecvenci AS fechavenci,";
    sql += " c.numserie AS numserie,";
    sql += " c.codfaccl AS codfaccl,";
    sql += " c.fecfaccl AS fecfaccl,";
    sql += " c.numorden AS numorden,";
    sql += " CONCAT(c.numserie,RIGHT(CONCAT('00000000',CAST(c.codfaccl AS CHAR)),7)) AS numfact,";
    sql += " c.fecfaccl AS fechafact,";
    sql += " c.codforpa AS codforpa,";
    sql += " f.nomforpa AS nomforpa,";
    sql += " c.impvenci AS impvenci,";
    sql += " COALESCE(c.gastos,0) AS gastos,";
    sql += " COALESCE(c.impcobro,0) AS impcobro,";
    sql += " COALESCE(cl.imporlin,0) AS imporlin,";
    sql += " c.impvenci + COALESCE(c.gastos,0) - COALESCE(c.impcobro,0) - COALESCE(cl.imporlin,0) AS total";
    sql += " FROM  scobro AS c";
    sql += " LEFT JOIN sforpa AS f ON c.codforpa=f.codforpa";
    sql += " LEFT JOIN (SELECT SUM(importe) AS imporlin, numserie, codfaccl, fecfaccl, numorden FROM scobrolin GROUP BY numserie, codfaccl, fecfaccl, numorden) AS cl ";
    sql += " ON (cl.numserie = c.numserie AND cl.codfaccl = c.codfaccl AND cl.fecfaccl = c.fecfaccl AND cl.numorden = c.numorden) ";
    sql += " WHERE c.numserie = ? AND c.codfaccl = ? AND c.fecfaccl = ? AND c.numorden = ?";
    sql += " AND c.impvenci + COALESCE(c.gastos,0) - COALESCE(c.impcobro,0)- COALESCE(cl.imporlin,0) <> 0";
    sql += " ORDER BY c.fecvenci";
  
    sql = mysql.format(sql, [numserie, codfaccl, fecfaccl, numorden]);
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, res) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    });
};

// getLinsCobro
// Devuelve las lineas de cobro asociada con la clave primaria compuesta 
module.exports.getLinsCobro = function (numserie, codfaccl, fecfaccl, numorden, callback) {
    var sql = "SELECT scl.*, a.Nombre as nomagent, sf.nomforpa";
    sql += " FROM scobrolin AS scl";
    sql += " LEFT JOIN agentes AS a on a.Codigo = scl.codagent";
    sql += " LEFT JOIN sforpa AS sf on sf.codforpa = scl.codforpa";
    sql += " WHERE numserie = ? AND codfaccl = ? AND fecfaccl = ? AND numorden = ?";
    sql = mysql.format(sql, [numserie, codfaccl, fecfaccl, numorden]);
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, res) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    });
};

// getLinsCobroAgente
// Devuelve las lineas de cobro de un determinado agente 
// si no se pasa un agemte se devuelven tdas las lineas
// de cobos de la base de datos
module.exports.getLinsCobroAgente = function (codagent, callback) {
    var sql = "SELECT scl.*, a.Nombre as nomagent, sf.nomforpa, c.nommacta, c.razosoci";
    sql += " FROM scobrolin AS scl";
    sql += " LEFT JOIN agentes AS a on a.Codigo = scl.codagent";
    sql += " LEFT JOIN sforpa AS sf on sf.codforpa = scl.codforpa";
    sql += " LEFT JOIN scobro as sc on sc.numserie = scl.numserie AND sc.codfaccl = scl.codfaccl AND sc.fecfaccl = scl.fecfaccl AND sc.numorden = scl.numorden";
    sql += " LEFT JOIN cuentas as c on c.codmacta = sc.codmacta";
    sql
    if (codagent) {
        sql += " AND codagent = ?";
        sql = mysql.format(sql, codagent);
    }
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, res) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        return callback(null, res);
    });
};



// postLinCobro
// crea una linea de cobro
module.exports.postLinCobro = function (lincobro, callback) {
    getNextId(lincobro.numserie, lincobro.codfaccl, lincobro.fecfaccl, lincobro.numorden,
        function (err, res) {
            if (err) {
                return callback(err);
            }
            lincobro.id = res;
            // -- hay que montar una transacción porque se actualizan 
            // dos tablas.
            var sql = "";
            var connection = conector.getConnectionConta();
            connection.beginTransaction(function (err) {
                if (err) {
                    return callback(err);
                }
                sql = "INSERT INTO scobrolin SET ?";
                sql = mysql.format(sql, lincobro);
                connection.query(sql, function (err, result) {
                    if (err) {
                        return connection.rollback(function () {
                            return callback(err, null)
                        });
                    }
                    connection.commit(function (err) {
                        if (err) {
                            return connection.rollback(function () {
                                return callback(err, null)
                            });
                        }
                        return callback(null, lincobro);
                    });
                });
            });
        });
};

// postCobroParcial
// crea un cobro parcial
module.exports.postCobroParcial = function (cobroParcial, callback) {
            cobroParcial.id = 0 //fuerza el uso del autoincremento
            var sql = "";
            var connection = conector.getConnectionConta();
            sql = "INSERT INTO cobros_parciales SET ?";
            sql = mysql.format(sql, cobroParcial);
            connection.query(sql, function (err, result) {
                if (err) {
                    return callback(err, null)
                }
                return callback(null, cobroParcial);
            });
};

// deleteLinCobro
// eliminar una linea de cobro
module.exports.deleteLinCobro = function (numserie, codfaccl, fecfaccl, numorden, id, importe, callback) {
    // -- hay que montar una transacción porque se actualizan 
    // dos tablas.
    var sql = "";
    var connection = conector.getConnectionConta();
    connection.beginTransaction(function (err) {
        if (err) {
            return callback(err);
        }
        sql = "DELETE FROM scobrolin ";
        sql += " WHERE numserie = ?";
        sql += " AND codfaccl = ?";
        sql += " AND fecfaccl = ?";
        sql += " AND numorden = ?";
        sql += " AND id = ?";
        sql = mysql.format(sql, [numserie, codfaccl, fecfaccl, numorden, id]);
        connection.query(sql, function (err, result) {
            if (err) {
                return connection.rollback(function () {
                    return callback(err, null)
                });
            }
            connection.commit(function (err) {
                if (err) {
                    return connection.rollback(function () {
                        return callback(err, null)
                    });
                }
                return callback(null, null);
            });
        });
    });
};

// getNextId
// obtiene el siguiente id de la tabla scobrolin
var getNextId = function (numserie, codfaccl, fecfaccl, numorden, callback) {
    var sql = "SELECT MAX(id) + 1 AS nxt FROM scobrolin WHERE numserie = ?";
    sql += " AND codfaccl = ?";
    sql += " AND fecfaccl = ?";
    sql += " AND numorden = ?";
    sql = mysql.format(sql, [numserie, codfaccl, fecfaccl, numorden]);
    var connection = conector.getConnectionConta();
    connection.query(sql, function (err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        var nxt = result[0].nxt;
        if (!nxt) nxt = 1;
        return callback(null, nxt);
    });
};
