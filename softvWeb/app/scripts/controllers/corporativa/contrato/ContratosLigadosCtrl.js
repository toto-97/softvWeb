'use strict';

function ContratosLigadosCtrl($uibModalInstance, $uibModal, $rootScope, corporativoFactory, detalle, $state, ngNotify) {

	function Init() {
		vm.Distribuidor = detalle.Distribuidor;
		console.log(detalle);
		if (detalle.Action == "EDIT") {
			vm.showokbtn = false;
			vm.showeditbtn = true;

		}
		if (detalle.Action == "ADD") {
			vm.showokbtn = true;
			vm.showeditbtn = false;
		}
		for (var a = 0; a < detalle.ContratosSoftv.length; a++) {
			var contrato = {};
			contrato.CONTRATO = detalle.ContratosSoftv[a].ContratoReal;
			contrato.Nombre = detalle.ContratosSoftv[a].NombreCli;
			contrato.Apellido_Materno = '';
			contrato.Apellido_Paterno = '';
			vm.contratos.push(contrato);

		}



	}


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
		var detalle = {};
		detalle.contratos = vm.contratos;
		detalle.Distribuidor = vm.Distribuidor;
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
					return detalle;
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
			corporativoFactory.ligarContratos(detalle.IdContratoMaestro, contratos).then(function(data) {
				ngNotify.set('Contratos ligados al contrato maestro.', 'success');
				$state.go('home.corporativa.maestro');
				$uibModalInstance.dismiss('cancel');
			});
		} else {
			ngNotify.set('Introduce al menos un contrato.', 'error');
		}

	}

	function edit() {
		if (vm.contratos.length > 0) {
			var contratos = [];
			console.log(vm.contratos);
			vm.contratos.forEach(function(item) {
				if (item.ContratoBueno == undefined) {
					contratos.push({
						Contrato: item.CONTRATO
					});
				} else {
					contratos.push({
						Contrato: item.ContratoBueno
					});
				}

			});

			corporativoFactory.UpdateRelContrato(detalle.IdContratoMaestro, contratos).then(function(data) {
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
	Init();
	vm.edit = edit;
}
angular.module('softvApp').controller('ContratosLigadosCtrl', ContratosLigadosCtrl);
