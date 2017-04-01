'use strict';
angular
	.module('softvApp')
	.controller('OrdenServicioClienteCtrl', function($uibModal, $uibModalInstance) {
		var vm = this;
        vm.cancel = cancel;

        function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	});
