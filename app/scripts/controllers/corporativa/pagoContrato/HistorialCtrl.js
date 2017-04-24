'use strict';
angular.module('softvApp').controller('HistorialCtrl', HistorialCtrl);

function HistorialCtrl($uibModal, ngNotify, inMenu, $uibModalInstance, x, pagosMaestrosFactory) {
	function initial() {
		pagosMaestrosFactory.obtenFacturas(x.Clv_FacturaMaestro).then(function (data) {
			vm.facturas = data.GetObtieneHistorialPagosFacturaMaestroListResult;
		});
	}
	
	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	var vm = this;
	vm.cancel = cancel;
	vm.ticket = x.Ticket;
	initial();
}