'use strict';

function RecepcionPagoCtrl($uibModal, $rootScope, corporativoFactory, $filter, ngNotify, $state, ContratoMaestroFactory, pagosMaestrosFactory) {
    this.$onInit = function () {
        ContratoMaestroFactory.GetMuestraFacturasMaestroList().then(function (data) {
            console.log(data);
            vm.pagos = data.GetMuestraFacturasMaestroListResult;

        });
    }

    function buscaContrato(opcion) {
        var parametros;
        if (opcion == 2) {
            parametros = {
                'Fecha': '',
                'Ticket': vm.Ticket,
                'ContratoMaestro': 0,
                'Cliente': '',
                'Op': opcion
            };
        } else if (opcion == 3) {
            parametros = {
                'Fecha': '',
                'Ticket': '',
                'ContratoMaestro': (vm.ContratoMaestro == null) ? 0 : vm.ContratoMaestro,
                'Cliente': '',
                'Op': opcion
            };
        } else {
            parametros = {
                'Fecha': '',
                'Ticket': '',
                'ContratoMaestro': 0,
                'Cliente': vm.Cliente,
                'Op': opcion
            };
        }
        ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
            vm.pagos = data.GetBuscaFacturasMaestroListResult;

        });
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
            console.log(x);
            if (x.ACuantosPagos == "Variables") {
                pagosMaestrosFactory.cobraSaldoMaestro(x.ContratoMaestro).then(function (data) {
                    vm.saldo = data.GetDeepCobraSaldoContratoMaestroResult;
                    var monto = (x.Importe - x.PagoInicial) / x.ACuantosPagos;
                    var items = {
                        Contrato: x.ContratoMaestro,
                        Compania: x.IdCompania,
                        Distribuidor: x.IdDistribuidor,
                        Session: vm.saldo.ClvSession
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
                });
            } else {
                pagosMaestrosFactory.cobraSaldoMaestro(x.ContratoMaestro).then(function (data) {
                    vm.saldo = data.GetDeepCobraSaldoContratoMaestroResult;
                    var monto = (x.Importe - x.PagoInicial) / x.ACuantosPagos;
                    var restante = (x.Importe - x.TotalAbonado);
                    if(restante < monto) {
                        monto = restante;
                    }
                    var items = {
                        Contrato: x.ContratoMaestro,
                        Compania: x.IdCompania,
                        Distribuidor: x.IdDistribuidor,
                        Session: vm.saldo.ClvSession
                    };
                    var elem = {
                        PagoInicial: monto,
                        Clv_FacturaMaestro: x.Clv_FacturaMaestro
                    };
                    vm.animationsEnabled = true;
                    var modalInstance = $uibModal.open({
                        animation: vm.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'views/corporativa/pagarCredito.html',
                        controller: 'PagarCreditoCtrl',
                        controllerAs: '$ctrl',
                        backdrop: 'static',
                        keyboard: false,
                        size: 'md',
                        resolve: {
                            items: function () {
                                return items;
                            },
                            elem: function () {
                                return elem;
                            }
                        }
                    });
                });
            }
        }
    }

    var vm = this;
    vm.buscaContrato = buscaContrato;
    vm.PagarCredito = PagarCredito;
}
angular.module('softvApp').controller('RecepcionPagoCtrl', RecepcionPagoCtrl);
