'use strict';
angular
	.module('softvApp')
	.controller('ModalConsultaQuejaCtrl', function($uibModalInstance, $uibModal, $rootScope, ngNotify, $localStorage, $state, id) {

		function initialData() {
			vm.Clv_Queja = id;
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
