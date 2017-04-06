'use strict';
angular.module('softvApp').controller('MontoAbonoCtrl', MontoAbonoCtrl);

function MontoAbonoCtrl($uibModal, inMenu, $uibModalInstance, items, $localStorage, elem1, x, pagosMaestrosFactory, ngNotify) {
    function init() {
        vm.factura = x.Clv_FacturaMaestro;
        vm.monto = (x.Importe - x.PagoInicial) / x.ACuantosPagos;
        if(elem1.PagoInicial < vm.monto) {
            vm.monto = elem1.PagoInicial
        }
        if (items.Modo == 'f') {
            vm.minimo = true;
        }
    }

    function abonoTotal() {
        var pagar = x.Importe - x.TotalAbonado;
        if (vm.abono > pagar) {
            vm.abono = pagar;
        }
    }
    function ok() {
        if (vm.abono == undefined || vm.abono == null || vm.abono == 0 || vm.abono < 0) {
            ngNotify.set('Inserte el abono', 'error');
        } else if (items.Modo == 'v') {
            $uibModalInstance.dismiss('cancel');
            pagosMaestrosFactory.cobraSaldoMaestro(x.ContratoMaestro).then(function (data) {
                vm.saldo = data.GetDeepCobraSaldoContratoMaestroResult;
                var elem = {
                    PagoInicial: vm.abono,
                    Clv_FacturaMaestro: elem1.Clv_FacturaMaestro
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
        } else if (items.Modo == 'f') {
            pagosMaestrosFactory.cobraSaldoMaestro(x.ContratoMaestro).then(function (data) {
                vm.saldo = data.GetDeepCobraSaldoContratoMaestroResult;
                if (vm.abono < vm.monto) {
                    ngNotify.set('El abono no debe ser menor a la mensualidad.', 'error');
                }else {
                    $uibModalInstance.dismiss('cancel');
                    var elem = {
                        PagoInicial: vm.abono,
                        Clv_FacturaMaestro: elem1.Clv_FacturaMaestro
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
                }
            });
        }
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

    var vm = this;
    vm.ok = ok;
    vm.abonoTotal = abonoTotal;
    vm.cancel = cancel;
    init();
    console.log(items);
}