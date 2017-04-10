'use strict';

function RecepcionPagoCtrl($uibModal, $rootScope, corporativoFactory, $filter, ngNotify, $state, ContratoMaestroFactory, pagosMaestrosFactory) {
    this.$onInit = function () {
        ContratoMaestroFactory.GetMuestraFacturasMaestroList().then(function (data) {
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
            parametros = {
                'Fecha': '',
                'Ticket': vm.Ticket,
                'ContratoMaestro': 0,
                'Cliente': '',
                'Op': opcion,
                'Saldada': 1
            };
        } else if (opcion == 3) {
            parametros = {
                'Fecha': '',
                'Ticket': '',
                'ContratoMaestro': (vm.ContratoMaestro == null) ? 0 : vm.ContratoMaestro,
                'Cliente': '',
                'Op': opcion,
                'Saldada': 0
            };
        } else if (opcion == 4) {
            parametros = {
                'Fecha': '',
                'Ticket': '',
                'ContratoMaestro': 0,
                'Cliente': vm.Cliente,
                'Op': opcion,
                'Saldada': 0
            };
        }
        ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
            vm.pagos = data.GetBuscaFacturasMaestroListResult;

        });
        vm.Ticket = '';
        vm.ContratoMaestro = '';
        vm.Cliente = '';
        $('.buscarContrato').collapse('hide');
    }

    $rootScope.$on('realoadBrowse', function () {
        reloadTables();
    });

    function reloadTables() {
        ContratoMaestroFactory.GetMuestraFacturasMaestroList().then(function (data) {
            vm.pagos = data.GetMuestraFacturasMaestroListResult;
        });
    }

    function PagarCredito(x) {
        if (x.Importe <= x.TotalAbonado) {
            ngNotify.set('Ya se saldo el adeudo.', 'error');
        } else {
            if (x.ACuantosPagos == "Variables") {
                var monto = (x.Importe - x.PagoInicial) / x.ACuantosPagos;
                var items = {
                    Contrato: x.ContratoMaestro,
                    Compania: x.IdCompania,
                    Distribuidor: x.IdDistribuidor,
                    Modo: 'v'
                };
                var elem1 = {
                    PagoInicial: monto,
                    Clv_FacturaMaestro: x.Clv_FacturaMaestro
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
                            return elem1;
                        },
                        x: function () {
                            return x;
                        }
                    }
                });
            } else {
                var monto = (x.Importe - x.PagoInicial) / x.ACuantosPagos;
                var restante = (x.Importe - x.TotalAbonado);
                if(restante < monto) {
                    monto = restante;
                }
                var items = {
                    Contrato: x.ContratoMaestro,
                    Compania: x.IdCompania,
                    Distribuidor: x.IdDistribuidor,
                    Modo: 'f'
                };
                var elem1 = {
                    PagoInicial: monto,
                    Clv_FacturaMaestro: x.Clv_FacturaMaestro
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
                            return elem1;
                        },
                        x: function () {
                            return x;
                        }
                    }
                });
            }
        }
    }

    var vm = this;
    vm.saldadas = saldadas;
    vm.buscaContrato = buscaContrato;
    vm.PagarCredito = PagarCredito;
}
angular.module('softvApp').controller('RecepcionPagoCtrl', RecepcionPagoCtrl);
