'use strict';
angular.module('softvApp').controller('HistorialCtrl', HistorialCtrl);

function HistorialCtrl($uibModal, ngNotify, inMenu, $uibModalInstance, x, pagosMaestrosFactory) {
	
	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	var vm = this;
	vm.cancel = cancel;
}