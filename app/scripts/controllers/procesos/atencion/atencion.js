'use strict';
angular
	.module('softvApp')
	.controller('AtencionCtrl', function($state, ngNotify) {
		var vm = this;
		vm.showdatosPlaza = false;
		vm.goTO = goTO;
		vm.nuevaEntrega = nuevaEntrega;

		function nuevaEntrega() {
			ngNotify.set('Your notification message goes here!');
		}

		function goTO() {
			$state.go('home.procesos.atencionDetalle');
		}
	});
