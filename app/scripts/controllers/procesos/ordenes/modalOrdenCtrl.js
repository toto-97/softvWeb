'use strict';
angular
	.module('softvApp')
	.controller('ModalOrdenCtrl', function($uibModalInstance, $uibModal, items, reportesFactory, ordenesFactory) {

		function initial() {
			if (items.valor == 37) {
				vm.cambioDomicilio = true;
				vm.contratacionExt = false;
				vm.cancelacionExt = false;
				vm.instalacion = false;
				vm.entregaAparatos = false;
				vm.entregaCables = false;
				vm.titulo = 'Capture el Domicilio'

				ordenesFactory.getCiudadCamdo(items.contrato).then(function(data) {
					vm.ciudades = data.GetllenaCiudadCamdoListResult;
					console.log(vm.ciudades);
				});
			}else if (items.valor == 2) {
				vm.contratacionExt = true;
				vm.cambioDomicilio = false;
				vm.cancelacionExt = false;
				vm.instalacion = false;
				vm.entregaAparatos = false;
				vm.entregaCables = false;
				vm.titulo = 'Extenciones por Instalar'
			}else if (items.valor == 3) {
				vm.contratacionExt = false;
				vm.cambioDomicilio = false;
				vm.cancelacionExt = true;
				vm.instalacion = false;
				vm.entregaAparatos = false;
				vm.entregaCables = false;
				vm.titulo = 'Extenciones por Desinstalar'
			}else if (items.valor == 4) {
				vm.contratacionExt = false;
				vm.cambioDomicilio = false;
				vm.cancelacionExt = false;
				vm.instalacion = true;
				vm.entregaAparatos = false;
				vm.entregaCables = false;
				vm.titulo = 'Instalación de Servicios de Internet'
			}else if (items.valor == 5) {
				vm.contratacionExt = false;
				vm.cambioDomicilio = false;
				vm.cancelacionExt = false;
				vm.instalacion = false;
				vm.entregaAparatos = true;
				vm.entregaCables = false;
				vm.titulo = 'Seleccione el Aparato'
			}else if (items.valor == 6) {
				vm.contratacionExt = false;
				vm.cambioDomicilio = false;
				vm.cancelacionExt = false;
				vm.instalacion = false;
				vm.entregaAparatos = false;
				vm.entregaCables = true;
				vm.titulo = 'Entrega de Cables'
			}
		}

		function getDatos() {
			reportesFactory.muestraSucursalesEspeciales().then(function(data) {
				vm.sucursalesObj = {
					filterPlaceHolder: 'Buscar en los elementos sin seleccionar.',
					labelAll: 'Servicios de internet para instalar',
					labelSelected: 'Instalar estos servicios de internet',
					labelShow: 'Nombre',
					orderProperty: 'Nombre',
					items: data.GetSucursalesEspecialesListResult,
					selectedItems: []
				};
			});
		}

		function changeCamdo() {
			if (vm.selectedCiudad.Clv_Ciudad == undefined) {
				vm.colonias = '';
				vm.calles = '';
			}else{
				ordenesFactory.getLocalidadCamdo(items.contrato, vm.selectedCiudad.Clv_Ciudad).then(function(data) {
					vm.localidades = data.GetllenaLocalidadCamdoListResult;
				});
			}
		}

		function changeLocalidad() {
			if (vm.selectedLocalidad.Clv_Localidad == undefined) {
				vm.colonias = '';
				vm.calles = '';
			}else{
				ordenesFactory.getColoniaCamdo(items.contrato, vm.selectedLocalidad.Clv_Localidad).then(function(data) {
					vm.colonias = data.GetllenaColoniaCamdoListResult;
				});
			}
		}

		function changeColonia() {
			if (vm.selectedColonia.CLV_COLONIA == undefined) {
				vm.calles = '';
			}else{
				ordenesFactory.getCalleCamdo(items.contrato, vm.selectedColonia.CLV_COLONIA).then(function(data) {
					vm.calles = data.GetllenaCalleCamdoListResult;
					console.log(vm.calles);
				});
			}
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.changeCamdo = changeCamdo;
		vm.changeLocalidad =changeLocalidad;
		vm.changeColonia = changeColonia;
		initial();
		getDatos();
	});
