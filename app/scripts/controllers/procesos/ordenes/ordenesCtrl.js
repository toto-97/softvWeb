'use strict';
angular
	.module('softvApp')
	.controller('OrdenesServicioCtrl', function($state, ngNotify) {
		var vm = this;
		vm.showdatosPlaza = false;
		vm.nuevaOrden = nuevaOrden;

		function nuevaOrden() {
			console.log('jala');
			$state.go('home.procesos.ordenNueva');
		}
	});
