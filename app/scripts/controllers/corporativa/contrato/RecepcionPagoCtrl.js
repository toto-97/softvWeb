'use strict';

function RecepcionPagoCtrl($uibModal, $rootScope, corporativoFactory, $filter, ngNotify, $state, ContratoMaestroFactory, pagosMaestrosFactory) {
    this.$onInit = function () {
        ContratoMaestroFactory.GetMuestraFacturasMaestroList().then(function (data) {
            console.log(data);
            vm.pagos = data.GetMuestraFacturasMaestroListResult;

        });
    }

    function saldadas() {
        var parametros;
        if (vm.pendientes == 1) {
            ContratoMaestroFactory.GetMuestraFacturasMaestroList().then(function (data) {
                vm.pagos = data.GetMuestraFacturasMaestroListResult;
            });
            vm.pagar = false;
        }
        else if (vm.pendientes == 2) {
            parametros = {
                'Fecha': '',
                'Ticket': '',
                'ContratoMaestro': 0,
                'Cliente': '',
                'Op': 5,
                'Saldada': 1
            };
            ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
                vm.pagos = data.GetBuscaFacturasMaestroListResult;
            });
            vm.pagar = true;
        }
        else if (vm.pendientes == 3) {
            parametros = {
                'Fecha': '',
                'Ticket': '',
                'ContratoMaestro': 0,
                'Cliente': '',
                'Op': 5,
                'Saldada': 0
            };
            ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
                vm.pagos = data.GetBuscaFacturasMaestroListResult;
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
                    'Saldada': 1
                };
                ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroListResult;
                });
            }
        } else if (opcion == 3) {
            if (vm.ContratoMaestro == undefined || vm.ContratoMaestro == '') {
                ngNotify.set('Seleccione un contrato.', 'error');
            } else {
                parametros = {
                    'Fecha': '',
                    'Ticket': '',
                    'ContratoMaestro': (vm.ContratoMaestro == null) ? 0 : vm.ContratoMaestro,
                    'Cliente': '',
                    'Op': opcion,
                    'Saldada': 0
                };
                ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
                    vm.pagos = data.GetBuscaFacturasMaestroListResult;
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
                    'Saldada': 0
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
                    'Fecha': vm.auxFechaInicio,
                    'Ticket': '',
                    'ContratoMaestro': 0,
                    'Cliente': '',
                    'Op': opcion,
                    'Saldada': 0
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

    $rootScope.$on('realoadBrowse', function () {
        reloadTables();
    });

    function buscarFecha(opcion) {
        if (fechaBusqueda == undefined || fechaBusqueda == '') {
            ngNotify.set('Seleccione una fecha.', 'error');
        } else {
            vm.seleccion = 2;
            vm.auxFechaInicio = $filter('date')(fechaBusqueda, 'dd/MM/yyyy');
            desgloseFactory.busquedaDesglose(vm.seleccion, $localStorage.currentUser.usuario, vm.auxFechaInicio).then(function (data) {
                if (data.GetBuscaDesgloseDeMonedaListResult.length == 0) {
                    ngNotify.set('No se encontraron registros.', 'error');
                    vm.sinDatos = true;
                    vm.desglose = '';
                    vm.showPaginator = false;
                } else {
                    vm.sinDatos = false;
                    vm.desglose = data.GetBuscaDesgloseDeMonedaListResult;
                    vm.showPaginator = true;
                }
            });
        }
    }

    function reloadTables() {
        ContratoMaestroFactory.GetMuestraFacturasMaestroList().then(function (data) {
            vm.pagos = data.GetMuestraFacturasMaestroListResult;
        });
    }

    function PagarCredito(x) {
        if (x.Status == "Activa") {
            if (x.Importe <= x.TotalAbonado) {
                ngNotify.set('Ya se saldo el adeudo.', 'error');
            } else {
                if (x.ACuantosPagos == 'N/A') {
                    var items = {
                        Modo: 'n'
                    };
                    vm.animationsEnabled = true;
                    var modalInstance = $uibModal.open({
                        animation: vm.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'views/corporativa/abrirPago.html',
                        controller: 'AbrirPagoCtrl',
                        controllerAs: '$ctrl',
                        backdrop: 'static',
                        keyboard: false,
                        size: 'sm',
                        resolve: {
                            items: function () {
                                return items;
                            },
                            elem1: function () {
                                return x.Importe;
                            },
                            x: function () {
                                return x;
                            }
                        }
                    });
                }
                else if (x.ACuantosPagos == 'Variables') {
                    var monto = (x.Importe - x.PagoInicial) / x.ACuantosPagos;
                    var restante = (x.Importe - x.TotalAbonado);
                    if (restante < monto) {
                        monto = restante;
                    }
                    var items = {
                        Modo: 'v'
                    };
                    vm.animationsEnabled = true;
                    var modalInstance = $uibModal.open({
                        animation: vm.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'views/corporativa/montoAbono.html',
                        controller: 'MontoAbonoCtrl',
                        controllerAs: '$ctrl',
                        backdrop: 'static',
                        keyboard: false,
                        size: 'sm',
                        resolve: {
                            items: function () {
                                return items;
                            },
                            elem1: function () {
                                return monto;
                            },
                            x: function () {
                                return x;
                            }
                        }
                    });
                } else {
                    var monto = (x.Importe - x.PagoInicial) / x.ACuantosPagos;
                    var restante = (x.Importe - x.TotalAbonado);
                    if (restante < monto) {
                        monto = restante;
                    }
                    var items = {
                        Modo: 'f'
                    };
                    vm.animationsEnabled = true;
                    var modalInstance = $uibModal.open({
                        animation: vm.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'views/corporativa/montoAbono.html',
                        controller: 'MontoAbonoCtrl',
                        controllerAs: '$ctrl',
                        backdrop: 'static',
                        keyboard: false,
                        size: 'sm',
                        resolve: {
                            items: function () {
                                return items;
                            },
                            elem1: function () {
                                return monto;
                            },
                            x: function () {
                                return x;
                            }
                        }
                    });
                }
            }
        } else {
            ngNotify.set('La factura ya ha sido cancelada.', 'error');
        }
    }

    function historial(x) {
        console.log(x.Clv_FacturaMaestro);
        pagosMaestrosFactory.obtenFacturas(x.Clv_FacturaMaestro).then(function (data) {
            vm.historialPagos = data.GetObtieneHistorialPagosFacturaMaestroListResult;
            console.log(vm.historialPagos);
        });
    }

    function verFactura(clvPago) {
        console.log(clvPago);
        pagosMaestrosFactory.verFacturas(clvPago).then(function (data) {
            vm.facturas = data.GetFacturasPorCliDePagoResult;
            console.log(vm.facturas);
        });
    }

    function detalle(x) {
        vm.animationsEnabled = true;
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/corporativa/detalle.html',
            controller: 'DetalleCtrl',
            controllerAs: '$ctrl',
            backdrop: 'static',
            keyboard: false,
            size: 'md',
            resolve: {
                x: function () {
                    return x;
                }
            }
        });
    }

    var vm = this;
    vm.saldadas = saldadas;
    vm.buscaContrato = buscaContrato;
    vm.PagarCredito = PagarCredito;
    vm.historial = historial;
    vm.verFactura = verFactura;
    vm.detalle = detalle;
}
angular.module('softvApp').controller('RecepcionPagoCtrl', RecepcionPagoCtrl);
