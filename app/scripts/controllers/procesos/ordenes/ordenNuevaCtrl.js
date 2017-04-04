'use strict';
angular.module('softvApp').controller('OrdenNuevaCtrl', OrdenNuevaCtrl);

function OrdenNuevaCtrl($state, ngNotify, $stateParams, $uibModal, ordenesFactory, $rootScope) {
	var vm = this;
	vm.showDatosCliente = true;
	vm.agregar = agregar;
	vm.buscarContrato = buscarContrato;
	vm.buscarCliente = buscarCliente;
	vm.status = 'P';


	function agregar() {
		if (vm.contrato == undefined || vm.contrato == '') {
			ngNotify.set('Sin contrato asignado.', 'error')
		} else {
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
				size: 'md',
				resolve: {
					cont: function () {
						return vm.contrato;
					}
				}
			});
		}
	}

	function buscarContrato(event) {
		// if (contrato == 0 || contrato == undefined) {
		// 	ngNotify.set('Inserta un número de contrato', 'error');
		// }else {
		if (event.keyCode == 13) {
			if (vm.contrato == null || vm.contrato == '' || vm.contrato == undefined) {
				ngNotify.set('Coloque un contrato válido', 'error');
				return;
			}

			ordenesFactory.getContratoReal(vm.contrato).then(function (data) {
				if (data.GetuspBuscaContratoSeparado2ListResult.length > 0) {
					datosContrato(data.GetuspBuscaContratoSeparado2ListResult[0].ContratoBueno);
				}
			});;
		}
	}

	$rootScope.$on('cliente_select', function (e, contrato) {
		vm.contrato = contrato.CONTRATO;
		datosContrato(contrato.ContratoBueno);
	});

	function datosContrato(contrato) {
		ordenesFactory.serviciosCliente(contrato).then(function (data) {
			vm.servicios = data.GetDameSerDelCliFacListResult;
		});
		ordenesFactory.buscarCliPorContrato(contrato).then(function (data) {
			vm.datosCli = data.GetDeepBUSCLIPORCONTRATO_OrdSerResult;
		});
	}

	function buscarCliente() {
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/procesos/buscarCliente.html',
			controller: 'BuscarNuevoCtrl',
			controllerAs: '$ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'lg'
		});
	}
}
