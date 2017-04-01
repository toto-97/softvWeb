'use strict';
angular
	.module('softvApp')
	.controller('ModalRegresarCtrl', function($uibModalInstance, cajasFactory, items, $rootScope, ngNotify, $uibModal) {

		function initialData() {
			cajasFactory.dameAparatosAdeudo(items.Contrato, items.Session, items.CLV_DETALLE).then(function(data) {
				vm.aparatos = data.GetMuestraAparatosCobroAdeudoListResult;
			});
		}

		function addRecibir(item, status) {
			if (status == true) {
				vm.recibi.push(item);
			} else {
				vm.recibi.forEach(function(element, index, array) {
					if (element.Id == item.Id) {
						vm.recibi.splice(index, 1);
					}
				});
			}
		}

		function addCancelar(item, status) {
			if (status == true) {
				vm.aparatos.forEach(function(element, index, array) {
					if (element.ContratoNet == item.ContratoNet) {
						element.checado = true;
						vm.seleccion.push(element);
					}
				});
			} else {
				vm.aparatos.forEach(function(element, index, array) {
					if (element.ContratoNet == item.ContratoNet) {
						element.checado = false;
					}
				});

				var arr = vm.seleccion.filter(function(value, index, array) {
					return (value.ContratoNet != item.ContratoNet);
				});

				vm.seleccion = arr;
			}
		}


		function ok() {

			var lstDevolucionApa = [];
			var aparatosd = 0;
			var aparatosi = 0;
			var recibidosd = 0;
			var recibidosi = 0;
			if (vm.seleccion.length == 0) {
				ngNotify.set('Debe seleccionar al menos un aparato para aplicar el cobro de adeudo.', 'error');
			} else {
				for (var i = 0; i < vm.recibi.length; i++) {
					var aparato = {};
					aparato.Id = vm.recibi[i].Id;
					aparato.Recibi = 1;
					aparato.TipoServicio = vm.recibi[i].TipoServicio;
					aparato.aparato = vm.recibi[i].Detalle;
					aparato.Tipo = vm.recibi[i].Tipo;
					aparato.Clv_Session = items.Session;
					aparato.Clv_Detalle = items.CLV_DETALLE;
					aparato.Seleccion = 0;
					lstDevolucionApa.push(aparato);
				}
				var objLen = lstDevolucionApa.length;
				for (var x = 0; x < vm.seleccion.length; x++) {
					var cont = 0;
					for (var j = 0; j < objLen; j++) {
						if (lstDevolucionApa[j].Id == vm.seleccion[x].Id) {
							lstDevolucionApa[j].Seleccion = 1;
						} else {
							cont = cont + 1;
						}
					}

					if (cont == objLen) {
						var aparato = {};
						aparato.Id = vm.seleccion[x].Id;
						aparato.Recibi = 0;
						aparato.TipoServicio = vm.seleccion[x].TipoServicio;
						aparato.aparato = vm.seleccion[x].Detalle;
						aparato.Tipo = vm.seleccion[x].Tipo;
						aparato.Clv_Session = items.Session;
						aparato.Clv_Detalle = items.CLV_DETALLE;
						aparato.Seleccion = 1;
						lstDevolucionApa.push(aparato);
					}
				}


				lstDevolucionApa.forEach(function(element, index, array) {
					if (element.Tipo == 'Aparato') {
						if (element.TipoServicio == 2) {
							aparatosi = aparatosi + 1;
							if (element.Seleccion == 1) {
								recibidosi = recibidosi + 1;
							}
						} else if (element.TipoServicio == 3) {
							aparatosd = aparatosd + 1
							if (element.Seleccion == 1) {
								recibidosd = recibidosd + 1;
							}
						}
					}
				});

				if (aparatosi != recibidosi) {
					cajasFactory.quitarAntena(items.Session, 2).then(function(data) {});
				} else if (aparatosd != recibidosd) {
					cajasFactory.quitarAntena(items.Session, 3).then(function(data) {});
				}

				cajasFactory.cobrarAdeudo(lstDevolucionApa).then(function(data) {
					$uibModalInstance.dismiss('cancel');
					var modalInstance = $uibModal.open({
						animation: true,
						ariaLabelledBy: 'modal-title',
						ariaDescribedBy: 'modal-body',
						templateUrl: 'views/facturacion/modalMotivoCancelacion.html',
						controller: 'ModalMotivoCancelacionCtrl',
						controllerAs: 'ctrl',
						backdrop: 'static',
						keyboard: false,
						size: 'sm',
						resolve: {
							items: function() {
								return items;
							}
						}
					});
				});

			}

		}

		function cancel() {
			cajasFactory.borrarAdeudo(items.Session).then(function(data) {
				$uibModalInstance.dismiss('cancel');
			});
		}

		var vm = this;
		vm.cancel = cancel;
		vm.addCancelar = addCancelar;
		vm.addRecibir = addRecibir;
		vm.recibi = [];
		vm.seleccion = [];
		vm.aparatos = '';
		vm.ok = ok;
		initialData();
	});
