'use strict';
angular.module('softvApp').controller('ModalAgregarServicioCtrl', ModalAgregarServicioCtrl);

function ModalAgregarServicioCtrl($uibModal, $uibModalInstance, ordenesFactory, cont) {
	var vm = this;
	vm.cancel = cancel;
	vm.abrir = abrir;
	vm.changeTrabajo = changeTrabajo;
	vm.realizar = true;

	this.$onInit = function () {
		ordenesFactory.dimeServicio(cont).then(function (data) {
			vm.servicios = data.GetDime_Que_servicio_Tiene_clienteListResult;
		});
	}

	function changeTrabajo() {
		ordenesFactory.muestraTrabajo(vm.selectedServicio.clv_tipser).then(function (data) {
			vm.tipoTrabajo = data.GetMUESTRATRABAJOSPorTipoUsuarioListResult;
		});
	}

	function abrir(valor) {
		var items = {
			contrato: cont,
			valor: valor
		};
		if (vm.selectedTrabajo.Clv_Trabajo == 37) {
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
					items: function () {
						return items;
					}
				}
			});
		}
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}
}
