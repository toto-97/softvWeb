'use strict';
angular
	.module('softvApp')
	.controller('OrdenNuevaCtrl', function($state, ngNotify, $stateParams, $uibModal) {
		var vm = this;
		vm.showDatosCliente = true;
		vm.agregar = agregar;

		if ($stateParams.context == 'consultar') {
			initalDataConsulta();
		} else if ($stateParams.context == 'ejecutar') {
			initialDataEjecutar();

		} else if ($stateParams.context == 'nuevo') {
			initialDataNuevo();
		}

		function agregar(){
			vm.animationsEnabled = true;
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/OrdenServicioCliente.html',
				controller: 'OrdenServicioClienteCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'md'
			});
		}

		function initialDataNuevo(){
			vm.statu = 1;
			vm.showOrden = false;
			vm.showContrato = false;
			vm.showBitacora = false;
			vm.showStatus = true;
			vm.showInternet = false;
			vm.showHotel = false;
			vm.showTecnico = false;
			vm.showObservaciones = false;
			vm.showSolicitud = false;
			vm.showEjecucion = false;
			vm.showVista1 = false;
			vm.showVista2 = false;
			vm.showEjecReal = false;
			vm.showTurno = false;
			vm.showFecha = false;
			vm.showObservacion2 = false;
			vm.showAgregar = false;
			vm.showQuitar = false;
			vm.showGuardar = true;
		}

		function initalDataConsulta(){
			vm.showOrden = true;
			vm.showContrato = true;
			vm.showBitacora = true;
			vm.showStatus = true;
			vm.showInternet = true;
			vm.showHotel = true;
			vm.showTecnico = true;
			vm.showObservaciones = true;
			vm.showSolicitud = true;
			vm.showEjecucion = true;
			vm.showVista1 = true;
			vm.showVista2 = true;
			vm.showEjecReal = true;
			vm.showTurno = true;
			vm.showFecha = true;
			vm.showObservacion2 = true;
			vm.showAgregar = true;
			vm.showQuitar = true;
			vm.showGuardar = false;
		}

		function initialDataEjecutar(){
			vm.statu = 2;
			vm.showOrden = false;
			vm.showContrato = false;
			vm.showBitacora = false;
			vm.showStatus = false;
			vm.showInternet = false;
			vm.showHotel = false;
			vm.showTecnico = false;
			vm.showObservaciones = false;
			vm.showSolicitud = false;
			vm.showEjecucion = false;
			vm.showVista1 = false;
			vm.showVista2 = false;
			vm.showEjecReal = false;
			vm.showTurno = false;
			vm.showFecha = false;
			vm.showObservacion2 = false;
			vm.showGuardar = true;
		}
	});
