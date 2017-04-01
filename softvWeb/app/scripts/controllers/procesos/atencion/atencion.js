'use strict';
angular
	.module('softvApp')
	.controller('AtencionCtrl', function($state, ngNotify, atencionFactory, $localStorage) {
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

		function cambioReporte(x) {
			if (x == 1) {
				vm.contrato = '';
				vm.op = 3;
			} else {
				vm.reporte = 0;
				vm.op = 0;
			}
		}

		function buscarReporte() {
			if (vm.contrato == undefined && vm.reporte == undefined) {
				ngNotify.set('Introduce un número de contrato ó un número de reporte.', 'error');
			} else if (vm.contrato == '' && vm.reporte == '') {
				ngNotify.set('Introduce un número de contrato ó un número de reporte.', 'error');
			} else {
				var obj = {
					servicio: vm.selectedServicio.Clv_TipSerPrincipal,
					reporte: vm.reporte,
					contrato: vm.contrato,
					nombre: '',
					paterno: '',
					materno: '',
					calle: '',
					numero: '',
					colonia: 0,
					setupbox: '',
					op: vm.op,
					compania:488,
					clvUsuario:180
				};
				atencionFactory.buscarAtencion(obj).then(function(data) {
					vm.atenciones = data.GetuspBuscaLLamadasDeInternetListResult;
				});
			}
		}

		function buscarNombres() {
			if (vm.nombre == '' && vm.paterno == '' && vm.materno == '') {
				ngNotify.set('Introduce un nombre válido.', 'error');
			} else if (vm.nombre == undefined && vm.paterno == undefined && vm.materno == undefined) {
				ngNotify.set('Introduce un nombre válido.', 'error');
			} else {
				var obj = {
					servicio: vm.selectedServicio.Clv_TipSerPrincipal,
					reporte: 0,
					contrato: 0,
					nombre: vm.nombre,
					paterno: vm.paterno,
					materno: vm.materno,
					calle: '',
					numero: '',
					colonia: 0,
					setupbox: '',
					op: 1,
					compania:0,
					clvUsuario:0
				};
				atencionFactory.buscarAtencion(obj).then(function(data) {
					vm.atenciones = data.GetuspBuscaLLamadasDeInternetListResult;
				});
			}
		}

		function cambioPlaza() {
			if (vm.selectedPlaza.id_compania > 0) {
				atencionFactory.getColonias(vm.selectedPlaza.id_compania).then(function(data) {
					console.log(data);
					vm.colonias = data.GetuspConsultaColoniasListResult;
					vm.selectedColonia = vm.colonias[0];
				});
			}
		}

		function buscarColonia() {
			if (vm.selectedColonia == undefined) {
				ngNotify.set('Por favor seleccione una plaza.', 'error');
			} else if (vm.selectedColonia.clvColonia == 0) {
				ngNotify.set('Por favor seleccione una colonia.', 'error');
			} else {
				var obj = {
					servicio: vm.selectedServicio.Clv_TipSerPrincipal,
					reporte: 0,
					contrato: 0,
					nombre: '',
					paterno: '',
					materno: '',
					calle: vm.calle,
					numero: vm.numero,
					colonia: vm.selectedColonia.clvColonia,
					setupbox: '',
					op: 2,
					compania:0,
					clvUsuario:0
				};
				atencionFactory.buscarAtencion(obj).then(function(data) {
					vm.atenciones = data.GetuspBuscaLLamadasDeInternetListResult;
				});
			}
		}

		function bucarUsuario() {
			console.log('entra');
			if (vm.selectedUsuario.Clave == 0) {
				ngNotify.set('Por favor seleccione un usuario.', 'error');
			} else {
				var obj = {
					servicio: vm.selectedServicio.Clv_TipSerPrincipal,
					reporte: 0,
					contrato: 0,
					nombre: '',
					paterno: '',
					materno: '',
					calle: '',
					numero: '',
					colonia: 0,
					setupbox: '',
					op: 11,
					compania:vm.selectedPlaza.id_compania,
					clvUsuario:vm.selectedUsuario.Clave
				};
				atencionFactory.buscarAtencion(obj).then(function(data) {
					console.log(data);
					vm.atenciones = data.GetuspBuscaLLamadasDeInternetListResult;
				});
			}
		}

		var vm = this;
		vm.cambioReporte = cambioReporte;
		vm.buscarReporte = buscarReporte;
		vm.buscarNombres = buscarNombres;
		vm.cambioPlaza = cambioPlaza;
		vm.buscarColonia = buscarColonia;
		vm.bucarUsuario = bucarUsuario;
		vm.calle = '';
		vm.numero = '';
		vm.atenciones = [];
		initialData();
	});
