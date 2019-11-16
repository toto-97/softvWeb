'use strict';
angular.module('softvApp').controller('FacturasCtrl', FacturasCtrl);

function FacturasCtrl($uibModal, ngNotify, inMenu, $uibModalInstance, clvPago, pagosMaestrosFactory) {
	
	/// Busca las facturas
	function initial() {
		pagosMaestrosFactory.verFacturas(clvPago).then(function (data) {
			vm.facturas = data.GetFacturasPorCliDePagoResult;
		});
	}
	
	/// Cancela y cierra la ventana
	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	var vm = this;
	vm.cancel = cancel;
	initial();
}