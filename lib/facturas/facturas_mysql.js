var mysql = require('mysql');
var conector = require('../comun/conector_mysql');

module.exports.getFacturasCliente = function(codclien, callback) {
    var facturas = [];
    var sql = "SELECT";
    sql += " f.codtipom AS codtipom,";
    sql += " f.numfactu AS numfactu,";
    sql += " f.fecfactu AS fecfactu,";
    sql += " st.letraser AS letraser,";
    sql += " (COALESCE(f.baseimp1,0) + COALESCE(f.baseimp2,0) + COALESCE(f.baseimp3,0)) AS bases,";
    sql += " (COALESCE(f.imporiv1,0) + COALESCE(f.imporiv2,0) + COALESCE(f.imporiv3,0)";
    sql += " + COALESCE(f.imporiv1re,0) + COALESCE(f.imporiv2re,0) + COALESCE(f.imporiv3re,0)) AS cuotas,";
    sql += " f.totalfac AS totalfac,";
    sql += " lf.codtipoa AS codtipoa,";
    sql += " lf.numalbar AS numalbar,"
    sql += " lf.numlinea AS numlinea,";
    sql += " lf.codartic AS codartic,";
    sql += " lf.nomartic AS nomartic,";
    sql += " lf.precioar AS precioar,";
    sql += " lf.cantidad AS cantidad,";
    sql += " lf.dtoline1 AS dtoline1,";
    sql += " lf.dtoline2 AS dtoline2,";
    sql += " lf.importel AS importel";
    sql += " FROM scafac AS f";
    sql += " LEFT JOIN slifac AS lf ON (lf.codtipom = f.codtipom AND lf.numfactu = f.numfactu AND lf.fecfactu = f.fecfactu)";
    sql += " LEFT JOIN stipom AS st ON st.codtipom = f.codtipom"
    sql += " WHERE f.codclien = ?";
    sql += " ORDER BY f.fecfactu DESC, f.codtipom, f.numfactu, lf.codtipoa, lf.numalbar, lf.numlinea;";
    sql = mysql.format(sql, codclien);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        // hay que procesar a JSON
        return callback(null, fnFacturasFromDbToJson(result));
    });
};

module.exports.getFacturasClienteComentarios = function(codclien, callback) {
    var facturas = [];
    var sql = "SELECT";
    sql += " f.codtipom AS codtipom,";
    sql += " f.numfactu AS numfactu,";
    sql += " f.fecfactu AS fecfactu,";
    sql += " st.letraser AS letraser,";
    sql += " (COALESCE(f.baseimp1,0) + COALESCE(f.baseimp2,0) + COALESCE(f.baseimp3,0)) AS bases,";
    sql += " (COALESCE(f.imporiv1,0) + COALESCE(f.imporiv2,0) + COALESCE(f.imporiv3,0)";
    sql += " + COALESCE(f.imporiv1re,0) + COALESCE(f.imporiv2re,0) + COALESCE(f.imporiv3re,0)) AS cuotas,";
    sql += " f.totalfac AS totalfac,";
    sql += " lf.codtipoa AS codtipoa,";
    sql += " lf.numalbar AS numalbar,"
    sql += " lf.numlinea AS numlinea,";
    sql += " lf.codartic AS codartic,";
    sql += " lf.nomartic AS nomartic,";
    sql += " lf.precioar AS precioar,";
    sql += " lf.cantidad AS cantidad,";
    sql += " lf.dtoline1 AS dtoline1,";
    sql += " lf.dtoline2 AS dtoline2,";
    sql += " lf.importel AS importel,";
    sql += " CONCAT(COALESCE(f1.observa1, ' '),' ',COALESCE(f1.observa2, ' '),' ',COALESCE(f1.observa3, ' '),' ',COALESCE(f1.observa4, ' '),' ',COALESCE(f1.observa5, ' ')) AS observa "
    sql += " FROM scafac AS f";
    sql += " LEFT JOIN stipom AS st ON st.codtipom = f.codtipom";
    sql += " LEFT JOIN scafac1 AS f1 ON (f1.numfactu = f.numfactu AND f1.fecfactu = f1.fecfactu AND f1.codtipom = f.codtipom)";
    sql += " LEFT JOIN slifac AS lf ON (lf.codtipom = f.codtipom AND lf.numfactu = f.numfactu AND lf.fecfactu = f.fecfactu AND lf.numalbar = f1.numalbar AND lf.codtipoa = f1.codtipoa)";
    sql += " WHERE f.codclien = ?";
    sql += " ORDER BY f.fecfactu DESC, f.codtipom, f.numfactu, lf.codtipoa, lf.numalbar, lf.numlinea;";
    sql = mysql.format(sql, codclien);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        // hay que procesar a JSON
        return callback(null, fnFacturasComentariosFromDbToJson(result));
    });
};

module.exports.getFacturaNumserie = function(numserie, codfaccl, fecfaccl, callback) {
    var facturas = [];
    var sql = "SELECT";
    sql += " f.codtipom AS codtipom,";
    sql += " f.numfactu AS numfactu,";
    sql += " f.fecfactu AS fecfactu,";
    sql += " st.letraser AS letraser,";
    sql += " (COALESCE(f.baseimp1,0) + COALESCE(f.baseimp2,0) + COALESCE(f.baseimp3,0)) AS bases,";
    sql += " (COALESCE(f.imporiv1,0) + COALESCE(f.imporiv2,0) + COALESCE(f.imporiv3,0)";
    sql += " + COALESCE(f.imporiv1re,0) + COALESCE(f.imporiv2re,0) + COALESCE(f.imporiv3re,0)) AS cuotas,";
    sql += " f.totalfac AS totalfac,";
    sql += " lf.codtipoa AS codtipoa,";
    sql += " lf.numalbar AS numalbar,"
    sql += " lf.numlinea AS numlinea,";
    sql += " lf.codartic AS codartic,";
    sql += " lf.nomartic AS nomartic,";
    sql += " lf.precioar AS precioar,";
    sql += " lf.cantidad AS cantidad,";
    sql += " lf.dtoline1 AS dtoline1,";
    sql += " lf.dtoline2 AS dtoline2,";
    sql += " lf.importel AS importel";
    sql += " FROM scafac AS f";
    sql += " LEFT JOIN slifac AS lf ON (lf.codtipom = f.codtipom AND lf.numfactu = f.numfactu AND lf.fecfactu = f.fecfactu)";
    sql += " LEFT JOIN stipom AS st ON st.codtipom = f.codtipom"
    sql += " WHERE f.codtipom IN (SELECT codtipom FROM stipom WHERE letraser = ?)";
    sql += " AND f.numfactu = ?";
    sql += " AND f.fecfactu = ?";
    sql = mysql.format(sql, [numserie, codfaccl, fecfaccl]);
    var connection = conector.getConnectionAriges();
    connection.query(sql, function(err, result) {
        conector.closeConnection(connection);
        if (err) {
            return callback(err, null);
        }
        // hay que procesar a JSON
        return callback(null, fnFacturasFromDbToJson(result));
    });
};

var fnFacturasFromDbToJson = function(facturas) {
    var fcJs = [];
    var cabJs = null;
    var linJs = null;
    var numfacAnt = 0;
    var tipomAnt = 0;
    for (var i = 0; i < facturas.length; i++) {
        var factura = facturas[i];
        if (numfacAnt != factura.numfactu || tipomAnt != factura.codtipom) {
            // es una factura nueva
            // si ya habiamos procesado una la pasamos al vector
            if (cabJs) {
                fcJs.push(cabJs);
            }
            cabJs = {
                codtipom: factura.codtipom,
                numfactu: factura.numfactu,
                fecfactu: factura.fecfactu,
                bases: factura.bases,
                cuotas: factura.cuotas,
                totalfac: factura.totalfac,
                letraser: factura.letraser,
                lineas: []
            };
            numfacAnt = factura.numfactu;
            tipomAnt = factura.codtipom;
        }
        // siempre se procesa una linea
        if (factura.numlinea) {
            linJs = {
                codtipoa: factura.codtipoa,
                numalbar: factura.numalbar,
                numlinea: factura.numlinea,
                codartic: factura.codartic,
                nomartic: factura.nomartic,
                precioar: factura.precioar,
                cantidad: factura.cantidad,
                dtoline1: factura.dtoline1,
                dtoline2: factura.dtoline2,
                importel: factura.importel
            };
            cabJs.lineas.push(linJs);
        }
    }
    if (cabJs) {
        fcJs.push(cabJs);
    }
    return fcJs;
}

var fnFacturasComentariosFromDbToJson = function(facturas) {
    var fcJs = [];
    var cabJs = null;
    var linJs = null;
    var numfacAnt = 0;
    var tipomAnt = 0;
    for (var i = 0; i < facturas.length; i++) {
        var factura = facturas[i];
        if (numfacAnt != factura.numfactu || tipomAnt != factura.codtipom) {
            // es una factura nueva
            // si ya habiamos procesado una la pasamos al vector
            if (cabJs) {
                fcJs.push(cabJs);
            }
            cabJs = {
                codtipom: factura.codtipom,
                numfactu: factura.numfactu,
                fecfactu: factura.fecfactu,
                bases: factura.bases,
                cuotas: factura.cuotas,
                totalfac: factura.totalfac,
                letraser: factura.letraser,
                lineas: []
            };
            numfacAnt = factura.numfactu;
            tipomAnt = factura.codtipom;
        }
        // siempre se procesa una linea
        if (factura.numlinea) {
            linJs = {
                codtipoa: factura.codtipoa,
                numalbar: factura.numalbar,
                numlinea: factura.numlinea,
                codartic: factura.codartic,
                nomartic: factura.nomartic,
                precioar: factura.precioar,
                cantidad: factura.cantidad,
                dtoline1: factura.dtoline1,
                dtoline2: factura.dtoline2,
                importel: factura.importel,
                observa: factura.observa
            };
            cabJs.lineas.push(linJs);
        }
    }
    if (cabJs) {
        fcJs.push(cabJs);
    }
    return fcJs;
}
