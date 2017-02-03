'use strict';
angular
	.module('softvApp')
	.controller('TicketsCtrl', function($uibModal, $rootScope, ngNotify) {
		function buscarSucursal() {
			vm.showSucursales = true;
			vm.showEspeciales = false;
		}

		function buscarEspecial() {
			vm.showSucursales = false;
			vm.showEspeciales = true;
		}

		var vm = this;
		vm.buscarSucursal = buscarSucursal;
		vm.buscarEspecial = buscarEspecial;
	});
