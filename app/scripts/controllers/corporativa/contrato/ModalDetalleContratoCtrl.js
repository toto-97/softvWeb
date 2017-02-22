'use strict';
angular
	.module('softvApp')
	.controller('ModalDetalleContratoCtrl', function($uibModalInstance, $uibModal, ContratoMaestroFactory, $rootScope, ngNotify) {

		function initialData() {
			ContratoMaestroFactory.GetContratoList().then(function(data) {
				console.log(data);
			});
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
