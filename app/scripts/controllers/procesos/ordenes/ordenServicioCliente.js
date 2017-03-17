'use strict';
angular
	.module('softvApp')
	.controller('OrdenServicioClienteCtrl', function($uibModal, $uibModalInstance, ordenesFactory, cont) {
		var vm = this;
    	vm.cancel = cancel;
		vm.abrir = abrir;
		init();
		vm.changeTrabajo = changeTrabajo;

		function init() {
			ordenesFactory.dimeServicio(cont).then(function(data) {
					vm.dimeServ = data.GetDime_Que_servicio_Tiene_clienteListResult;
					console.log(vm.dimeServ);
			});
		}

		function changeTrabajo() {
			ordenesFactory.muestraTrabajo(vm.selectedServicio.clv_tipser).then(function(data) {
					vm.tipoTrabajo = data.GetMUESTRATRABAJOSPorTipoUsuarioListResult;
					console.log(vm.tipoTrabajo);
			});
		}

		function abrir(valor) {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/modalOrdenTrabajos.html',
				controller: 'ModalOrdenCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'md',
				resolve: {
					valor: function() {
						return valor;
					}
				}
			});
		}

        function cancel() {
			$uibModalInstance.dismiss('cancel');
		}
	});
