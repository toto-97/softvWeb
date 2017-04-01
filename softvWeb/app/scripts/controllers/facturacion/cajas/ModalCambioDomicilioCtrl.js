'use strict';
angular
	.module('softvApp')
	.controller('ModalCambioDomicilioCtrl', function($uibModalInstance, cajasFactory, items, $rootScope, ngNotify) {

		function initialData() {
			cajasFactory.dameCiudades(items.Contrato).then(function(data) {
				data.GetCiudadCAMDOListResult.unshift({
					'nombre': '----------------',
					'Clv_Ciudad': 0
				});
				vm.ciudades = data.GetCiudadCAMDOListResult;
				vm.selectedCiudad = data.GetCiudadCAMDOListResult[0];
			});
		}


		function changeCiudad() {
			cajasFactory.dameLocalidades(items.Contrato, vm.selectedCiudad.Clv_Ciudad).then(function(data) {
				data.GetLocalidadCAMDOListResult.unshift({
					'Nombre': '----------------',
					'Clv_Localidad': 0
				});
				vm.localidades = data.GetLocalidadCAMDOListResult;
				vm.selectedLocalidad = data.GetLocalidadCAMDOListResult[0];
			});
		}

		function changeLocalidad() {
			cajasFactory.dameColonias(items.Contrato, vm.selectedLocalidad.Clv_Localidad).then(function(data) {
				data.GetColoniaCAMDOListResult.unshift({
					'COLONIA': '----------------',
					'CLV_COLONIA': 0
				});
				vm.colonias = data.GetColoniaCAMDOListResult;
				vm.selectedColonia = data.GetColoniaCAMDOListResult[0];
			});
		}

		function changeColonia() {
			cajasFactory.dameCalles(items.Contrato, vm.selectedColonia.CLV_COLONIA).then(function(data) {
				data.GetCalleCAMDOListResult.unshift({
					'Nombre': '----------------',
					'Clv_calle': 0
				});
				vm.calles = data.GetCalleCAMDOListResult;
				vm.selectedCalle = data.GetCalleCAMDOListResult[0];
			});
		}

		function ok() {
			if (vm.selectedCiudad.Clv_Ciudad == 0 || vm.selectedLocalidad.Clv_Localidad == 0 || vm.selectedColonia.CLV_COLONIA == 0 || vm.selectedCalle.Clv_calle == 0 || vm.numero == undefined || vm.entreCalles == undefined) {
				ngNotify.set('Por favor llena todos los datos.', 'error');
			} else {
				var objCAMDOFAC = {
					'Clv_Sesion': items.Session,
					'CONTRATO': items.Contrato,
					'Clv_Calle': vm.selectedColonia.Clv_calle,
					'NUMERO': vm.numero,
					'Num_int': vm.numeroInterior,
					'ENTRECALLES': vm.entreCalles,
					'Clv_Colonia': vm.selectedColonia.CLV_COLONIA,
					'Clv_Localidad': vm.selectedLocalidad.Clv_Localidad,
					'TELEFONO': vm.telefono,
					'ClvTecnica': 0,
					'Clv_Ciudad': vm.selectedCiudad.Clv_Ciudad,
					'Clv_Sector': 0,
				}
				cajasFactory.addCamdo(objCAMDOFAC).then(function(data) {});
				cajasFactory.addAdicionales(items.Session, items.Texto, items.Contrato, items.Tipo).then(function(data) {
					$uibModalInstance.dismiss('cancel');
					$rootScope.$emit('realoadPagos', {});
				});
			}
		}

		function cancel() {
			cajasFactory.cancelarDomicilio(items.Session, items.Contrato).then(function(data) {
				$uibModalInstance.dismiss('cancel');
				$rootScope.$emit('realoadPagos', {});
			});
		}

		var vm = this;
		vm.cancel = cancel;
		vm.changeCiudad = changeCiudad;
		vm.changeLocalidad = changeLocalidad;
		vm.changeColonia = changeColonia;
		vm.ok = ok;
		initialData();
	});
