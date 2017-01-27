'use strict';
angular
	.module('softvApp')
	.controller('DesgloseMonedaCtrl', function($rootScope, $uibModal, desgloseFactory, $filter, ngNotify, $localStorage) {

		function initialData() {
			desgloseFactory.busquedaDesglose(0, $localStorage.currentUser.usuario, vm.fecha).then(function(data) {
				vm.desglose = data.GetBuscaDesgloseDeMonedaListResult;
				vm.sinDatos = false;
				vm.showPaginator = true;
			});
			desgloseFactory.checarDesglose($localStorage.currentUser.usuario, vm.fechaChecar).then(function(data) {
				vm.resultado = data.GetDeepuspChecaSiTieneDesgloseResult.Resultado;
			});
		}

		function verTodo() {
			initialData();
		}

		$rootScope.$on('updateDesglose', function() {
			initialData();
		});

		function buscarPorFecha(fechaBusqueda) {
			if (fechaBusqueda == undefined || fechaBusqueda == '') {
				ngNotify.set('Seleccione una fecha.', 'error');
			} else {
				vm.seleccion = 2;
				vm.auxFechaInicio = $filter('date')(fechaBusqueda, 'dd/MM/yyyy');
				desgloseFactory.busquedaDesglose(vm.seleccion, $localStorage.currentUser.usuario, vm.auxFechaInicio).then(function(data) {
					if (data.GetBuscaDesgloseDeMonedaListResult.length == 0) {
						ngNotify.set('No se encontraron registros.', 'error');
						vm.sinDatos = true;
						vm.desglose = '';
						vm.showPaginator = false;
					} else {
						vm.sinDatos = false;
						vm.desglose = data.GetBuscaDesgloseDeMonedaListResult;
						vm.showPaginator = true;
					}
				});
			}
		}

		function validar(id, consecutivo) {
			var items = {
				id: id,
				consecutivo: consecutivo
			};
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/modalValidar.html',
				controller: 'ModalValidarCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'sm',
				resolve: {
					items: function() {
						return items;
					}
				}
			});
		}

		// autenticar

		function nuevo() {

			if (vm.resultado == 0) {
				var items = {
					action: 'nuevo',
					titulo: 'Nuevo Desglose',
				};
				vm.animationsEnabled = true;
				var modalInstance = $uibModal.open({
					animation: vm.animationsEnabled,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'views/facturacion/modalNew.html',
					controller: 'ModalNewCtrl',
					controllerAs: '$ctrl',
					backdrop: 'static',
					keyboard: false,
					size: 'lg',
					windowClass: 'app-modal-window-large',
					resolve: {
						items: function() {
							return items;
						}
					}
				});
			} else {
				ngNotify.set('Ya existe desglose generado del día, proceda a eliminar el anterior para ingresar uno nuevo.', 'error');;
			}
		}

		// editar

		function detalleDesglose(consecutivo) {
			var items = {
				action: 'ver',
				titulo: 'Detalle de Desglose',
				consecutivo: consecutivo,
				fecha: vm.fecha
			};
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/modalNew.html',
				controller: 'ModalNewCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'lg',
				windowClass: 'app-modal-window-large',
				resolve: {
					items: function() {
						return items;
					}
				}
			});
		}

		var vm = this;
		vm.showPanel = true;
		vm.nuevo = nuevo;
		vm.date = new Date();
		vm.fecha = '';
		vm.fechaChecar = $filter('date')(vm.date, 'dd/MM/yyyy');
		vm.detalleDesglose = detalleDesglose;
		vm.buscarPorFecha = buscarPorFecha;
		vm.validar = validar;
		vm.verTodo = verTodo;
		initialData();
	});
