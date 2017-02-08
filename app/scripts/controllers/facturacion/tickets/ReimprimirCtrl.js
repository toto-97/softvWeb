'use strict';
angular.module('softvApp')
	.controller('ReimprimirCtrl', function($uibModalInstance, ticketsFactory, $rootScope, ngNotify, item) {
		function initialData() {
			ticketsFactory.getMotivo(1).then(function(data) {
				vm.motivos = data.GetMUESTRAMOTIVOSListResult;
				vm.selectedMotivo = vm.motivos[0];
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function ok() {
			ticketsFactory.guardaMotivo(item.clv_Factura, vm.selectedMotivo.Clv_Motivo).then(function(data) {
				//NOTE: trabjando aqui, no funciona el servicio de bitacora
				ticketsFactory.addBitacora(item.clv_Factura, item.cliente, 2).then(function(dataBit) {
					$uibModalInstance.dismiss('cancel');
				});
			});
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		initialData();
	});
