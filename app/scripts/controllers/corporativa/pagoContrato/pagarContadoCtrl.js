'use strict';
angular.module('softvApp').controller('PagarContadoCtrl', PagarContadoCtrl);

function PagarContadoCtrl($uibModal, $state, $rootScope, cajasFactory, ngNotify, inMenu, $uibModalInstance) {

    function cancel() {
	    $uibModalInstance.dismiss('cancel');
	}

    var vm = this;
    vm.cancel = cancel;
}
