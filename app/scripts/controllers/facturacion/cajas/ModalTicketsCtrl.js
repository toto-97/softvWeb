'use strict';
angular
	.module('softvApp')
	.controller('ModalTicketsCtrl', function($uibModal, $uibModalInstance, cajasFactory, contrato) {

		function initialData() {
			cajasFactory.dameHistorialServicios(contrato).then(function(data) {
				console.log(data);
				vm.tickets = data.GetBuscaFacturasHistorialListResult;
			});
		}

		function dameFactura(factura) {
			vm.animationsEnabled = true;
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
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
						return factura;
					}
				}
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.dameFactura = dameFactura;
		initialData();

	});
