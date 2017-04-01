'use strict';
angular.module('softvApp').controller('YaPagoCtrl', YaPagoCtrl);

function YaPagoCtrl($uibModal, inMenu, $uibModalInstance, items, $localStorage) {

    function ok() {
        $uibModalInstance.dismiss('cancel');
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
                items: function() {
                    return items;
                }
            }
        });
    }

    function cancel() {
	    $uibModalInstance.dismiss('cancel');
	}

    var vm = this;
    vm.ok = ok;
	vm.cancel = cancel;
}