'use strict';
angular.module('softvApp').controller('YaPagoCtrl', YaPagoCtrl);

function YaPagoCtrl($uibModal, inMenu, $uibModalInstance, $localStorage) {

    function ok() {
        
    }

    function cancel() {
	    $uibModalInstance.dismiss('cancel');
	}

    var vm = this;
    vm.ok = ok;
	vm.cancel = cancel;
}