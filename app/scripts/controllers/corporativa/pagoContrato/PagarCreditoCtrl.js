'use strict';
angular.module('softvApp').controller('PagarCreditoCtrl', PagarCreditoCtrl);

function PagarCreditoCtrl($uibModal, $state, $filter, $rootScope, ngNotify, inMenu, ContratoMaestroFactory, $uibModalInstance, x, $localStorage, pagosMaestrosFactory, elem, cajasFactory) {
	
	/// Muestra los medios para pagar una cuenta
	function initialData() {
		vm.monto = elem.PagoInicial;
		pagosMaestrosFactory.getMedios().then(function (data) {
			data.GetObtieneMediosPagoListResult.unshift({
				'Nombre': '----------------',
				'IdMedioPago': 0
			});
			vm.medios = data.GetObtieneMediosPagoListResult;
			vm.selectedMedio = data.GetObtieneMediosPagoListResult[0];
		});
		cajasFactory.dameBancos().then(function (data) {
			data.GetMuestraBancosListResult.unshift({
				'nombre': '----------------',
				'Clave': 0
			});
			vm.bancos = data.GetMuestraBancosListResult;
			vm.selectedBancoTransferencia = data.GetMuestraBancosListResult[0];
			vm.selectedBancoCheque = data.GetMuestraBancosListResult[0];
		});
	}

	/// Realiza los calculos de las cunetas en efectivo
	function cambioEfectivo() {
		console.log('maxmonto', vm.maxmonto);
		console.log('monto', vm.monto);
		console.log('efectivo', vm.efectivo);
		console.log('TotalAbonado', vm.TotalAbonado);

		/* vm.maxmonto = vm.monto * 10;
		if (vm.efectivo > vm.maxmonto) {
			vm.efectivo = vm.maxmonto;
		} */
		vm.cambio = vm.efectivo - vm.monto;
		if (vm.cambio < 0) {
			vm.cambio = 0;
		}
		vm.TotalAbonado = vm.efectivo;
		if (vm.TotalAbonado > vm.monto) {
			vm.TotalAbonado = vm.monto;
		}
		vm.casePago = 1;
		vm.dineroCheque = '';
		vm.numeroCheque = '';
		vm.cuentaTransferencia = '';
		vm.autorizacionTransferencia = '';
		vm.dineroCredito = '';
		vm.dineroTransferencia = '';
		vm.pagoNota = '';
	}

	/// Calcula el cambio en efectivo
	function cambioNota() {
		vm.cambio = '';
		vm.TotalAbonado = '';
		if (vm.dineroNota > vm.monto) {
			vm.dineroNota = vm.monto;
		}
		vm.TotalAbonado = vm.dineroNota;
		if (vm.TotalAbonado > vm.monto) {
			vm.TotalAbonado = vm.monto;
		}
		vm.efectivo = '';
		vm.casePago = 4;
		vm.cuentaTransferencia = '';
		vm.autorizacionTransferencia = '';
		vm.dineroCredito = '';
		vm.pagoNota = '';
		vm.dineroTransferencia = '';
	}

	/// Calcula el cambio en cheque
	function cambioCheque() {
		vm.cambio = '';
		vm.TotalAbonado = '';
		if (vm.dineroCheque > vm.monto) {
			vm.dineroCheque = vm.monto;
		}
		vm.TotalAbonado = vm.dineroCheque;
		if (vm.TotalAbonado > vm.monto) {
			vm.TotalAbonado = vm.monto;
		}
		vm.efectivo = '';
		vm.casePago = 2;
		vm.cuentaTransferencia = '';
		vm.autorizacionTransferencia = '';
		vm.dineroCredito = '';
		vm.pagoNota = '';
		vm.dineroTransferencia = '';
	}

	/// Registra la transferencia para el pago
	function cambioTransferencia() {
		vm.cambio = '';
		vm.TotalAbonado = '';
		if (vm.dineroTransferencia > vm.monto) {
			vm.dineroTransferencia = vm.monto;
		}
		vm.TotalAbonado = vm.dineroTransferencia;
		if (vm.TotalAbonado > vm.monto) {
			vm.TotalAbonado = vm.monto;
		}
		vm.dineroCheque = '';
		vm.numeroCheque = '';
		vm.efectivo = '';
		vm.casePago = 3;
		vm.dineroCredito = '';
		vm.pagoNota = '';
	}

	// function cambioCredito() {
	// 	vm.cuentaTransferencia = '';
	// 	vm.dineroTransferencia = '';
	// 	vm.autorizacionTransferencia = '';
	// 	vm.dineroCheque = '';
	// 	vm.numeroCheque = '';
	// 	vm.efectivo = '';
	// 	vm.casePago = 4;
	// 	cajasFactory.dameMontoCredito(vm.dineroCredito, items.Contrato).then(function (data) {
	// 		vm.pagoNota = data.GetDeepMontoNotaCreditoResult.Monto;
	// 		vm.TotalAbonado = vm.pagoNota;
	// 		if (vm.TotalAbonado > vm.monto) {
	// 			vm.TotalAbonado = vm.monto;
	// 		}
	// 	});
	// }

	// function ok() {
	// 	if (vm.selectedMedio.IdMedioPago == 0) {
	// 		ngNotify.set('Seleccione el medio de pago', 'error');
	// 	} else {
	// 		var objPagar = {
	// 			'Clv_FacturaMaestro': x.Clv_FacturaMaestro,
	// 			'ContratoMaestro': x.ContratoMaestro,
	// 			'Cajera': $localStorage.currentUser.usuario,
	// 			'IpMaquina': $localStorage.currentUser.maquina,
	// 			'Sucursal': $localStorage.currentUser.sucursal,
	// 			'Monto': vm.monto,
	// 			'IdMedioPago': vm.selectedMedio.IdMedioPago,
	// 			'IdCompania': x.IdCompania,
	// 			'IdDistribuidor': x.IdDistribuidor
	// 		};
	// 		pagosMaestrosFactory.actFactura(elem).then(function(dataGraba) {
	// 			pagosMaestrosFactory.pagoGrabaFactura(objPagar).then(function (data) {
	// 				vm.res = data.GetGuardaPagoFacturaMaestroResult;
	// 				if (vm.res[0].Clv_Pago < 1) {
	// 					ngNotify.set('No se grabo la factura', 'error');
	// 				}else {
	// 					$uibModalInstance.dismiss('cancel');
	// 					ngNotify.set('Pago grabado correctamente', 'success');
	// 					$rootScope.$emit('realoadBrowse', {});
	// 				}
	// 			});
	// 		});
	// 	}
	// }


	/// Abre una pestaña con los detalles de la factura
	function muestraFactura(url) {

		vm.animationsEnabled = true;
		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/corporativa/ModalDetalleFactura.html',
			controller: 'ModalDetalleFacturaCtrl',
			controllerAs: '$ctrl',
			backdrop: 'static',
			keyboard: false,
			size: 'lg',
			resolve: {
				url: function () {
					return url;
				}
			}
		});
	}

	/// Registra el pago 
	function ok() {
		if (vm.FechaPago == undefined) {
			vm.FechaPago = new Date();
		}
		if (vm.HoraPago == undefined) {
			vm.HoraPago = '00:00'
		}
		var obj = {
			'ContratoMaestro': x.ContratoMaestro,
			'Credito': elem.Credito,
			'Cajera': $localStorage.currentUser.usuario,
			'IpMaquina': $localStorage.currentUser.maquina,
			'Sucursal': $localStorage.currentUser.sucursal,
			'IdCompania': x.IdCompania,
			'IdDistribuidor': x.IdDistribuidor,
			'ClvSessionPadre': x.Clv_SessionPadre,
			'Tipo': 0,
			'ToKen2': $localStorage.currentUser.token,
			'NoPagos': elem.NoPago,
			'PagoInicial': elem.PagoInicial
		};
		if (vm.casePago == undefined || vm.selectedMedio.IdMedioPago == 0) {
			ngNotify.set('Por favor seleccione el medio de pago y llene un método de pago.', 'error');
		} else {
			switch (vm.casePago) {
				case 1:
					if (x.tipo == 'pagos') {
						pagosMaestrosFactory.generaFactura(obj).then(function (data) {
							vm.r1 = data.GetGrabaFacturaCMaestroResult.ClvFacturaMaestro;
							elem.ClvFacturaMaestro = vm.r1;

							pagosMaestrosFactory.actFactura(elem).then(function (dataAct) {
								if (vm.efectivo >= vm.monto) {
									var objPagar = {
										'Clv_FacturaMaestro': elem.ClvFacturaMaestro,
										'ContratoMaestro': x.ContratoMaestro,
										'Cajera': $localStorage.currentUser.usuario,
										'IpMaquina': $localStorage.currentUser.maquina,
										'Sucursal': $localStorage.currentUser.sucursal,
										'Monto': vm.monto,
										'GLOEFECTIVO2': vm.efectivo,
										'GLOCHEQUE2': 0,
										'GLOCLV_BANCOCHEQUE2': 0,
										'NUMEROCHEQUE2': '',
										'GLOTARJETA2': 0,
										'GLOCLV_BANCOTARJETA2': 0,
										'NUMEROTARJETA2': '',
										'TARJETAAUTORIZACION2': '',
										'CLV_Nota3': 0,
										'GLONOTA3': 0,
										'IdMedioPago': vm.selectedMedio.IdMedioPago,
										'IdCompania': x.IdCompania,
										'IdDistribuidor': x.IdDistribuidor,
										'FechaPago': $filter('date')(vm.FechaPago, 'yyyyMMdd') + ' ' + vm.HoraPago
									};
									pagosMaestrosFactory.grabaFactura(objPagar).then(function (dataGraba) {

										vm.pago = dataGraba.AddGuardaPagoFacturaMaestroResult;
										pagosMaestrosFactory.nuePagoEfectivoPago(vm.pago, vm.efectivo, vm.cambio).then(function (dataNuevo) {
										});
										if (dataGraba.AddGuardaPagoFacturaMaestroResult == 0) {
											ngNotify.set('No se grabo la factura', 'error');
										} else {
											ContratoMaestroFactory.GetGraba_Factura_DigitalPago(vm.pago).then(function (result) {
												var url = result.GetGraba_Factura_DigitalPagoResult.urlReporte;
												muestraFactura(url);
												$uibModalInstance.dismiss('cancel');
												ngNotify.set('Pago grabado correctamente', 'success');
												$state.reload();

											});
											console.log('Pago Credito', 1);
											/*$uibModalInstance.dismiss('cancel');
											ngNotify.set('Pago grabado correctamente', 'success');
											$state.reload();*/
										}
									});
								} else {
									ngNotify.set('No se ha saldado la factura.', 'error');
								}

							});
						});
					} else {
						pagosMaestrosFactory.actFactura(elem).then(function (dataAct) {
							if (vm.efectivo >= vm.monto) {
								var objPagar = {
									'Clv_FacturaMaestro': x.Clv_FacturaMaestro,
									'ContratoMaestro': x.ContratoMaestro,
									'Cajera': $localStorage.currentUser.usuario,
									'IpMaquina': $localStorage.currentUser.maquina,
									'Sucursal': $localStorage.currentUser.sucursal,
									'Monto': vm.monto,
									'GLOEFECTIVO2': vm.efectivo,
									'GLOCHEQUE2': 0,
									'GLOCLV_BANCOCHEQUE2': 0,
									'NUMEROCHEQUE2': '',
									'GLOTARJETA2': 0,
									'GLOCLV_BANCOTARJETA2': 0,
									'NUMEROTARJETA2': '',
									'TARJETAAUTORIZACION2': '',
									'CLV_Nota3': 0,
									'GLONOTA3': 0,
									'IdMedioPago': vm.selectedMedio.IdMedioPago,
									'IdCompania': x.IdCompania,
									'IdDistribuidor': x.IdDistribuidor,
									'FechaPago': $filter('date')(vm.FechaPago, 'yyyyMMdd') + ' ' + vm.HoraPago
								};
								pagosMaestrosFactory.grabaFactura(objPagar).then(function (dataGraba) {
									vm.pago = dataGraba.AddGuardaPagoFacturaMaestroResult;

									pagosMaestrosFactory.nuePagoEfectivoPago(vm.pago, vm.efectivo, vm.cambio).then(function (dataNuevo) {
									});
									if (dataGraba.AddGuardaPagoFacturaMaestroResult == 0) {
										ngNotify.set('No se grabo la factura', 'error');
									} else {
										ContratoMaestroFactory.GetGraba_Factura_DigitalPago(vm.pago).then(function (result) {
											var url = result.GetGraba_Factura_DigitalPagoResult.urlReporte;
											muestraFactura(url);
											$uibModalInstance.dismiss('cancel');
											ngNotify.set('Pago grabado correctamente', 'success');
											$rootScope.$emit('realoadBrowse', {});
										});
										console.log('Pago Credito', 2);
										/*$uibModalInstance.dismiss('cancel');
										ngNotify.set('Pago grabado correctamente', 'success');
										$rootScope.$emit('realoadBrowse', {});*/
									}
								});
							} else {
								ngNotify.set('No se ha saldado la factura.', 'error');
							}

						});
					}
					break;
				case 2:
					if (x.tipo == 'pagos') {
						pagosMaestrosFactory.generaFactura(obj).then(function (data) {
							vm.r1 = data.GetGrabaFacturaCMaestroResult.ClvFacturaMaestro;
							elem.ClvFacturaMaestro = vm.r1;

							pagosMaestrosFactory.actFactura(elem).then(function (dataAct) {
								if (vm.selectedBancoCheque.Clave == 0) {
									ngNotify.set('Selecciona un banco.', 'error');
								//} else if (vm.numeroCheque == "" || vm.numeroCheque == undefined) {
									//ngNotify.set('Digita el número del cheque.', 'error');
								} else {
									if (vm.dineroCheque == vm.monto) {
										var objPagar = {
											'Clv_FacturaMaestro': elem.ClvFacturaMaestro,
											'ContratoMaestro': x.ContratoMaestro,
											'Cajera': $localStorage.currentUser.usuario,
											'IpMaquina': $localStorage.currentUser.maquina,
											'Sucursal': $localStorage.currentUser.sucursal,
											'Monto': vm.monto,
											'GLOEFECTIVO2': 0,
											'GLOCHEQUE2': vm.dineroCheque,
											'GLOCLV_BANCOCHEQUE2': vm.selectedBancoCheque.Clave,
											'NUMEROCHEQUE2': vm.numeroCheque == undefined ? '' : vm.numeroCheque,
											'GLOTARJETA2': 0,
											'GLOCLV_BANCOTARJETA2': 0,
											'NUMEROTARJETA2': '',
											'TARJETAAUTORIZACION2': '',
											'CLV_Nota3': 0,
											'GLONOTA3': 0,
											'IdMedioPago': vm.selectedMedio.IdMedioPago,
											'IdCompania': x.IdCompania,
											'IdDistribuidor': x.IdDistribuidor,
											'FechaPago': $filter('date')(vm.FechaPago, 'yyyyMMdd') + ' ' + vm.HoraPago
										};
										pagosMaestrosFactory.grabaFactura(objPagar).then(function (dataGraba) {
											vm.pago = dataGraba.AddGuardaPagoFacturaMaestroResult;

											if (dataGraba.AddGuardaPagoFacturaMaestroResult == 0) {
												ngNotify.set('No se grabo la factura', 'error');
											} else {
												ContratoMaestroFactory.GetGraba_Factura_DigitalPago(vm.pago).then(function (result) {
													var url = result.GetGraba_Factura_DigitalPagoResult.urlReporte;
													muestraFactura(url);
													$uibModalInstance.dismiss('cancel');
													ngNotify.set('Pago grabado correctamente', 'success');
													$state.reload();
												});
												console.log('Pago Credito', 3);
												/*$uibModalInstance.dismiss('cancel');
												ngNotify.set('Pago grabado correctamente', 'success');
												$state.reload();*/
											}
										});
									} else {
										ngNotify.set('No se ha saldado la factura', 'error');
									}
								}
							});
						});
					} else {
						pagosMaestrosFactory.actFactura(elem).then(function (dataAct) {
							if (vm.selectedBancoCheque.Clave == 0) {
								ngNotify.set('Selecciona un banco.', 'error');
							//} else if (vm.numeroCheque == "" || vm.numeroCheque == undefined) {
								//ngNotify.set('Digita el número del cheque.', 'error');
							} else {
								if (vm.dineroCheque == vm.monto) {
									var objPagar = {
										'Clv_FacturaMaestro': x.Clv_FacturaMaestro,
										'ContratoMaestro': x.ContratoMaestro,
										'Cajera': $localStorage.currentUser.usuario,
										'IpMaquina': $localStorage.currentUser.maquina,
										'Sucursal': $localStorage.currentUser.sucursal,
										'Monto': vm.monto,
										'GLOEFECTIVO2': 0,
										'GLOCHEQUE2': vm.dineroCheque,
										'GLOCLV_BANCOCHEQUE2': vm.selectedBancoCheque.Clave,
										'NUMEROCHEQUE2': vm.numeroCheque == undefined ? '' : vm.numeroCheque,
										'GLOTARJETA2': 0,
										'GLOCLV_BANCOTARJETA2': 0,
										'NUMEROTARJETA2': '',
										'TARJETAAUTORIZACION2': '',
										'CLV_Nota3': 0,
										'GLONOTA3': 0,
										'IdMedioPago': vm.selectedMedio.IdMedioPago,
										'IdCompania': x.IdCompania,
										'IdDistribuidor': x.IdDistribuidor,
										'FechaPago': $filter('date')(vm.FechaPago, 'yyyyMMdd') + ' ' + vm.HoraPago
									};
									pagosMaestrosFactory.grabaFactura(objPagar).then(function (dataGraba) {

										vm.pago = dataGraba.AddGuardaPagoFacturaMaestroResult;
										if (dataGraba.AddGuardaPagoFacturaMaestroResult == 0) {
											ngNotify.set('No se grabo la factura', 'error');
										} else {
											ContratoMaestroFactory.GetGraba_Factura_DigitalPago(vm.pago).then(function (result) {
												var url = result.GetGraba_Factura_DigitalPagoResult.urlReporte;
												muestraFactura(url);
												$uibModalInstance.dismiss('cancel');
												ngNotify.set('Pago grabado correctamente', 'success');
												$rootScope.$emit('realoadBrowse', {});
											});
											console.log('Pago Credito', 4);
											/*$uibModalInstance.dismiss('cancel');
											ngNotify.set('Pago grabado correctamente', 'success');
											$rootScope.$emit('realoadBrowse', {});*/
										}
									});
								} else {
									ngNotify.set('No se ha saldado la factura', 'error');
								}
							}
						});
					}
					break;
				case 3:
					if (x.tipo == 'pagos') {
						pagosMaestrosFactory.generaFactura(obj).then(function (data) {
							vm.r1 = data.GetGrabaFacturaCMaestroResult.ClvFacturaMaestro;
							elem.ClvFacturaMaestro = vm.r1;

							pagosMaestrosFactory.actFactura(elem).then(function (dataAct) {
								if (vm.selectedBancoTransferencia.Clave == 0) {
									ngNotify.set('Selecciona un banco', 'error');
								} else if (vm.cuentaTransferencia == "" || vm.cuentaTransferencia == undefined) {
									ngNotify.set('Digita el número de cuenta por favor.', 'error');
								} else if (vm.autorizacionTransferencia == "" || vm.autorizacionTransferencia == undefined) {
									ngNotify.set('Digita el número de autorizacion.', 'error');
								} else {
									if (vm.dineroTransferencia == vm.monto) {
										var objPagar = {
											'Clv_FacturaMaestro': elem.ClvFacturaMaestro,
											'ContratoMaestro': x.ContratoMaestro,
											'Cajera': $localStorage.currentUser.usuario,
											'IpMaquina': $localStorage.currentUser.maquina,
											'Sucursal': $localStorage.currentUser.sucursal,
											'Monto': vm.monto,
											'GLOEFECTIVO2': 0,
											'GLOCHEQUE2': 0,
											'GLOCLV_BANCOCHEQUE2': 0,
											'NUMEROCHEQUE2': '',
											'GLOTARJETA2': vm.dineroTransferencia,
											'GLOCLV_BANCOTARJETA2': vm.selectedBancoTransferencia.Clave,
											'NUMEROTARJETA2': vm.cuentaTransferencia,
											'TARJETAAUTORIZACION2': vm.autorizacionTransferencia,
											'CLV_Nota3': 0,
											'GLONOTA3': 0,
											'IdMedioPago': vm.selectedMedio.IdMedioPago,
											'IdCompania': x.IdCompania,
											'IdDistribuidor': x.IdDistribuidor,
											'FechaPago': $filter('date')(vm.FechaPago, 'yyyyMMdd') + ' ' + vm.HoraPago
										};
										pagosMaestrosFactory.grabaFactura(objPagar).then(function (dataGraba) {
											console.log(dataGraba, 'dataGraba c 5');
											vm.pago = dataGraba.AddGuardaPagoFacturaMaestroResult;
											if (dataGraba.AddGuardaPagoFacturaMaestroResult == 0) {
												ngNotify.set('No se grabo la factura', 'error');
											} else {
												ContratoMaestroFactory.GetGraba_Factura_DigitalPago(vm.pago).then(function (result) {
													var url = result.GetGraba_Factura_DigitalPagoResult.urlReporte;
													muestraFactura(url);
													$uibModalInstance.dismiss('cancel');
													ngNotify.set('Pago grabado correctamente', 'success');
													$state.reload();
												});
												console.log('Pago Credito', 5);
												/*$uibModalInstance.dismiss('cancel');
												ngNotify.set('Pago grabado correctamente', 'success');
												$state.reload();*/
											}
										});
									} else {
										ngNotify.set('No se ha saldado la factura', 'error');
									}
								}
							});
						});
					}
					else {
						pagosMaestrosFactory.actFactura(elem).then(function (dataAct) {
							if (vm.selectedBancoTransferencia.Clave == 0) {
								ngNotify.set('Selecciona un banco', 'error');
							} else if (vm.cuentaTransferencia == "" || vm.cuentaTransferencia == undefined) {
								ngNotify.set('Digita el número de cuenta por favor.', 'error');
							} else if (vm.autorizacionTransferencia == "" || vm.autorizacionTransferencia == undefined) {
								ngNotify.set('Digita el número de autorizacion.', 'error');
							} else {
								if (vm.dineroTransferencia == vm.monto) {
									var objPagar = {
										'Clv_FacturaMaestro': x.Clv_FacturaMaestro,
										'ContratoMaestro': x.ContratoMaestro,
										'Cajera': $localStorage.currentUser.usuario,
										'IpMaquina': $localStorage.currentUser.maquina,
										'Sucursal': $localStorage.currentUser.sucursal,
										'Monto': vm.monto,
										'GLOEFECTIVO2': 0,
										'GLOCHEQUE2': 0,
										'GLOCLV_BANCOCHEQUE2': 0,
										'NUMEROCHEQUE2': '',
										'GLOTARJETA2': vm.dineroTransferencia,
										'GLOCLV_BANCOTARJETA2': vm.selectedBancoTransferencia.Clave,
										'NUMEROTARJETA2': vm.cuentaTransferencia,
										'TARJETAAUTORIZACION2': vm.autorizacionTransferencia,
										'CLV_Nota3': 0,
										'GLONOTA3': 0,
										'IdMedioPago': vm.selectedMedio.IdMedioPago,
										'IdCompania': x.IdCompania,
										'IdDistribuidor': x.IdDistribuidor,
										'FechaPago': $filter('date')(vm.FechaPago, 'yyyyMMdd') + ' ' + vm.HoraPago
									};
									pagosMaestrosFactory.grabaFactura(objPagar).then(function (dataGraba) {
										console.log(dataGraba, 'dataGraba c 6');
										vm.pago = dataGraba.AddGuardaPagoFacturaMaestroResult;
										if (dataGraba.AddGuardaPagoFacturaMaestroResult == 0) {
											ngNotify.set('No se grabo la factura', 'error');
										} else {
											ContratoMaestroFactory.GetGraba_Factura_DigitalPago(vm.pago).then(function (result) {
												var url = result.GetGraba_Factura_DigitalPagoResult.urlReporte;
												muestraFactura(url);
												$uibModalInstance.dismiss('cancel');
												ngNotify.set('Pago grabado correctamente', 'success');
												$rootScope.$emit('realoadBrowse', {});
											});
											console.log('Pago Credito', 6);
											/*$uibModalInstance.dismiss('cancel');
											ngNotify.set('Pago grabado correctamente', 'success');
											$rootScope.$emit('realoadBrowse', {});*/
										}
									});
								} else {
									ngNotify.set('No se ha saldado la factura', 'error');
								}
							}
						});
					}
					break;
				case 4:
					if (x.tipo == 'pagos') {
						pagosMaestrosFactory.generaFactura(obj).then(function (data) {
							vm.r1 = data.GetGrabaFacturaCMaestroResult.ClvFacturaMaestro;
							elem.ClvFacturaMaestro = vm.r1;

							pagosMaestrosFactory.actFactura(elem).then(function (dataAct) {
								if (vm.selectedBancoTransferencia.Clave == 0) {
									ngNotify.set('Selecciona un banco', 'error');
								} else if (vm.cuentaTransferencia == "" || vm.cuentaTransferencia == undefined) {
									ngNotify.set('Digita el número de cuenta por favor.', 'error');
								} else if (vm.autorizacionTransferencia == "" || vm.autorizacionTransferencia == undefined) {
									ngNotify.set('Digita el número de autorizacion.', 'error');
								} else {
									if (vm.dineroTransferencia == vm.monto) {
										var objPagar = {
											'Clv_FacturaMaestro': elem.ClvFacturaMaestro,
											'ContratoMaestro': x.ContratoMaestro,
											'Cajera': $localStorage.currentUser.usuario,
											'IpMaquina': $localStorage.currentUser.maquina,
											'Sucursal': $localStorage.currentUser.sucursal,
											'Monto': vm.monto,
											'GLOEFECTIVO2': 0,
											'GLOCHEQUE2': 0,
											'GLOCLV_BANCOCHEQUE2': 0,
											'NUMEROCHEQUE2': '',
											'GLOTARJETA2': vm.dineroTransferencia,
											'GLOCLV_BANCOTARJETA2': vm.selectedBancoTransferencia.Clave,
											'NUMEROTARJETA2': vm.cuentaTransferencia,
											'TARJETAAUTORIZACION2': vm.autorizacionTransferencia,
											'CLV_Nota3': 0,
											'GLONOTA3': 0,
											'IdMedioPago': vm.selectedMedio.IdMedioPago,
											'IdCompania': x.IdCompania,
											'IdDistribuidor': x.IdDistribuidor,
											'FechaPago': $filter('date')(vm.FechaPago, 'yyyyMMdd') + ' ' + vm.HoraPago
										};
										pagosMaestrosFactory.grabaFactura(objPagar).then(function (dataGraba) {
											console.log(dataGraba, 'dataGraba c 5');
											vm.pago = dataGraba.AddGuardaPagoFacturaMaestroResult;
											if (dataGraba.AddGuardaPagoFacturaMaestroResult == 0) {
												ngNotify.set('No se grabo la factura', 'error');
											} else {
												ContratoMaestroFactory.GetGraba_Factura_DigitalPago(vm.pago).then(function (result) {
													var url = result.GetGraba_Factura_DigitalPagoResult.urlReporte;
													muestraFactura(url);
													$uibModalInstance.dismiss('cancel');
													ngNotify.set('Pago grabado correctamente', 'success');
													$state.reload();
												});
												console.log('Pago Credito', 7);
												/*$uibModalInstance.dismiss('cancel');
												ngNotify.set('Pago grabado correctamente', 'success');
												$state.reload();*/
											}
										});
									} else {
										ngNotify.set('No se ha saldado la factura', 'error');
									}
								}
							});
						});
					}
					else {
						pagosMaestrosFactory.actFactura(elem).then(function (dataAct) {
							if (vm.selectedBancoTransferencia.Clave == 0) {
								ngNotify.set('Selecciona un banco', 'error');
							} else if (vm.cuentaTransferencia == "" || vm.cuentaTransferencia == undefined) {
								ngNotify.set('Digita el número de cuenta por favor.', 'error');
							} else if (vm.autorizacionTransferencia == "" || vm.autorizacionTransferencia == undefined) {
								ngNotify.set('Digita el número de autorizacion.', 'error');
							} else {
								if (vm.dineroTransferencia == vm.monto) {
									var objPagar = {
										'Clv_FacturaMaestro': x.Clv_FacturaMaestro,
										'ContratoMaestro': x.ContratoMaestro,
										'Cajera': $localStorage.currentUser.usuario,
										'IpMaquina': $localStorage.currentUser.maquina,
										'Sucursal': $localStorage.currentUser.sucursal,
										'Monto': vm.monto,
										'GLOEFECTIVO2': 0,
										'GLOCHEQUE2': 0,
										'GLOCLV_BANCOCHEQUE2': 0,
										'NUMEROCHEQUE2': '',
										'GLOTARJETA2': vm.dineroTransferencia,
										'GLOCLV_BANCOTARJETA2': vm.selectedBancoTransferencia.Clave,
										'NUMEROTARJETA2': vm.cuentaTransferencia,
										'TARJETAAUTORIZACION2': vm.autorizacionTransferencia,
										'CLV_Nota3': 0,
										'GLONOTA3': 0,
										'IdMedioPago': vm.selectedMedio.IdMedioPago,
										'IdCompania': x.IdCompania,
										'IdDistribuidor': x.IdDistribuidor,
										'FechaPago': $filter('date')(vm.FechaPago, 'yyyyMMdd') + ' ' + vm.HoraPago
									};
									pagosMaestrosFactory.grabaFactura(objPagar).then(function (dataGraba) {
										console.log(dataGraba, 'dataGraba c 6');
										vm.pago = dataGraba.AddGuardaPagoFacturaMaestroResult;
										if (dataGraba.AddGuardaPagoFacturaMaestroResult == 0) {
											ngNotify.set('No se grabo la factura', 'error');
										} else {
											ContratoMaestroFactory.GetGraba_Factura_DigitalPago(vm.pago).then(function (result) {
												var url = result.GetGraba_Factura_DigitalPagoResult.urlReporte;
												muestraFactura(url);
												$uibModalInstance.dismiss('cancel');
												ngNotify.set('Pago grabado correctamente', 'success');
												$rootScope.$emit('realoadBrowse', {});
											});
											console.log('Pago Credito', 8);
											/*$uibModalInstance.dismiss('cancel');
											ngNotify.set('Pago grabado correctamente', 'success');
											$rootScope.$emit('realoadBrowse', {});*/
										}
									});
								} else {
									ngNotify.set('No se ha saldado la factura', 'error');
								}
							}
						});
					}
					break;
				default:

			}
		}
	}

	/// Cancel ael pago
	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	/// No se usa
	function ValidarNotaCredito() {

	}

	var vm = this;

	vm.cancel = cancel;
	vm.cambioEfectivo = cambioEfectivo;
	vm.cambioCheque = cambioCheque;
	vm.cambioTransferencia = cambioTransferencia;
	vm.ok = ok;
	vm.cambioNota = cambioNota;
	vm.ValidarNotaCredito = ValidarNotaCredito;
	initialData();
	vm.Monedas = [{
		IdMoneda: 'MXN',
		Moneda: 'MXN'
	}, {
		IdMoneda: 'USD',
		Moneda: 'USD'
	}];
}