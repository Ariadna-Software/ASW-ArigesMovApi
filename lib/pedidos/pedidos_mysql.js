var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

// getPedidos
// devuelve todos los pedidos de la base de datos
module.exports.getPedido = function(numpedcl, callback) {
    var sql = "SELECT"
    sql += " sc.numpedcl AS numpedcl,";
    sql += " sc.codclien AS codclien,";
    sql += " cl.codactiv AS codactiv,";
    sql += " cl.codtarif AS codtarif,";
    sql += " sc.codagent AS codagent,";
    sql += " sc.codtraba AS codtraba,";
    sql += " sc.codforpa AS codforpa,";
    sql += " cl.nomclien AS nomclien,";
    sql += " cl.domclien AS domclien,";
    sql += " cl.codpobla AS codpobla,";
    sql += " cl.pobclien AS pobclien,";
    sql += " cl.proclien AS proclien,";
    sql += " cl.nifclien AS nifclien,";
    sql += " sc.codagent AS codagent,";
    sql += " ag.nomagent AS nomagent,";
    sql += " sc.fecpedcl AS fecpedcl,";
    sql += " sc.fecentre AS fecentre,";
    sql += " sl2.total AS totalped,";
    sql += " sl.numlinea AS numlinea,";
    sql += " sl.codartic AS codartic,";
    sql += " sl.nomartic AS nomartic,";
    sql += " sl.precioar AS precioar,";
    sql += " sl.cantidad AS cantidad,";
    sql += " sl.servidas AS servidas,";
    sql += " sl.dtoline1 AS dtoline1,";
    sql += " sl.dtoline2 AS dtoline2,";
    sql += " sl.importel AS importel";
    sql += " FROM scaped AS sc";
    sql += " LEFT JOIN sclien as cl ON cl.codclien = sc.codclien";
    sql += " LEFT JOIN sagent as ag ON ag.codagent = sc.codagent";
    sql += " LEFT JOIN sliped AS sl ON sl.numpedcl = sc.numpedcl";
    sql += " LEFT JOIN (SELECT numpedcl, SUM(importel) AS total";
    sql += " FROM sliped";
    sql += " GROUP BY numpedcl) AS sl2 ON sl2.numpedcl = sc.numpedcl";
    sql += " WHERE sc.numpedcl = ?";
    sql += " ORDER BY sc.fecpedcl DESC,sc.numpedcl,sl.numlinea;";
    sql = mysql.format(sql, numpedcl);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        // hay que procesar a JSON
        callback(null, fnPedidosFromDbToJson(result));
        conector.closeConnection(connection);
    });
};


// getPedidosAgente
// devuelve todos los pedidos del agente pasado

module.exports.getPedidosAgente = function(codagent, callback) {
    var sql = "SELECT"
    sql += " sc.numpedcl AS numpedcl,";
    sql += " sc.codclien AS codclien,";
    sql += " cl.codactiv AS codactiv,";
    sql += " cl.codtarif AS codtarif,";
    sql += " sc.codagent AS codagent,";
    sql += " sc.codtraba AS codtraba,";
    sql += " sc.codforpa AS codforpa,";
    sql += " cl.nomclien AS nomclien,";
    sql += " cl.domclien AS domclien,";
    sql += " cl.codpobla AS codpobla,";
    sql += " cl.pobclien AS pobclien,";
    sql += " cl.proclien AS proclien,";
    sql += " cl.nifclien AS nifclien,";
    sql += " sc.codagent AS codagent,";
    sql += " ag.nomagent AS nomagent,";
    sql += " sc.fecpedcl AS fecpedcl,";
    sql += " sc.fecentre AS fecentre,";
    sql += " sl2.total AS totalped,";
    sql += " sl.numlinea AS numlinea,";
    sql += " sl.codartic AS codartic,";
    sql += " sl.nomartic AS nomartic,";
    sql += " sl.precioar AS precioar,";
    sql += " sl.cantidad AS cantidad,";
    sql += " sl.servidas AS servidas,";
    sql += " sl.dtoline1 AS dtoline1,";
    sql += " sl.dtoline2 AS dtoline2,";
    sql += " sl.importel AS importel";
    sql += " FROM scaped AS sc";
    sql += " LEFT JOIN sclien as cl ON cl.codclien = sc.codclien";
    sql += " LEFT JOIN sagent as ag ON ag.codagent = sc.codagent";
    sql += " LEFT JOIN sliped AS sl ON sl.numpedcl = sc.numpedcl";
    sql += " LEFT JOIN (SELECT numpedcl, SUM(importel) AS total";
    sql += " FROM sliped";
    sql += " GROUP BY numpedcl) AS sl2 ON sl2.numpedcl = sc.numpedcl";
    if (codagent) {
        sql += " WHERE sc.codagent = ?";
    }
    sql += " ORDER BY sc.fecpedcl DESC,sc.numpedcl,sl.numlinea;";
    sql = mysql.format(sql, codagent);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        // hay que procesar a JSON
        callback(null, fnPedidosFromDbToJson(result));
        conector.closeConnection(connection);
    });
};


// getPedidos
// devuelve todos los pedidos de la base de datos
module.exports.getPedidos = function(callback) {
    var sql = "SELECT"
    sql += " sc.numpedcl AS numpedcl,";
    sql += " sc.codclien AS codclien,";
    sql += " cl.codactiv AS codactiv,";
    sql += " cl.codtarif AS codtarif,";
    sql += " sc.codagent AS codagent,";
    sql += " sc.codtraba AS codtraba,";
    sql += " sc.codforpa AS codforpa,";
    sql += " cl.nomclien AS nomclien,";
    sql += " cl.domclien AS domclien,";
    sql += " cl.codpobla AS codpobla,";
    sql += " cl.pobclien AS pobclien,";
    sql += " cl.proclien AS proclien,";
    sql += " cl.nifclien AS nifclien,";
    sql += " sc.codagent AS codagent,";
    sql += " ag.nomagent AS nomagent,";
    sql += " sc.fecpedcl AS fecpedcl,";
    sql += " sc.fecentre AS fecentre,";
    sql += " sl2.total AS totalped,";
    sql += " sl.numlinea AS numlinea,";
    sql += " sl.codartic AS codartic,";
    sql += " sl.nomartic AS nomartic,";
    sql += " sl.precioar AS precioar,";
    sql += " sl.cantidad AS cantidad,";
    sql += " sl.servidas AS servidas,";
    sql += " sl.dtoline1 AS dtoline1,";
    sql += " sl.dtoline2 AS dtoline2,";
    sql += " sl.importel AS importel";
    sql += " FROM scaped AS sc";
    sql += " LEFT JOIN sclien as cl ON cl.codclien = sc.codclien";
    sql += " LEFT JOIN sagent as ag ON ag.codagent = sc.codagent";
    sql += " LEFT JOIN sliped AS sl ON sl.numpedcl = sc.numpedcl";
    sql += " LEFT JOIN (SELECT numpedcl, SUM(importel) AS total";
    sql += " FROM sliped";
    sql += " GROUP BY numpedcl) AS sl2 ON sl2.numpedcl = sc.numpedcl";
    sql += " ORDER BY sc.fecpedcl DESC,sc.numpedcl,sl.numlinea;";
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        // hay que procesar a JSON
        callback(null, fnPedidosFromDbToJson(result));
        conector.closeConnection(connection);
    });
};

module.exports.getPedidosCliente = function(codclien, callback) {
    var pedidos = [];
    var sql = "SELECT"
    sql += " sc.numpedcl AS numpedcl,";
    sql += " sc.codclien AS codclien,";
    sql += " cl.codactiv AS codactiv,";
    sql += " cl.codtarif AS codtarif,";
    sql += " sc.codagent AS codagent,";
    sql += " sc.codtraba AS codtraba,";
    sql += " sc.codforpa AS codforpa,";
    sql += " sc.fecpedcl AS fecpedcl,";
    sql += " cl.codclien AS codclien,";
    sql += " cl.nomclien AS nomclien,";
    sql += " cl.domclien AS domclien,";
    sql += " cl.codpobla AS codpobla,";
    sql += " cl.pobclien AS pobclien,";
    sql += " cl.proclien AS proclien,";
    sql += " cl.nifclien AS nifclien,";
    sql += " sc.fecentre AS fecentre,";
    sql += " sl2.total AS totalped,";
    sql += " sl.numlinea AS numlinea,";
    sql += " sl.codartic AS codartic,";
    sql += " sl.nomartic AS nomartic,";
    sql += " sl.precioar AS precioar,";
    sql += " sl.cantidad AS cantidad,";
    sql += " sl.servidas AS servidas,";
    sql += " sl.dtoline1 AS dtoline1,";
    sql += " sl.dtoline2 AS dtoline2,";
    sql += " sl.importel AS importel";
    sql += " FROM scaped AS sc";
    sql += " LEFT JOIN sclien as cl ON cl.codclien = sc.codclien";
    sql += " LEFT JOIN sliped AS sl ON sl.numpedcl = sc.numpedcl";
    sql += " LEFT JOIN (SELECT numpedcl, SUM(importel) AS total";
    sql += " FROM sliped";
    sql += " GROUP BY numpedcl) AS sl2 ON sl2.numpedcl = sc.numpedcl";
    sql += " WHERE sc.codclien = ?";
    sql += " ORDER BY sc.fecpedcl DESC,sc.numpedcl,sl.numlinea;";
    sql = mysql.format(sql, codclien);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        // hay que procesar a JSON
        callback(null, fnPedidosFromDbToJson(result));
        conector.closeConnection(connection);
    });
};

var fnPedidosFromDbToJson = function(pedidos) {
    var pdJs = [];
    var cabJs = null;
    var linJs = null;
    var numpedAnt = 0;
    for (var i = 0; i < pedidos.length; i++) {
        var pedido = pedidos[i];
        if (numpedAnt != pedido.numpedcl) {
            // es una pedido nueva
            // si ya habiamos procesado una la pasamos al vector
            if (cabJs) {
                pdJs.push(cabJs);
            }
            cabJs = {
                numpedcl: pedido.numpedcl,
                fecpedcl: pedido.fecpedcl,
                fecentre: pedido.fecentre,
                totalped: pedido.totalped,
                codclien: pedido.codclien,
                nomclien: pedido.nomclien,
                domclien: pedido.domclien,
                codpobla: pedido.codpobla,
                pobclien: pedido.pobclien,
                proclien: pedido.proclien,
                nifclien: pedido.nifclien,
                nomagent: pedido.nomagent,
                codagent: pedido.codagent,
                codtraba: pedido.codtraba,
                codforpa: pedido.codforpa,
                codtarif: pedido.codtarif,
                codactiv: pedido.codactiv,
                lineas: []
            };
            numpedAnt = pedido.numpedcl;
        }
        // siempre se procesa una linea
        if (pedido.numlinea) {
            linJs = {
                numlinea: pedido.numlinea,
                codartic: pedido.codartic,
                nomartic: pedido.nomartic,
                precioar: pedido.precioar,
                cantidad: pedido.cantidad,
                servidas: pedido.servidas,
                dtoline1: pedido.dtoline1,
                dtoline2: pedido.dtoline2,
                importel: pedido.importel
            };
            cabJs.lineas.push(linJs);
        }
    }
    if (cabJs) {
        pdJs.push(cabJs);
    }
    return pdJs;
};

// postCabPedido
// crea una cabecera de pedido
module.exports.postCabPedido = function(pedido, callback) {
    getNextNumpedcl(function(err, res) {
        if (err) {
            callback(err);
            return;
        }
        pedido.numpedcl = res;
        var sql = "INSERT INTO scaped SET ?";
        sql = mysql.format(sql, pedido);
        var connection = conector.getConnectionAriges();
        connection.query(sql, function(err, result) {
            conector.closeConnection(connection);
            if (err) {
                return callback(err, null);
            }
            callback(null, pedido);
        });
    });
};

// putCabPedido
// modifica la cabecera de pedido
module.exports.putCabPedido = function(pedido, callback) {
    var sql = "UPDATE scaped SET ? WHERE numpedcl = ?";
    sql = mysql.format(sql, [pedido, pedido.numpedcl]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        callback(null, pedido);
        conector.closeConnection(connection);
    });
}

// deleteCabPedido
// modifica la cabecera de pedido
module.exports.deleteCabPedido = function(numpedcl, callback) {
    deleteLineasPed(numpedcl, function(err, res) {
        if (err) {
            callback(err);
            return;
        }
        var sql = "DELETE FROM scaped WHERE numpedcl = ?";
        sql = mysql.format(sql, numpedcl);
        var connection = conector.getConnectionAriges();
        connection.query(sql, function(err, result) {
            if (err) {
                callback(err, null);
                conector.closeConnection(connection);
                return;
            }
            callback(null, numpedcl);
            conector.closeConnection(connection);
        });
    });
}

// ---------------------------------------------------------------------
// postLinPedido
// crea una linea de pedido
module.exports.postLinPedido = function(linPedido, callback) {
    getNextNumlinea(linPedido.numpedcl, function(err, res) {
        if (err) {
            callback(err);
            return;
        }
        linPedido.numlinea = res;
        var sql = "INSERT INTO sliped SET ?";
        sql = mysql.format(sql, linPedido);
        var connection = conector.getConnectionAriges();
        connection.query(sql, function(err, result) {
            if (err) {
                callback(err, null);
                conector.closeConnection(connection);
                return;
            }
            callback(null, linPedido);
            conector.closeConnection(connection);
        });
    });
};

// putLinPedido
// modifica la linea de pedido
module.exports.putLinPedido = function(linPedido, callback) {
    var sql = "UPDATE sliped SET ? WHERE numpedcl = ? AND numlinea = ?";
    sql = mysql.format(sql, [linPedido, linPedido.numpedcl, linPedido.numlinea]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        callback(null, linPedido);
        conector.closeConnection(connection);
    });
}

// deleteLinPedido
// elimina la línea de pedido
module.exports.deleteLinPedido = function(numpedcl, numlinea, callback) {
    var sql = "DELETE FROM sliped WHERE numpedcl = ? AND numlinea = ?";
    sql = mysql.format(sql, [numpedcl, numlinea]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        callback(null, null);
        conector.closeConnection(connection);
    });
}


// getNextNumpedcl
// obtiene el siguiente número de pedido según el orden dado
var getNextNumpedcl = function(callback) {
    var sql = "SELECT MAX(contador) + 1 AS nxt FROM stipom WHERE codtipom = 'PEV'";
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        var nxt = result[0].nxt;
        if (!nxt) {
            nxt = 1;
        }
        sql = "UPDATE stipom SET contador = ? WHERE codtipom = 'PEV'";
        sql = mysql.format(sql, nxt);
        connection.query(sql, function(err, result) {
            if (err) {
                callback(err, null);
                conector.closeConnection(connection);
                return;
            }
            callback(null, nxt);
            conector.closeConnection(connection);
        });
    });
};

var getNextNumlinea = function(numpedcl, callback) {
    var sql = "SELECT MAX(numlinea) + 1 AS nxt FROM sliped WHERE numpedcl=?";
    sql = mysql.format(sql, numpedcl);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        var nxt = result[0].nxt;
        if (!nxt) nxt = 1;
        callback(null, nxt);
        conector.closeConnection(connection);
    });
};

// deleteLineasPed
// elimina las líneas de un pedido
var deleteLineasPed = function(numpedcl, callback) {
    var sql = "DELETE FROM sliped WHERE numpedcl = ?";
    sql = mysql.format(sql, numpedcl);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
            conector.closeConnection(connection);
            return;
        }
        callback(null, null);
        conector.closeConnection(connection);
    });
}
