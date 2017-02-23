'use strict';

function NuevoMaestroCtrl($uibModal, $rootScope, corporativoFactory) {
	this.$onInit = function() {
		$('.maestro').collapse();
		$('.contratosLigados').collapse();
		corporativoFactory.getDistribuidores().then(function(data) {
			vm.distribuidores = data.GetDistribuidoresResult;
		});
		corporativoFactory.getEstados().then(function(data) {
			vm.estados = data.GetMuestraEstadoResult;
		});
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

	function guardarContrato() {
		alert('dfaddfs');
	}

	function cambioEstado() {
		corporativoFactory.getCiudades(vm.estado.Clv_Estado).then(function(data) {
			vm.ciudades = data.GetMuestraCiudadResult;
		});
	}

	function cambioCiudad() {
		corporativoFactory.getLocalidades(vm.ciudad.Clv_Ciudad).then(function(data) {
			vm.localidades = data.GetMuestraLocalidadResult;
		});
	}

	function cambioLocalidad() {
		corporativoFactory.getColonias(vm.localidad.Clv_Localidad).then(function(data) {
			vm.colonias = data.GetMuestraColoniaResult;
		});
	}

	function cambioColonia() {
		corporativoFactory.getCalles(vm.colonia.clv_colonia, vm.localidad.Clv_Localidad).then(function(data) {
			vm.calles = data.GetMuestraCalleResult;
		});
	}

	var vm = this;
	vm.abrirContratos = abrirContratos;
	vm.contratos = [];
	vm.prepago = 'prepago';
	vm.reactivacion = 'manual';
	vm.tipopago = 'estado';
	vm.guardarContrato = guardarContrato;
	vm.cambioEstado = cambioEstado;
	vm.cambioCiudad = cambioCiudad;
	vm.cambioLocalidad = cambioLocalidad;
	vm.cambioColonia = cambioColonia;
}
angular.module('softvApp').controller('NuevoMaestroCtrl', NuevoMaestroCtrl);
