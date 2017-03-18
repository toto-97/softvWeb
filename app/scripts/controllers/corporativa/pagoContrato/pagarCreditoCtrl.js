'use strict';
angular.module('softvApp').controller('PagarCreditoCtrl', PagarCreditoCtrl);

function PagarCreditoCtrl($uibModal, $state, $rootScope, cajasFactory, ngNotify, inMenu, $uibModalInstance, pago) {

    function aceptar() {
    }

    function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

    var vm = this;
    vm.aceptar = aceptar;
    vm.cancel = cancel;
}
