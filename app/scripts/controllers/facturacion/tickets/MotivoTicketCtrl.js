'use strict';
angular.module('softvApp')
	.controller('MotivoTicketCtrl', function($uibModalInstance, ticketsFactory, $rootScope, ngNotify, item) {
		function initialData() {
			ticketsFactory.getMotivo(item.op).then(function(data) {
				vm.motivos = data.GetMUESTRAMOTIVOSListResult;
				vm.selectedMotivo = vm.motivos[0];
			});
		}

		function ok() {
			ticketsFactory.guardaMotivo(item.clv_Factura, vm.selectedMotivo.Clv_Motivo).then(function(data) {
				console.log(data);
				$uibModalInstance.dismiss('cancel');
			});
		}

		var vm = this;
		vm.ok = ok;
		initialData();
	});
