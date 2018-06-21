'use strict';
angular
	.module('softvApp')
	.controller('ModalDetalleContratoCtrl', function($uibModalInstance, $uibModal, ContratoMaestroFactory, $rootScope, ngNotify, contrato, corporativoFactory) {
		this.$onInit = function() {
			vm.contrato = contrato;
			corporativoFactory.singleContrato(vm.contrato.IdContratoMaestro).then(function(data) {
				vm.contrato = data.GetRelContratosResult[0];
			});
			
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
	});
