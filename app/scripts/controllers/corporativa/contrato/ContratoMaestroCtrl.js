'use strict';
angular.module('softvApp').controller('ContratoMaestroCtrl', ContratoMaestroCtrl);

function ContratoMaestroCtrl($uibModal) {

	function DetalleContrato() {
		alert('modal');
		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/corporativa/DetalleContrato.html',
			controller: 'ModalDetalleContratoCtrl',
			controllerAs: 'ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'md',

			// resolve: {
			// 	contrato: function() {
			// 		return obj;
			// 	}
			// }
		});
	}

	var vm = this;
	vm.DetalleContrato = DetalleContrato;

}
