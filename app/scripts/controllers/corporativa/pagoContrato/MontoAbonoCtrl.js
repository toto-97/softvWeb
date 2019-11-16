'use strict';
angular.module('softvApp').controller('MontoAbonoCtrl', MontoAbonoCtrl);

function MontoAbonoCtrl($uibModal, inMenu, $uibModalInstance, items, $localStorage, elem1, x, pagosMaestrosFactory, ngNotify) {
    
    /// Calcula la desuda de la factura
    function init() {
        vm.monto = (x.Importe - x.PagoInicial) / x.ACuantosPagos;
        if(elem1 < vm.monto) {
            vm.monto = elem1
        }
        if (items.Modo == 'f') {
            vm.minimo = true;
        }
    }

    /// Calcula el abono
    function abonoTotal() {
    
        var pagar =parseFloat(x.Importe - x.TotalAbonado).toFixed(4);
        var monto =parseFloat(vm.monto).toFixed(4);    
        if (vm.minimo !== true) {
            if (vm.abono > pagar) {
                vm.abono = parseFloat(pagar);
            }
        } else {
            if (vm.abono > monto) {
                vm.abono = parseFloat(monto) ;
            }
        }
    }
    
    /// Realiza el abono 
    function ok() {
      
        if (vm.abono === undefined || vm.abono === null || vm.abono === 0 || vm.abono < 0) {
            ngNotify.set('Capture el abono para continuar', 'error');
        } else if (items.Modo == 'v') {
            $uibModalInstance.dismiss('cancel');
            var elem = {
                PagoInicial: vm.abono,
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
                    x: function () {
                        return x;
                    },
                    elem: function () {
                        return elem;
                    }
                }
            });
        } else if (items.Modo == 'f') {
                if (vm.abono < vm.monto) {
                    ngNotify.set('El abono no debe ser menor a la mensualidad.', 'error');
                }else {
                $uibModalInstance.dismiss('cancel');
                var elem = {
                    PagoInicial: vm.abono,
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
                        x: function () {
                            return x;
                        },
                        elem: function () {
                            return elem;
                        }
                    }
                });
            }
        }
    }

    /// Cancela la operacion
    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }

    var vm = this;
    vm.ok = ok;
    vm.abonoTotal = abonoTotal;
    vm.cancel = cancel;
    vm.factura = x.Ticket;
    init();
}