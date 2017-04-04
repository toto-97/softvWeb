'use strict';
angular.module('softvApp').controller('MontoAbonoCtrl', MontoAbonoCtrl);

function MontoAbonoCtrl($uibModal, inMenu, $uibModalInstance, items, $localStorage, elem1, x, pagosMaestrosFactory, ngNotify) {

    function abonoTotal() {
        var pagar = x.Importe - x.TotalAbonado;
        if(vm.abono > pagar) {
            vm.abono = pagar;
        }
    }
    function ok() {
        if (vm.abono == undefined || vm.abono == null || vm.abono == 0 || vm.abono < 0) {
        ngNotify.set('Inserte el abono', 'error');
        }else {
            $uibModalInstance.dismiss('cancel');
            pagosMaestrosFactory.cobraSaldoMaestro(x.ContratoMaestro).then(function (data) {
                vm.saldo = data.GetDeepCobraSaldoContratoMaestroResult;
                var monto = (x.Importe - x.PagoInicial) / x.ACuantosPagos;
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
                        items: function() {
                            return items;
                        },
                        elem: function() {
                            return elem;
                        }
                    }
                });
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
    console.log(x);
}