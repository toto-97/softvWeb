'use strict';
angular.module('softvApp').controller('EscogerPagoCtrl', EscogerPagoCtrl);

function EscogerPagoCtrl($uibModal, $state, $rootScope, cajasFactory, ngNotify, inMenu, $uibModalInstance) {

    function aceptar(pago) {
		if (pago == undefined) {
			ngNotify.set('Seleccione tipo de pago', 'error');
		}else{
			$uibModalInstance.dismiss('cancel');
			vm.animationsEnabled = true;
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/corporativa/pagarCredito.html',
				controller: 'PagarCreditoCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'md',
				resolve: {
					pago: function() {
						return pago;
					}
				}
			});
		}
    }

    function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

    var vm = this;
    vm.aceptar = aceptar;
    vm.cancel = cancel;
}
