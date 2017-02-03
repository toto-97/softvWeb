'use strict';
angular.module('softvApp')
	.controller('TicketsCtrl', function($uibModal, $rootScope, ngNotify) {
		function buscarSucursal() {
			vm.showSucursales = true;
			vm.showEspeciales = false;
		}

		function buscarEspecial() {
			vm.showSucursales = false;
			vm.showEspeciales = true;
		}

		function reimprimirTicket() {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/modalReimprimir.html',
				controller: 'ReimprimirCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'md'
			});
		}

		var vm = this;
		vm.buscarSucursal = buscarSucursal;
		vm.buscarEspecial = buscarEspecial;
		vm.reimprimirTicket = reimprimirTicket;
	});
