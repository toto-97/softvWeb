'use strict';
angular.module('softvApp').controller('PagarContadoCtrl', PagarContadoCtrl);

function PagarContadoCtrl($uibModal, $state, $rootScope, ngNotify, inMenu, $uibModalInstance, items, metodo, $localStorage, pagosMaestrosFactory) {
	function initialData() {
		vm.monto = items.Monto;
		pagosMaestrosFactory.getMedios().then(function (data) {
			data.GetObtieneMediosPagoListResult.unshift({
				'Nombre': '----------------',
				'IdMedioPago': 0
			});

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