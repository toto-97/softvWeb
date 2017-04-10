'use strict';
angular
	.module('softvApp')
	.controller('ModalBonificacionCtrl', function($uibModalInstance, $uibModal, $rootScope, ngNotify, $localStorage, $state) {

		function initialData() {

		}

		function ok() {

		}

		function Eliminar() {
			$uibModalInstance.dismiss('cancel');
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}



		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		vm.Eliminar = Eliminar;
		initialData();
	});
