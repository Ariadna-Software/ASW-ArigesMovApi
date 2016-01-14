var mysql = require('mysql');
var conector = require('../comun/conector_mysql');
var async = require('async');
var ofertasMysql = require('../ofertas/ofertas_mysql');
var pedidosMysql = require('../pedidos/pedidos_mysql');
var albaranesMysql = require('../albaranes/albaranes_mysql');
var cobrosMysql = require('../cobros/cobros_mysql');

module.exports.getIndicadores = function(codclien, codmacta, callback) {
    // como son llamadas diversas hay que hacer espera asíncrona
    async.parallel([
        function(callback2) {
            // obtener el número de ofertas
            ofertasMysql.getOfertasCliente(codclien, function(err, result) {
                if (err) {
                    callback2(err);
                    return;
                }
                var numOfertas = 0
                if (result) {
                    numOfertas = result.length;
                }
                callback2(null, numOfertas);
            });
        },
        function(callback2) {
            // obtener el número de pedidos
            pedidosMysql.getPedidosCliente(codclien, function(err, result) {
                if (err) {
                    callback2(err);
                    return;
                }
                var numPedidos = 0
                if (result) {
                    numPedidos = result.length;
                }
                callback2(null, numPedidos);
            });

        },
        function(callback2) {
            // obtener el número de albaranes
            albaranesMysql.getAlbaranesCliente(codclien, function(err, result) {
                if (err) {
                    callback2(err);
                    return;
                }
                var numAlbaranes = 0
                if (result) {
                    numAlbaranes = result.length;
                }
                callback2(null, numAlbaranes);
            });
        },
        function(callback2) {
            // obtener saldo pendiente y vencido
            cobrosMysql.getCobros(codmacta, function(err, result) {
                if (err) {
                    callback2(err);
                    return;
                }
                var cobro = {
                    saldoPendiente: 0,
                    saldoVencido: 0
                };
                if (result) {
                    for (var i = 0; i < result.length; i++) {
                        var c = result[i];
                        cobro.saldoPendiente += c.total;
                        if (c.fechavenci < new Date()) {
                            cobro.saldoVencido += c.total;
                        }
                    }
                }
                callback2(null, cobro);
            });
        }
    ], function(err, results) {
        if (err) {
            callback(err, null);
            return;
        }
        var indicadores = {
            ofertas: results[0],
            pedidos: results[1],
            albaranes: results[2],
            saldoPendiente: results[3].saldoPendiente,
            saldoVencido: results[3].saldoVencido
        }
        callback(null, indicadores);
    });
};
