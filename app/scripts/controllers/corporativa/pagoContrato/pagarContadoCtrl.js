'use strict';
angular.module('softvApp').controller('PagarContadoCtrl', PagarContadoCtrl);

function PagarContadoCtrl($uibModal, $state, $rootScope, ngNotify, inMenu, $uibModalInstance, items, metodo, x, elem1, $localStorage, pagosMaestrosFactory) {
	function initialData() {
		vm.monto = elem1;
		pagosMaestrosFactory.getMedios().then(function (data) {
			data.GetObtieneMediosPagoListResult.unshift({
				'Nombre': '----------------',
				'IdMedioPago': 0
			});
			vm.medios = data.GetObtieneMediosPagoListResult;
			vm.selectedMedio = data.GetObtieneMediosPagoListResult[0];
		});
	}

	function ok() {
		if (vm.selectedMedio.IdMedioPago == 0) {
			ngNotify.set('Seleccione el medio de pago', 'error');
		} else {
			var objPagar = {
				"Clv_FacturaMaestro": x.Clv_FacturaMaestro,
				"ContratoMaestro": x.ContratoMaestro,
				"Cajera": $localStorage.currentUser.usuario,
				"IpMaquina": $localStorage.currentUser.maquina,
				"Sucursal": $localStorage.currentUser.sucursal,
				"Monto": vm.monto,
				"IdMedioPago": vm.selectedMedio.IdMedioPago,
				"IdCompania": x.IdCompania,
				"IdDistribuidor": x.IdDistribuidor
			};
			var objact = {
				"ClvFacturaMaestro": x.Clv_FacturaMaestro,
				"Credito": metodo,
				"NoPago": 0,
				"PagoInicial": 0
			};
			console.log(objPagar);
			pagosMaestrosFactory.actFactura(objact).then(function(dataGraba) {
				console.log(dataGraba.AddActualizaFacturaMaestroResult);
				pagosMaestrosFactory.pagoGrabaFactura(objPagar).then(function (data) {
					vm.res = data.GetGuardaPagoFacturaMaestroResult;
					console.log(vm.res);
					if (vm.res[0].Clv_Pago < 1) {
						ngNotify.set('No se grabo la factura', 'error');
					}else {
						$uibModalInstance.dismiss('cancel');
						ngNotify.set('Pago grabado correctamente', 'success');
						$rootScope.$emit('realoadBrowse', {});
					}
				});
			});
		}
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	var vm = this;
	vm.cancel = cancel;
	vm.ok = ok;
	initialData();
}