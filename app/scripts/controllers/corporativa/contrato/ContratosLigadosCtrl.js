'use strict';

function ContratosLigadosCtrl($uibModalInstance, $uibModal, $rootScope, corporativoFactory, maestro, $state, ngNotify) {

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	$rootScope.$on('agregar_contrato', function(e, contrato) {
		var aux = 0;
		vm.contratos.forEach(function(item) {
			if (contrato.CONTRATO == item.CONTRATO) {
				aux += 1;
			}
		});
		if (aux == 0) {
			vm.contratos.push(contrato);
		}
	});

	function clientesModal() {
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/corporativa/buscaContrato.html',
			controller: 'BuscaContratoLCtrl',
			controllerAs: '$ctrl',
			backdrop: 'static',
			windowClass: 'app-modal-window',
			keyboard: false,
			size: "lg",
			resolve: {
				contratos: function() {
					return vm.contratos;
				}
			}
		});
	}

	function ok() {
		if (vm.contratos.length > 0) {
			var contratos = [];
			vm.contratos.forEach(function(item) {
				contratos.push({
					Contrato: item.ContratoBueno
				});
			});
			corporativoFactory.ligarContratos(maestro, contratos).then(function(data) {
				ngNotify.set('Contratos ligados al contrato maestro.', 'success');
				$state.go('home.corporativa.maestro');
				$uibModalInstance.dismiss('cancel');
			});
		} else {
			ngNotify.set('Introduce al menos un contrato.', 'error');
		}

	}

	function eliminarContrato(index) {
		vm.contratos.splice(index, 1);
	}

	var vm = this;
	vm.cancel = cancel;
	vm.ok = ok;
	vm.clientesModal = clientesModal;
	vm.eliminarContrato = eliminarContrato;
	vm.contratos = [];
}
angular.module('softvApp').controller('ContratosLigadosCtrl', ContratosLigadosCtrl);
