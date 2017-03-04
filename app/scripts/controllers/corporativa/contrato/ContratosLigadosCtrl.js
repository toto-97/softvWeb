'use strict';

function ContratosLigadosCtrl($uibModalInstance, $uibModal, $rootScope, corporativoFactory, detalle, $state, ngNotify, ContratoMaestroFactory) {

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
			contrato.CONTRATO = detalle.ContratosSoftv[a].ContratoCom;
			contrato.Nombre = detalle.ContratosSoftv[a].NombreCli;
			contrato.Apellido_Materno = '';
			contrato.Apellido_Paterno = '';
			contrato.ContratoBueno = detalle.ContratosSoftv[a].ContratoReal;
			vm.contratos.push(contrato);
		}
	}


	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	$rootScope.$on('agregar_contrato', function(e, contrato) {
		console.log(contrato);
		console.log(vm.contratos);
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

			vm.contratos.forEach(function(item) {
				contratos.push({
					Contrato: item.ContratoBueno
				});
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

	function ValidaArchivo() {
		var files = $("#inputFile2").get(0).files;
		ContratoMaestroFactory.UpdateFile(files, vm.Distribuidor.Clv_Plaza, detalle.IdContratoMaestro).then(function(data) {
			console.log(data);
			if (data.ContratosValidos.length > 0) {
				ngNotify.set('Se encontraron ' + data.ContratosValidos.length + ' contratos válidos', 'grimace');
				vm.contratos = [];
				for (var i = 0; i < data.ContratosValidos.length; i++) {
					var contrato = {};
					contrato.CONTRATO = data.ContratosValidos[i].ContratoCom;
					contrato.Nombre = data.ContratosValidos[i].Nombre;
					contrato.Apellido_Materno = '';
					contrato.Apellido_Paterno = '';
					contrato.ContratoBueno = data.ContratosValidos[i].ContratoReal;
					vm.contratos.push(contrato);
				}
			}


		});
	}

	var vm = this;
	vm.cancel = cancel;
	vm.ok = ok;
	vm.clientesModal = clientesModal;
	vm.eliminarContrato = eliminarContrato;
	vm.contratos = [];
	Init();
	vm.edit = edit;
	vm.ValidaArchivo = ValidaArchivo;
}
angular.module('softvApp').controller('ContratosLigadosCtrl', ContratosLigadosCtrl);
