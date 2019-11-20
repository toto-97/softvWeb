'use strict';
angular
.module('softvApp')
.controller('modalNuevoPolizaMaestroCobroCtrl', function($uibModalInstance, $uibModal, corporativoFactory, $rootScope, ngNotify, $filter) {
	
	/// No se usa
	this.$onInit = function() {
	}

	/// Cancela la operacion
	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	/// Genera una poliza
	function Generar() {
		var fechaAux = $filter('date')(vm.Fecha, 'yyyyMMdd');
		var params = {};
		params.filtros = {
			'Op': 0,
			'Clv_Plaza': 0,
			'FechaPoliza': fechaAux,
			'Clv_Poliza': 0,
			'ContratoMaestro': 0,
			'Dolares': vm.Dolares
		};
		corporativoFactory.GetGeneraNuevaPolizaMaestroCobros(params).then(function (data) {
			vm.Poliza = data.GetGeneraNuevaPolizaMaestroCobrosResult;
			ngNotify.set('Póliza generada exitosamente.', 'success');
			$uibModalInstance.close(vm.Poliza);
		});
	}

	var vm = this;
	vm.cancel = cancel;
	vm.Generar = Generar;
	vm.Dolares = false;
});