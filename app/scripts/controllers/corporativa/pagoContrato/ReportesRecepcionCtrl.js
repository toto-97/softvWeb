'use strict';
angular.module('softvApp').controller('ReportesRecepcionCtrl', ReportesRecepcionCtrl);

function ReportesRecepcionCtrl($uibModal, ngNotify, inMenu, pagosMaestrosFactory) {

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
            pagosMaestrosFactory.buscarPagos(parametros).then(function (data) {
                vm.pagos = data.GetBuscaFacturasMaestroConsultaListResult[0];
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
            pagosMaestrosFactory.buscarPagos(parametros).then(function (data) {
                vm.pagos = data.GetBuscaFacturasMaestroConsultaListResult[0];
                console.log(vm.pagos);
            });
            vm.pagar = false;
        }
    }

	function buscaContrato(opcion) {
        var parametros;
        if (opcion == 2) {
            if (vm.Ticket == undefined || vm.Ticket == '') {
                ngNotify.set('Seleccione una fecha.', 'error');
            } else {
                parametros = {
                    'Fecha': '',
                    'Ticket': '',
                    'ContratoMaestro': 15,
                    'Cliente': '',
                    'Op': 3,
                    'Saldada2': 0,
                    'IdMedioPago': 0,
                    'ContratoCompania': 0
                };
                ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroListResult;
                });
            }
        } else if (opcion == 3) {
            if (vm.ContratoMaestro == undefined || vm.ContratoMaestro == '') {
                ngNotify.set('Seleccione una fecha.', 'error');
            } else {
                parametros = {
                    'Fecha': '',
                    'Ticket': '',
                    'ContratoMaestro': 15,
                    'Cliente': '',
                    'Op': 3,
                    'Saldada2': 0,
                    'IdMedioPago': 0,
                    'ContratoCompania': 0
                };
                ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroListResult;
                });
            }
        } else if (opcion == 4) {
            if (vm.Cliente == undefined || vm.Cliente == '') {
                ngNotify.set('Seleccione una fecha.', 'error');
            } else {
                parametros = {
                    'Fecha': '',
                    'Ticket': '',
                    'ContratoMaestro': 15,
                    'Cliente': '',
                    'Op': 3,
                    'Saldada2': 0,
                    'IdMedioPago': 0,
                    'ContratoCompania': 0
                };
                ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroListResult;
                });
            }
        } else if (opcion == 1) {
             if (vm.Fecha == undefined || vm.Fecha == '') {
                ngNotify.set('Seleccione una fecha.', 'error');
            } else {
                vm.auxFechaInicio = $filter('date')(vm.Fecha, 'dd/MM/yyyy');
                parametros = {
                    'Fecha': '',
                    'Ticket': '',
                    'ContratoMaestro': 15,
                    'Cliente': '',
                    'Op': 3,
                    'Saldada2': 0,
                    'IdMedioPago': 0,
                    'ContratoCompania': 0
                };
                ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroListResult;
                });
            }
        } else if (opcion == 6) {
             if (vm.Fecha == undefined || vm.Fecha == '') {
                ngNotify.set('Seleccione una fecha.', 'error');
            } else {
                vm.auxFechaInicio = $filter('date')(vm.Fecha, 'dd/MM/yyyy');
                parametros = {
                    'Fecha': '',
                    'Ticket': '',
                    'ContratoMaestro': 15,
                    'Cliente': '',
                    'Op': 3,
                    'Saldada2': 0,
                    'IdMedioPago': 0,
                    'ContratoCompania': 0
                };
                ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroListResult;
                });
            }
        } else if (opcion == 7) {
             if (vm.Fecha == undefined || vm.Fecha == '') {
                ngNotify.set('Seleccione una fecha.', 'error');
            } else {
                vm.auxFechaInicio = $filter('date')(vm.Fecha, 'dd/MM/yyyy');
                parametros = {
                    'Fecha': '',
                    'Ticket': '',
                    'ContratoMaestro': 15,
                    'Cliente': '',
                    'Op': 3,
                    'Saldada2': 0,
                    'IdMedioPago': 0,
                    'ContratoCompania': 0
                };
                ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroListResult;
                });
            }
        }
        // ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
        //     vm.pagos = data.GetBuscaFacturasMaestroListResult;

        // });
        vm.Ticket = '';
        vm.ContratoMaestro = '';
        vm.Cliente = '';
        $('.buscarContrato').collapse('hide');
    }
    
    
    var vm = this;
    vm.buscaContrato = buscaContrato;
    vm.saldadas = saldadas;

}