'use strict';
angular
	.module('softvApp')
	.controller('AtencionNuevaCtrl', function($uibModal, atencionFactory) {
		function initialData() {
			atencionFactory.serviciosNuevo().then(function(data) {
				vm.servicios = data.GetMuestraTipSerPrincipal2ListResult;
				vm.selectedServicio = vm.servicios[0];
			});
		}

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

		function buscaContrato() {
			var parametros = {
				contrato: vm.contrato,
				nombre: '',
				paterno: '',
				materno: '',
				calle: '',
				numero: '',
				colonia: 0,
				setupbox: '',
				usuario: 0,
				servicio: vm.selectedServicio.Clv_TipSerPrincipal,
				op: 0
			};
			//mandar llamar servicio buscarCliente
		}

		var vm = this;
		initialData();
		vm.abrirPagos = abrirPagos;
		vm.abrirReportes = abrirReportes;
		vm.tipoAtencion = 'telefonica';
		vm.buscaContrato = buscaContrato;
		vm.showDatosCliente = true;
		//$('.datosCliente').collapse(); desplegar hasta que se busque un cliente

	});
