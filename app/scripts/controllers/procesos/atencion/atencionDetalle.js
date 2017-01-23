angular
	.module('softvApp')
	.controller('AtencionDetalleCtrl', function($uibModal) {
		var vm = this;
		vm.abrirPagos = abrirPagos;
		vm.abrirReportes = abrirReportes;
		$('.datosCliente').collapse();


		function abrirPagos() {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/historialPagos.html',
				controller: 'HistorialPagosCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: "lg",
				// resolve: {
				//     factura: function () {
				//         return factura;
				//     }
				// }
			});
		}

		function abrirReportes() {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/historialReportes.html',
				controller: 'HistorialReportesCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: "lg",
				// resolve: {
				//     factura: function () {
				//         return factura;
				//     }
				// }
			});
		}

	});
