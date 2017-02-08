'use strict';
angular.module('softvApp')
	.controller('ReimprimirCtrl', function($uibModalInstance, $uibModal, ticketsFactory, $rootScope, ngNotify, item) {
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
				ticketsFactory.addBitacora(item.clv_Factura, item.cliente, 2).then(function(dataBit) {
					$uibModalInstance.dismiss('cancel');
					var modalInstance = $uibModal.open({
						animation: true,
						ariaLabelledBy: 'modal-title',
						ariaDescribedBy: 'modal-body',
						templateUrl: 'views/facturacion/modalSingleTicket.html',
						controller: 'ModalSingleTicketCtrl',
						controllerAs: 'ctrl',
						backdrop: 'static',
						keyboard: false,
						size: 'sm',
						resolve: {
							factura: function() {
								return item.clv_Factura;
							}
						}
					});
				});
			});
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		initialData();
	});
