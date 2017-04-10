'use strict';
angular
	.module('softvApp')
	.controller('ModalOrdenCtrl', function($uibModalInstance, $uibModal, valor, reportesFactory) {

		function initial() {
			if (valor == 1) {
				vm.cambioDomicilio = true;
				vm.contratacionExt = false;
				vm.cancelacionExt = false;
				vm.instalacion = false;
				vm.entregaAparatos = false;
				vm.entregaCables = false;
				vm.titulo = 'Capture el Domicilio'
			}else if (valor == 2) {
				vm.contratacionExt = true;
				vm.cambioDomicilio = false;
				vm.cancelacionExt = false;
				vm.instalacion = false;
				vm.entregaAparatos = false;
				vm.entregaCables = false;
				vm.titulo = 'Extenciones por Instalar'
			}else if (valor == 3) {
				vm.contratacionExt = false;
				vm.cambioDomicilio = false;
				vm.cancelacionExt = true;
				vm.instalacion = false;
				vm.entregaAparatos = false;
				vm.entregaCables = false;
				vm.titulo = 'Extenciones por Desinstalar'
			}else if (valor == 4) {
				vm.contratacionExt = false;
				vm.cambioDomicilio = false;
				vm.cancelacionExt = false;
				vm.instalacion = true;
				vm.entregaAparatos = false;
				vm.entregaCables = false;
				vm.titulo = 'Instalación de Servicios de Internet'
			}else if (valor == 5) {
				vm.contratacionExt = false;
				vm.cambioDomicilio = false;
				vm.cancelacionExt = false;
				vm.instalacion = false;
				vm.entregaAparatos = true;
				vm.entregaCables = false;
				vm.titulo = 'Seleccione el Aparato'
			}else if (valor == 6) {
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

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		initial();
		getDatos();
	});
