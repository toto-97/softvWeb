'use strict';
angular.module('softvApp').controller('ReporteRecepcionCtrl', ReporteRecepcionCtrl);

function ReporteRecepcionCtrl($uibModal, ngNotify, inMenu, pagosMaestrosFactory) {

    function saldadas() {
        var parametros;
        if (vm.pendientes == 1) {
            parametros = {
                'Fecha': '',
                'Ticket': '',
                'ContratoMaestro': 0,
                'Cliente': '',
                'Op': 5,
                'Saldada2': 1,
                'IdMedioPago': 0,
                'ContratoCompania': 0
            };
            console.log(parametros);
            pagosMaestrosFactory.buscarPagos(parametros).then(function (data) {
                vm.pagos = data.GetBuscaFacturasMaestroConsultaListResult;
                console.log(vm.pagos);
            });
            vm.pagar = true;
        } else if (vm.pendientes == 2) {
            parametros = {
                'Fecha': '',
                'Ticket': '',
                'ContratoMaestro': 0,
                'Cliente': '',
                'Op': 5,
                'Saldada2': 0,
                'IdMedioPago': 0,
                'ContratoCompania': 0
            };
            console.log(parametros);
            pagosMaestrosFactory.buscarPagos(parametros).then(function (data) {
                vm.pagos = data.GetBuscaFacturasMaestroConsultaListResult;
                console.log(vm.pagos);
            });
            vm.pagar = false;
        }
    }

	function buscaContrato(opcion) {
        var parametros;
        if (opcion == 2) {
            if (vm.Ticket == undefined || vm.Ticket == '') {
                ngNotify.set('Seleccione un ticket.', 'error');
            } else {
                parametros = {
                    'Fecha': '',
                    'Ticket': vm.Ticket,
                    'ContratoMaestro': 0,
                    'Cliente': '',
                    'Op': opcion,
                    'Saldada2': 0,
                    'IdMedioPago': 0,
                    'ContratoCompania': 0
                };
                console.log(parametros);
                pagosMaestrosFactory.buscarPagos(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroConsultaListResult;
                    console.log(vm.pagos);
                });
            }
        } else if (opcion == 3) {
            if (vm.ContratoMaestro == undefined || vm.ContratoMaestro == '') {
                ngNotify.set('Seleccione un contrato.', 'error');
            } else {
                parametros = {
                    'Fecha': '',
                    'Ticket': '',
                    'ContratoMaestro': vm.ContratoMaestro,
                    'Cliente': '',
                    'Op': opcion,
                    'Saldada2': 0,
                    'IdMedioPago': 0,
                    'ContratoCompania': 0
                };
                console.log(parametros);
                pagosMaestrosFactory.buscarPagos(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroConsultaListResult;
                    console.log(vm.pagos);
                });
            }
        } else if (opcion == 4) {
            if (vm.Cliente == undefined || vm.Cliente == '') {
                ngNotify.set('Seleccione un cliente.', 'error');
            } else {
                parametros = {
                    'Fecha': '',
                    'Ticket': '',
                    'ContratoMaestro': 0,
                    'Cliente': vm.Cliente,
                    'Op': opcion,
                    'Saldada2': 0,
                    'IdMedioPago': 0,
                    'ContratoCompania': 0
                };
                console.log(parametros);
                pagosMaestrosFactory.buscarPagos(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroConsultaListResult;
                    console.log(vm.pagos);
                });
            }
        } else if (opcion == 1) {
             if (vm.Fecha == undefined || vm.Fecha == '') {
                ngNotify.set('Seleccione una fecha de facturación.', 'error');
            } else {
                vm.auxFechaInicio = $filter('date')(vm.Fecha, 'dd/MM/yyyy');
                parametros = {
                    'Fecha': vm.auxFechaInicio,
                    'Ticket': '',
                    'ContratoMaestro': 0,
                    'Cliente': '',
                    'Op': opcion,
                    'Saldada2': 0,
                    'IdMedioPago': 0,
                    'ContratoCompania': 0
                };
                console.log(parametros);
                pagosMaestrosFactory.buscarPagos(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroConsultaListResult;
                    console.log(vm.pagos);
                });
            }
        } else if (opcion == 6) {
             if (vm.FechaPago == undefined || vm.Fecha == '') {
                ngNotify.set('Seleccione una fecha de pago.', 'error');
            } else {
                vm.auxFechaPago = $filter('date')(vm.FechaPago, 'dd/MM/yyyy');
                parametros = {
                    'Fecha': vm.auxFechaPago,
                    'Ticket': '',
                    'ContratoMaestro': 0,
                    'Cliente': '',
                    'Op': opcion,
                    'Saldada2': 0,
                    'IdMedioPago': 0,
                    'ContratoCompania': 0
                };
                console.log(parametros);
                pagosMaestrosFactory.buscarPagos(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroConsultaListResult;
                    console.log(vm.pagos);
                });
            }
        } else if (opcion == 7) {
             if (vm.ContratoCliente == undefined || vm.Fecha == '') {
                ngNotify.set('Seleccione un contrato de cliente.', 'error');
            } else {
                parametros = {
                    'Fecha': '',
                    'Ticket': '',
                    'ContratoMaestro': 15,
                    'Cliente': '',
                    'Op': opcion,
                    'Saldada2': 0,
                    'IdMedioPago': 0,
                    'ContratoCompania': vm.ContratoCliente
                };
                console.log(parametros);
                pagosMaestrosFactory.buscarPagos(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroConsultaListResult;
                    console.log(vm.pagos);
                });
            }
        }
        vm.Ticket = '';
        vm.ContratoMaestro = '';
        vm.Cliente = '';
        $('.buscarContrato').collapse('hide');
	}
    
    
    var vm = this;
    vm.buscaContrato = buscaContrato;
    vm.saldadas = saldadas;

}