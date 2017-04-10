'use strict';
angular.module('softvApp').controller('OrdenNuevaCtrl', OrdenNuevaCtrl);

function OrdenNuevaCtrl($state, ngNotify, $stateParams, $uibModal, ordenesFactory, $rootScope) {
	var vm = this;
	vm.showDatosCliente = true;
	vm.agregar = agregar;
	vm.buscarContrato = buscarContrato;
	vm.buscarCliente = buscarCliente;
	vm.status = 'P';
	vm.fecha = new Date();


	function agregar() {
		if (vm.contratoBueno == undefined || vm.contratoBueno == '') {
			ngNotify.set('Seleccione un cliente válido.', 'error')
		} else {
			vm.animationsEnabled = true;
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/ModalAgregarServicio.html',
				controller: 'ModalAgregarServicioCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'md',
				resolve: {
					cont: function () {
						return vm.contratoBueno;
					}
				}
			});
		}
	}

	function buscarContrato(event) {
		if (event.keyCode == 13) {
			if (vm.contrato == null || vm.contrato == '' || vm.contrato == undefined) {
				ngNotify.set('Coloque un contrato válido', 'error');
				return;
			}

			ordenesFactory.getContratoReal(vm.contrato).then(function (data) {
				if (data.GetuspBuscaContratoSeparado2ListResult.length > 0) {
					vm.contratoBueno = data.GetuspBuscaContratoSeparado2ListResult[0].ContratoBueno;
					datosContrato(data.GetuspBuscaContratoSeparado2ListResult[0].ContratoBueno);
				}else{
					vm.servicios = '';
					vm.datosCli = '';
					new PNotify({
						title: 'Sin Resultados',
						type: 'error',
						text: 'No se encontro resultados con ese contrato.',
						hide: true
					});
					vm.contratoBueno = '';
				}
			});;
		}
	}

	$rootScope.$on('cliente_select', function (e, contrato) {
		vm.contrato = contrato.CONTRATO;
		vm.contratoBueno = contrato.ContratoBueno;
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
