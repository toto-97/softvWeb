'use strict';
angular
	.module('softvApp')
	.controller('ModalDetalleContratoCtrl', function($uibModalInstance, $uibModal, ContratoMaestroFactory, $rootScope, ngNotify, contrato) {

		function initialData() {
			vm.contrato = contrato;
			console.log(contrato);
		}

		function ok() {

		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		initialData();
	});
