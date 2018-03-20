'use strict';
angular
.module('softvApp')
.controller('modalNuevoPolizaMaestroCtrl', function($uibModalInstance, $uibModal, corporativoFactory, $rootScope, ngNotify, plazas, $filter) {
	this.$onInit = function() {
		vm.Distribuidores = plazas;
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	function Generar() {
		var fechaAux = $filter('date')(vm.Fecha, 'yyyyMMdd');
		var params = {};
		params.filtros = {
			'Op': 0,
			'Clv_Plaza': 0,
			'FechaPoliza': fechaAux,
			'Clv_Poliza': 0,
			'Dolares': vm.Dolares
		};
		corporativoFactory.GetGeneraNuevaPolizaMaestro(params).then(function (data) {
			vm.Poliza = data.GetGeneraNuevaPolizaMaestroResult;
			ngNotify.set('Póliza generada exitosamente.', 'success');
			$uibModalInstance.close(vm.Poliza);
		});
	}

	function CambiaDolares(){
	    if (vm.DolaresCheck === true){
	      vm.Dolares = 1;
	    }
	    else if (vm.DolaresCheck === false){
	      vm.Dolares=0;
	    }
	  }

	var vm = this;
	vm.cancel = cancel;
	vm.Generar = Generar;
	vm.CambiaDolares = CambiaDolares;
	vm.Dolares = 0;
});