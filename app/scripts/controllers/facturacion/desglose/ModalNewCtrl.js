'use strict';
angular
	.module('softvApp')
	.controller('ModalNewCtrl', function($uibModalInstance, items, desgloseFactory, $filter, $rootScope, globalService, ngNotify, $localStorage) {
		function initialDataNuevo() {
			vm.showClave = true;
			vm.showCajero = true;
			vm.showb1000 = false;
			vm.showb500 = false;
			vm.showb200 = false;
			vm.showb100 = false;
			vm.showb50 = false;
			vm.showb20 = false;
			vm.showm100 = false;
			vm.showm50 = false;
			vm.showm20 = false;
			vm.showm10 = false;
			vm.showm5 = false;
			vm.showm2 = false;
			vm.showm1 = false;
			vm.showm050 = false;
			vm.showm020 = false;
			vm.showm010 = false;
			vm.showm005 = false;
			vm.showCheques = false;
			vm.showGastos = true;
			vm.showImporte = false;
			vm.showCambio = false;
			vm.showConversion = false;
			vm.showSaldoAnterior = true;
			vm.showFecha = true;
			vm.showTransferencia = false;
			vm.showGuardar = true;
			vm.showConversion = true;
			vm.showTotal = true;
			vm.showGranTotal = true;
			vm.showNota = true;
			vm.showNota2 = true;
			vm.desglose.b1000 = 0;
			vm.desglose.b500 = 0;
			vm.desglose.b200 = 0;
			vm.desglose.b100 = 0;
			vm.desglose.b50 = 0;
			vm.desglose.b20 = 0;
			vm.desglose.m100 = 0;
			vm.desglose.m50 = 0;
			vm.desglose.m20 = 0;
			vm.desglose.m10 = 0;
			vm.desglose.m5 = 0;
			vm.desglose.m2 = 0;
			vm.desglose.m1 = 0;
			vm.desglose.m050 = 0;
			vm.desglose.m020 = 0;
			vm.desglose.m010 = 0;
			vm.desglose.m005 = 0;
			vm.desglose.cheques = 0;
			vm.desglose.transferencia = 0;
			vm.desglose.dolares = 0;
			vm.desglose.cambio = 0;
			vm.desglose.conversion = 0;
			vm.fecha = $filter('date')(new Date(), 'dd/MM/yyyy');
			vm.selectedCajero = $localStorage.currentUser.usuario;
		}

		function initalDataVer() {
			vm.showClave = true;
			vm.showCajero = true;
			vm.showb1000 = true;
			vm.showb500 = true;
			vm.showb200 = true;
			vm.showb100 = true;
			vm.showb50 = true;
			vm.showb20 = true;
			vm.showm100 = true;
			vm.showm50 = true;
			vm.showm20 = true;
			vm.showm10 = true;
			vm.showm5 = true;
			vm.showm2 = true;
			vm.showm1 = true;
			vm.showm050 = true;
			vm.showm020 = true;
			vm.showm010 = true;
			vm.showm005 = true;
			vm.showCheques = true;
			vm.showGastos = true;
			vm.showImporte = true;
			vm.showCambio = true;
			vm.showConversion = true;
			vm.showSaldoAnterior = true;
			vm.showFecha = true;
			vm.showTransferencia = true;
			vm.showTotal = true;
			vm.showGranTotal = true;
			vm.showNota = false;
			vm.showGuardar = false;
			vm.showNota2 = false;
			desgloseFactory.consultaDesglose(items.consecutivo).then(function(data) {
				var objDesglose = data.GetDeepDesgloseDeMonedaResult;
				vm.selectedCajero = objDesglose.Cajera,
					vm.desglose.b1000 = objDesglose.B1000;
				vm.desglose.b500 = objDesglose.B500;
				vm.desglose.b200 = objDesglose.B200;
				vm.desglose.b100 = objDesglose.B100;
				vm.desglose.b50 = objDesglose.B50;
				vm.desglose.b20 = objDesglose.B20;
				vm.desglose.m100 = objDesglose.M100;
				vm.desglose.m50 = objDesglose.M50;
				vm.desglose.m20 = objDesglose.M20;
				vm.desglose.m10 = objDesglose.M10;
				vm.desglose.m5 = objDesglose.M5;
				vm.desglose.m2 = objDesglose.M2;
				vm.desglose.m1 = objDesglose.M1;
				vm.desglose.m050 = objDesglose.M050;
				vm.desglose.m020 = objDesglose.M020;
				vm.desglose.m010 = objDesglose.M010;
				vm.desglose.m005 = objDesglose.M005;
				vm.clave = objDesglose.Consecutivo;
				vm.fecha = objDesglose.Fecha;
				vm.desglose.cheques = objDesglose.Cheques;
				vm.desglose.gastos = objDesglose.Gastos;
				vm.desglose.saldoAnterior = objDesglose.SaldoAnterior;
				vm.fecha = objDesglose.Fecha;
				vm.desglose.transferencia = objDesglose.Tarjeta;
				vm.granTotal = objDesglose.Total;
				vm.desglose.dolares = objDesglose.ImporteDolar;
				vm.desglose.cambio = objDesglose.TipoCambio;
				vm.desglose.conversion = objDesglose.TotalDolar;
				vm.cajeros = [];
				vm.billetes = (vm.desglose.b1000 * 1000) + (vm.desglose.b500 * 500) + (vm.desglose.b200 * 200) + (vm.desglose.b100 * 100) + (vm.desglose.b50 * 50) + (vm.desglose.b20 * 20);
				vm.monedas = (vm.desglose.m100 * 100) + (vm.desglose.m50 * 50) + (vm.desglose.m20 * 20) + (vm.desglose.m10 * 10) + (vm.desglose.m5 * 5) + (vm.desglose.m2 * 2) + (vm.desglose.m1 * 1) +
					(vm.desglose.m050 * 0.50) + (vm.desglose.m020 * 0.20) + (vm.desglose.m010 * 0.10) + (vm.desglose.m005 * 0.05);
				vm.total = vm.billetes + vm.monedas + vm.desglose.transferencia + vm.desglose.cheques;
			});
		}

		function initialDataEditar() {
			vm.showClave = true;
			vm.showCajero = false;
			vm.showb1000 = false;
			vm.showb500 = false;
			vm.showb200 = false;
			vm.showb100 = false;
			vm.showb50 = false;
			vm.showb20 = false;
			vm.showm100 = false;
			vm.showm50 = false;
			vm.showm20 = false;
			vm.showm10 = false;
			vm.showm5 = false;
			vm.showm2 = false;
			vm.showm1 = false;
			vm.showm050 = false;
			vm.showm020 = false;
			vm.showm010 = false;
			vm.showm005 = false;
			vm.showCheques = false;
			vm.showGastos = true;
			vm.showImporte = false;
			vm.showCambio = false;
			vm.showConversion = false;
			vm.showSaldoAnterior = true;
			vm.showFecha = true;
			vm.showTransferencia = false;
			vm.showGuardar = true;
			vm.showConversion = true;
			vm.showTotal = true;
			vm.showGranTotal = true;
			vm.showNota = true;
			vm.showNota2 = true;
			desgloseFactory.consultaDesglose(items.consecutivo).then(function(data) {
				var objDesglose = data.GetDeepDesgloseDeMonedaResult;
				vm.desglose.b1000 = objDesglose.B1000;
				vm.desglose.b500 = objDesglose.B500;
				vm.desglose.b200 = objDesglose.B200;
				vm.desglose.b100 = objDesglose.B100;
				vm.desglose.b50 = objDesglose.B50;
				vm.desglose.b20 = objDesglose.B20;
				vm.desglose.m100 = objDesglose.M100;
				vm.desglose.m50 = objDesglose.M50;
				vm.desglose.m20 = objDesglose.M20;
				vm.desglose.m10 = objDesglose.M10;
				vm.desglose.m5 = objDesglose.M5;
				vm.desglose.m2 = objDesglose.M2;
				vm.desglose.m1 = objDesglose.M1;
				vm.desglose.m050 = objDesglose.M050;
				vm.desglose.m020 = objDesglose.M020;
				vm.desglose.m010 = objDesglose.M010;
				vm.desglose.m005 = objDesglose.M005;
				vm.clave = objDesglose.Consecutivo;
				vm.fecha = objDesglose.Fecha;
				vm.desglose.cheques = objDesglose.Cheques;
				vm.desglose.gastos = objDesglose.Gastos;
				vm.desglose.saldoAnterior = objDesglose.SaldoAnterior;
				vm.fecha = objDesglose.Fecha;
				vm.desglose.transferencia = objDesglose.Tarjeta;
				vm.desglose.dolares = objDesglose.ImporteDolar;
				vm.desglose.cambio = objDesglose.TipoCambio;
				vm.desglose.conversion = objDesglose.TotalDolar;
				vm.granTotal = objDesglose.Total;
				vm.selectedCajero = objDesglose.Cajera;
				vm.billetes = (vm.desglose.b1000 * 1000) + (vm.desglose.b500 * 500) + (vm.desglose.b200 * 200) + (vm.desglose.b100 * 100) + (vm.desglose.b50 * 50) + (vm.desglose.b20 * 20);
				vm.monedas = (vm.desglose.m100 * 100) + (vm.desglose.m50 * 50) + (vm.desglose.m20 * 20) + (vm.desglose.m10 * 10) + (vm.desglose.m5 * 5) + (vm.desglose.m2 * 2) + (vm.desglose.m1 * 1) +
					(vm.desglose.m050 * 0.50) + (vm.desglose.m020 * 0.20) + (vm.desglose.m010 * 0.10) + (vm.desglose.m005 * 0.05);
				vm.total = vm.billetes + vm.monedas + vm.desglose.transferencia + vm.desglose.cheques;
			});
		}

		function changeImportes() {
			for (var key in vm.desglose) {
				if (vm.desglose[key] == null || vm.desglose[key] == '') {
					vm.desglose[key] = 0;
				}
			}

			vm.importeBillete = vm.desglose.b1000 * 1000;
			vm.importeBillete = vm.importeBillete + (vm.desglose.b500 * 500);
			vm.importeBillete = vm.importeBillete + (vm.desglose.b200 * 200);
			vm.importeBillete = vm.importeBillete + (vm.desglose.b100 * 100);
			vm.importeBillete = vm.importeBillete + (vm.desglose.b50 * 50);
			vm.importeBillete = vm.importeBillete + (vm.desglose.b20 * 20);
			vm.importeMoneda = vm.desglose.m100 * 100;
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m50 * 50);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m20 * 20);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m10 * 10);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m5 * 5);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m2 * 2);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m1 * 1);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m050 * 0.50);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m020 * 0.20);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m010 * 0.10);
			vm.importeMoneda = vm.importeMoneda + (vm.desglose.m005 * 0.05);
			vm.total = vm.importeBillete + vm.importeMoneda + vm.desglose.cheques + vm.desglose.transferencia;
			vm.desglose.conversion = vm.desglose.dolares * vm.desglose.cambio;
			vm.granTotal = vm.total + vm.desglose.conversion;
		}

		function guardarDesglose() {
			if (items.action == 'nuevo') {
				if (vm.granTotal == 0) {
					ngNotify.set('No pueden ir todos los campos en cero para generar el desglose.', 'error');
				} else {
					if (vm.granTotal == 0 || vm.granTotal == null) {
						ngNotify.set('No pueden ir todos los campos en cero para generar el desglose.', 'error');
					} else {
						var objDesglose = {
							Cajera: vm.selectedCajero,
							B1000: vm.desglose.b1000,
							B500: vm.desglose.b500,
							B200: vm.desglose.b200,
							B100: vm.desglose.b100,
							B50: vm.desglose.b50,
							B20: vm.desglose.b20,
							M100: vm.desglose.m100,
							M50: vm.desglose.m50,
							M20: vm.desglose.m20,
							M10: vm.desglose.m10,
							M5: vm.desglose.m5,
							M2: vm.desglose.m2,
							M1: vm.desglose.m1,
							M050: vm.desglose.m050,
							M020: vm.desglose.m020,
							M010: vm.desglose.m010,
							M005: vm.desglose.m005,
							Cheques: vm.desglose.cheques,
							Tarjeta: vm.desglose.transferencia,
							Total: vm.granTotal,
							Referencia: null,
							Gastos: vm.desglose.gastos,
							ImporteDolar: vm.desglose.dolares,
							TipoCambio: vm.desglose.cambio,
							SaldoAnterior: vm.saldoAnterior,
							TotalDolar: vm.desglose.conversion
						};
						desgloseFactory.agregarDesglose(objDesglose).then(function(data) {
							ngNotify.set('Desglose de Moneda generado correctamente', 'success');
							var url = globalService.getUrlReportes() + '/Reportes/' + data.GetDesgloseDeMonedaListResult[0].Cajera;
							$('#reporteID').attr('src', url);
							vm.showModal = false;
							vm.showGuardar = false;
							vm.showReporte = true;
							$rootScope.$emit('updateDesglose', {});
						});
					}
				}
			} else {
				if (vm.granTotal == 0) {
					ngNotify.set('Por Favor llena todos los datos correctamente.', 'error');
				} else {
					var objDesglose = {
						Cajera: vm.selectedCajero,
						B1000: vm.desglose.b1000,
						B500: vm.desglose.b500,
						B200: vm.desglose.b200,
						B100: vm.desglose.b100,
						B50: vm.desglose.b50,
						B20: vm.desglose.b20,
						M100: vm.desglose.m100,
						M50: vm.desglose.m50,
						M20: vm.desglose.m20,
						M10: vm.desglose.m10,
						M5: vm.desglose.m5,
						M2: vm.desglose.m2,
						M1: vm.desglose.m1,
						M050: vm.desglose.m050,
						M020: vm.desglose.m020,
						M010: vm.desglose.m010,
						M005: vm.desglose.m005,
						Cheques: vm.desglose.cheques,
						Tarjeta: vm.desglose.transferencia,
						Total: vm.granTotal,
						Referencia: null,
						Gastos: vm.desglose.gastos,
						SaldoAnterior: vm.saldoAnterior,
						ImporteDolar: vm.desglose.dolares,
						TipoCambio: vm.desglose.cambio,
						TotalDolar: vm.desglose.conversion,
						Consecutivo: vm.clave
					};
					desgloseFactory.updateDesglose(objDesglose).then(function(data) {
						$uibModalInstance.dismiss('cancel');
						ngNotify.set('Deslgose de Moneda Editado Correctamente', 'success');
						$rootScope.$emit('updateDesglose', {});
					});
				}
			}

		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.titulo = items.titulo;
		vm.changeImportes = changeImportes;
		vm.guardarDesglose = guardarDesglose;
		vm.cancel = cancel;
		vm.showModal = true;
		vm.showReporte = false;
		vm.desglose = {};
		if (items.action == 'ver') {
			initalDataVer();
		} else if (items.action == 'editar') {
			initialDataEditar();

		} else if (items.action == 'nuevo') {
			initialDataNuevo();
		}
	});
