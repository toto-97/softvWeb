'use strict';
angular
	.module('softvApp')
	.controller('AtencionCtrl', function($state, ngNotify, atencionFactory) {
		function initialData() {
			atencionFactory.getPlazas().then(function(data) {
				data.GetMuestra_Compania_RelUsuarioListResult.unshift({
					'razon_social': '----------------',
					'id_compania': 0
				});
				vm.plazas = data.GetMuestra_Compania_RelUsuarioListResult;
				vm.selectedPlaza = vm.plazas[0];
			});
			atencionFactory.getServicios().then(function(data) {
				vm.servicios = data.GetMuestraTipSerPrincipalListResult;
				vm.selectedServicio = vm.servicios[0];
			});
			atencionFactory.getUsuarios().then(function(data) {
				data.GetMUESTRAUSUARIOSListResult.unshift({
					'NOMBRE': '----------------',
					'Clave': 0
				});
				vm.usuarios = data.GetMUESTRAUSUARIOSListResult;
				vm.selectedUsuario = vm.usuarios[0];
			});
		}


		var vm = this;
		initialData();
	});
