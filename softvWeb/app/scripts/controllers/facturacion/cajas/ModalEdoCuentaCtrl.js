'use strict';
angular
	.module('softvApp')
	.controller('ModalEdoCuentaCtrl', function($uibModalInstance, cajasFactory, contrato) {

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
	});
