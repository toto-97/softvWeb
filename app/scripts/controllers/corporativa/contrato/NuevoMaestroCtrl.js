'use strict';

function NuevoMaestroCtrl($uibModal, $rootScope) {
	this.$onInit = function() {
		$('.maestro').collapse();
		$('.contratosLigados').collapse();
	}

	function abrirContratos() {
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/corporativa/contratosLigados.html',
			controller: 'ContratosLigadosCtrl',
			controllerAs: '$ctrl',
			backdrop: 'static',
			keyboard: false,
			size: "md",
			resolve: {
				contratos: function() {
					return vm.contratos;
				}
			}
		});
	}

	$rootScope.$on('contratos_ligados', function(e, contratos) {
		vm.contratos = contratos
	});

	var vm = this;
	vm.abrirContratos = abrirContratos;
	vm.contratos = [];
}
angular.module('softvApp').controller('NuevoMaestroCtrl', NuevoMaestroCtrl);
