'use strict';
angular.module('softvApp').controller('PagarCreditoCtrl', PagarCreditoCtrl);

function PagarCreditoCtrl($uibModal, $state, $rootScope, ngNotify, inMenu, $uibModalInstance, items, $localStorage, pagosMaestrosFactory) {
	function initialData() {
		vm.monto = elem.PagoInicial;
		pagosMaestrosFactory.getMedios().then(function (data) {
			data.GetObtieneMediosPagoListResult.unshift({
				'Nombre': '----------------',
				'IdMedioPago': 0
			});
			vm.bancos = data.GetMuestraBancosListResult;
			vm.selectedBancoTransferencia = data.GetMuestraBancosListResult[0];
			vm.selectedBancoCheque = data.GetMuestraBancosListResult[0];
		});
	}

	function ok() {
		
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	var vm = this;
	vm.cancel = cancel;
	vm.ok = ok;
	initialData();
}