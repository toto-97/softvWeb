'use strict';
angular.module('softvApp').controller('ReporteRecepcionCtrl', ReporteRecepcionCtrl)
.filter('myStrictFilter', function($filter){
    return function(input, predicate){
        return $filter('filter')(input, predicate, true);
    }
})
.filter('unique', function() {
    return function (arr, field) {
        var o = {}, i, l = arr.length, r = [];
        for(i=0; i<l;i+=1) {
            o[arr[i][field]] = arr[i];
        }
        for(i in o) {
            r.push(o[i]);
        }
        return r;
    };
});

function ReporteRecepcionCtrl($uibModal, ngNotify, inMenu, pagosMaestrosFactory, $timeout) {

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
            vm.displayCollection = [].concat(vm.pagos);

            vm.predicates = ['ContratoMaestro', 'Ticket', 'Cliente', 'Tipo', 'FechaFacturacion', 'FechaVencimiento', 'ImporteFactura', 'PagoInicial', 'ACuantosPagos', 'TotalAbonado', 'pendiente', 'Sucursal', 'Cajera', 'Caja', 'MedioPago', 'ImportePago', 'FechaPago', 'ImporteFacCliente', 'MontoAbono', 'PorPagar', 'Saldada2'];
            vm.selectedPredicate = vm.predicates[0];
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
            vm.displayCollection = [].concat(vm.pagos);

            vm.predicates = ['ContratoMaestro', 'Ticket', 'Cliente', 'Tipo', 'FechaFacturacion', 'FechaVencimiento', 'ImporteFactura', 'PagoInicial', 'ACuantosPagos', 'TotalAbonado', 'pendiente', 'Sucursal', 'Cajera', 'Caja', 'MedioPago', 'ImportePago', 'FechaPago', 'ImporteFacCliente', 'MontoAbono', 'PorPagar', 'Saldada2'];
            vm.selectedPredicate = vm.predicates[0];
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
                vm.displayCollection = [].concat(vm.pagos);

                vm.predicates = ['ContratoMaestro', 'Ticket', 'Cliente', 'Tipo', 'FechaFacturacion', 'FechaVencimiento', 'ImporteFactura', 'PagoInicial', 'ACuantosPagos', 'TotalAbonado', 'pendiente', 'Sucursal', 'Cajera', 'Caja', 'MedioPago', 'ImportePago', 'FechaPago', 'ImporteFacCliente', 'MontoAbono', 'PorPagar', 'Saldada2'];
                vm.selectedPredicate = vm.predicates[0];
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
                vm.displayCollection = [].concat(vm.pagos);

                vm.predicates = ['ContratoMaestro', 'Ticket', 'Cliente', 'Tipo', 'FechaFacturacion', 'FechaVencimiento', 'ImporteFactura', 'PagoInicial', 'ACuantosPagos', 'TotalAbonado', 'pendiente', 'Sucursal', 'Cajera', 'Caja', 'MedioPago', 'ImportePago', 'FechaPago', 'ImporteFacCliente', 'MontoAbono', 'PorPagar', 'Saldada2'];
                vm.selectedPredicate = vm.predicates[0];
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
                vm.displayCollection = [].concat(vm.pagos);

                vm.predicates = ['ContratoMaestro', 'Ticket', 'Cliente', 'Tipo', 'FechaFacturacion', 'FechaVencimiento', 'ImporteFactura', 'PagoInicial', 'ACuantosPagos', 'TotalAbonado', 'pendiente', 'Sucursal', 'Cajera', 'Caja', 'MedioPago', 'ImportePago', 'FechaPago', 'ImporteFacCliente', 'MontoAbono', 'PorPagar', 'Saldada2'];
                vm.selectedPredicate = vm.predicates[0];
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
                vm.displayCollection = [].concat(vm.pagos);

                vm.predicates = ['ContratoMaestro', 'Ticket', 'Cliente', 'Tipo', 'FechaFacturacion', 'FechaVencimiento', 'ImporteFactura', 'PagoInicial', 'ACuantosPagos', 'TotalAbonado', 'pendiente', 'Sucursal', 'Cajera', 'Caja', 'MedioPago', 'ImportePago', 'FechaPago', 'ImporteFacCliente', 'MontoAbono', 'PorPagar', 'Saldada2'];
                vm.selectedPredicate = vm.predicates[0];
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
                vm.displayCollection = [].concat(vm.pagos);

                vm.predicates = ['ContratoMaestro', 'Ticket', 'Cliente', 'Tipo', 'FechaFacturacion', 'FechaVencimiento', 'ImporteFactura', 'PagoInicial', 'ACuantosPagos', 'TotalAbonado', 'pendiente', 'Sucursal', 'Cajera', 'Caja', 'MedioPago', 'ImportePago', 'FechaPago', 'ImporteFacCliente', 'MontoAbono', 'PorPagar', 'Saldada2'];
                vm.selectedPredicate = vm.predicates[0];
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
                vm.displayCollection = [].concat(vm.pagos);

                vm.predicates = ['ContratoMaestro', 'Ticket', 'Cliente', 'Tipo', 'FechaFacturacion', 'FechaVencimiento', 'ImporteFactura', 'PagoInicial', 'ACuantosPagos', 'TotalAbonado', 'pendiente', 'Sucursal', 'Cajera', 'Caja', 'MedioPago', 'ImportePago', 'FechaPago', 'ImporteFacCliente', 'MontoAbono', 'PorPagar', 'Saldada2'];
                vm.selectedPredicate = vm.predicates[0];
            }
        }
        vm.Ticket = '';
        vm.ContratoMaestro = '';
        vm.Cliente = '';
        $('.buscarContrato').collapse('hide');
	}
    
    function crearTodoAsCsv() {
      $timeout(function() {
        for (var i = 0; i < vm.pagos.length; i++) 
            { 
                delete vm.pagos[i].BaseIdUser;
                delete vm.pagos[i].BaseRemoteIp;
                delete vm.pagos[i].$$hashKey;
            } 

            initArray();
       
          for (var i = 0; i < vm.pagos.length; i++) 
            {   
                vm.arrayReporte.push(vm.pagos[i]);   
            } 
        
        angular.element('#csvDos').triggerHandler('click'); 
      });
    }

    function initArray (){
        vm.arrayReporte = []; 
        vm.arrayReporte =     [{
            'ContratoMaestro': 'Contrato Maestro',
            'Ticket': 'Ticket',
            'Cliente': 'Cliente',
            'Tipo': 'Tipo',
            'FechaFacturacion': 'Fecha de Facturacion',
            'FechaVencimiento': 'Fecha de Vencimiento',
            'ImporteFactura': 'Importe de la Factura',
            'PagoInicial': 'Pago Inicial',
            'ACuantosPagos': 'Pagos',
            'TotalAbonado': 'Total Abonado',
            'pendiente': 'pendiente',
            'Sucursal': 'Sucursal', 
            'Cajera': 'Cajera',
            'Caja': 'Caja',
            'MedioPago': 'Medio de Pago',
            'ImportePago': 'Importe de Pago',
            'FechaPago': 'Fecha de Pago',
            'ImporteFacCliente': 'Importe de Facactura Cliente',
            'MontoAbono': 'Monto Abono',
            'PorPagar': 'Por Pagar',
            'Saldada2': 'Saldada2' 
        }];
    }

    var vm = this;
    vm.buscaContrato = buscaContrato;
    vm.saldadas = saldadas;
    vm.crearTodoAsCsv = crearTodoAsCsv;
    vm.filename = 'Reporte_de_pagos';
    vm.csvDosHide = true;
}