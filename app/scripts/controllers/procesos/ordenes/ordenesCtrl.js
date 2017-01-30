'use strict';
angular
	.module('softvApp')
	.controller('OrdenesServicioCtrl', function($state, ngNotify, $location) {
		var vm = this;
		vm.showdatosPlaza = false;
		vm.seleccionar = seleccionar;

		function seleccionar(id, selec) {
			$state.go('home.procesos.ordenNueva',{ experience: id, context: selec });
		}
	});
