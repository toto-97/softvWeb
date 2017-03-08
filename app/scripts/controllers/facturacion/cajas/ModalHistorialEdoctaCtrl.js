'use strict';
angular
	.module('softvApp')
	.controller('modalHistorialEdoctaCtrl', function($uibModal, $uibModalInstance, contrato, cajasFactory) {
		function init() {

		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function ok() {

		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		init();

	});
