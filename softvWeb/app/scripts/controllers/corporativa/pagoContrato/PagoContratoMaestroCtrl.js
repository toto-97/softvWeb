'use strict';
angular.module('softvApp').controller('PagoContratoMaestroCtrl', PagoContratoMaestroCtrl);

function PagoContratoMaestroCtrl($uibModal, $state, $rootScope, cajasFactory, ngNotify, inMenu, pagosMaestrosFactory) {

    function buscarPorContrato(contratoForm) {
        PNotify.removeAll();
        vm.selectAparato = '';
        vm.mostrarSuspencion = false;
        reset();
        var contrato = vm.data.contrato;
        cajasFactory.validarContrato(vm.data.contrato).then(function(datacontrato) {
            if (datacontrato.Getsp_dameContratoCompaniaAdicListResult[0].Contrato > 0) {
                cajasFactory.buscarContrato(contrato).then(function(data) {
                    if (data.GetBusCliPorContrato_FacListResult.length > 0) {
                        $('.buscarContrato').collapse('hide');
                        vm.Cliente = data.GetBusCliPorContrato_FacListResult[0];
                        cajasFactory.dameSession(vm.Cliente.Contrato).then(function(session) {
                            vm.session = session.GetDeepDameClv_SessionResult.IdSession;
                            // cajasFactory.preguntaCajas(vm.Cliente.Contrato, 0).then(function(op1) {
                            //     if (op1.GetDeepuspHaz_PreguntaResult.Pregunta != null) {
                            //         abrirModalPregunta(0, op1.GetDeepuspHaz_PreguntaResult.Pregunta, op1.GetDeepuspHaz_PreguntaResult.MesesAdelantados);
                            //     }
                            // });
                            // cajasFactory.preguntaCajas(vm.Cliente.Contrato, 2).then(function(op1) {
                            //     if (op1.GetDeepuspHaz_PreguntaResult.Pregunta != null) {
                            //         abrirModalPregunta(2, op1.GetDeepuspHaz_PreguntaResult.Pregunta, op1.GetDeepuspHaz_PreguntaResult.MesesAdelantados);
                            //     }
                            // });
                            // cajasFactory.preguntaCajas(vm.Cliente.Contrato, 3).then(function(op1) {
                            //     if (op1.GetDeepuspHaz_PreguntaResult.Pregunta != null) {
                            //         abrirModalPregunta(3, op1.GetDeepuspHaz_PreguntaResult.Pregunta, op1.GetDeepuspHaz_PreguntaResult.MesesAdelantados);
                            //     }
                            // });
                            // cajasFactory.preguntaCajas(vm.Cliente.Contrato, 900).then(function(op1) {
                            //     if (op1.GetDeepuspHaz_PreguntaResult.Pregunta != null) {
                            //         abrirModalPregunta(900, op1.GetDeepuspHaz_PreguntaResult.Pregunta, op1.GetDeepuspHaz_PreguntaResult.MesesAdelantados);
                            //     }
                            // });
                            // cajasFactory.getObservaciones(vm.Cliente.Contrato).then(function(observa) {
                            //     if (observa.GetDeepConRelClienteObsResult.Obs) {
                            //         new PNotify({
                            //             title: 'Observaciones',
                            //             type: 'info',
                            //             text: observa.GetDeepConRelClienteObsResult.Obs,
                            //             hide: false
                            //         });
                            //     }
                            // });
                            if (session.GetDeepDameClv_SessionResult.Error == 0) {
                                reloadTables();
                                vm.mostrarSuspencion = false;
                                vm.color = '#ffffff'
                                vm.colorServicios = '#E2EBEA';
                            } else {
                                reloadTables();
                                vm.mostrarSuspencion = true;
                                vm.color = '#D6D9D9';
                                vm.colorServicios = '#B8BABA';
                                ngNotify.set(session.GetDeepDameClv_SessionResult.Msg, {
                                    type: 'warn',
                                    sticky: true
                                });
                            }
                        });
                        cajasFactory.checaRetiro(vm.Cliente.Contrato).then(function(retiro) {
                            if (retiro.GetChecaOrdenRetiroListResult[0].Resultado > 0) {
                                new PNotify({
                                    title: 'Aviso',
                                    text: retiro.GetChecaOrdenRetiroListResult[0].Msg,
                                    hide: false
                                });
                            }
                        });
                        // cajasFactory.serviciosCliente(vm.Cliente.Contrato).then(function(servicios) {
                        //     vm.servicios = servicios.GetDameSerDelCliFacListResult;
                        // });
                        cajasFactory.dameSuscriptor(vm.Cliente.Contrato).then(function(suscriptor) {
                            vm.Suscriptor = suscriptor.GetDameTiposClientesListResult[0];
                        });
                        cajasFactory.damePeriodoCliente(vm.Cliente.Contrato).then(function(dataPeriodo) {
                            vm.periodo = dataPeriodo.GetPeriodoClienteResult[0].Periodo;
                            if (dataPeriodo.GetPeriodoClienteResult[0].Resultado == 0) {
                                vm.showFiscales = false;
                            } else {
                                vm.showFiscales = true;
                            }
                        });
                        vm.muestraCliente = true;
						pagosMaestrosFactory.cobraSaldoMaestro(vm.Cliente.Contrato).then(function(data) {
                            vm.saldo = data.GetDeepCobraSaldoContratoMaestroResult;
							cajasFactory.obtenEdoCuenta(vm.Cliente.Contrato,vm.saldo.ClvSession).then(function(data) {
	                            vm.edoCuenta = data.GetObtieneEdoCuentaSinSaldarListResult;
							});
                        });
                    }
                });
            } else {
                ngNotify.set('El usuario no tiene permisos para ver a este cliente ó el contrato no existe.', 'error');
                reset();
            }
        });
        resetBusquedas();
        $('.datosCliente').collapse('show');
        $('.conceptosCliente').collapse('show');
    }

	function reloadTables() {
		cajasFactory.dameDetallePago(vm.saldo.ClvSession).then(function(detallePago) {
			if (detallePago.GetDameDetalleListResult.length == 0) {
				vm.blockBaja = true;
				vm.blockPagar = true;
			} else {
				vm.blockBaja = false;
				vm.blockPagar = false;
			}
			vm.detallePago = detallePago.GetDameDetalleListResult;
			vm.detallePagoAux = vm.detallePago;
		});
		cajasFactory.dameSumaPago(vm.saldo.ClvSession).then(function(sumaPago) {
			vm.sumaPagos = sumaPago.GetSumaDetalleListResult;
		});
	}

    function reset() {
        vm.Cliente = '';
        vm.showConceptos = false;
        vm.showDatosCliente = false;
        vm.muestraCliente = false;
        vm.muestraClientesTable = false;
    }

    function resetBusquedas() {
        vm.data.contrato = '';
        vm.data.calle = '';
        vm.data.numero = '';
        vm.data.nombre = '';
        vm.data.apaterno = '';
        vm.data.amaterno = '';
    }

    function abrirPago() {
        pagosMaestrosFactory.dimeSiYaGrabeFacMaestro(vm.Cliente.Contrato).then(function(data) {
            if (data.GetDimeSiYaGrabeUnaFacMaestroResult == 0) {
                cajasFactory.sumaTotalDetalle(vm.saldo.ClvSession).then(function(data) {
                    var items = {
                        Contrato: vm.Cliente.Contrato,
                        Compania: vm.saldo.IdCompania,
                        Distribuidor: vm.saldo.IdDistribuidor,
                        Session: vm.saldo.ClvSession,
                        SessionPadre: vm.saldo.ClvSessionPadre,
                        Monto: data.GetDeepSumaTotalDetalleResult.Monto
                    };
                    vm.animationsEnabled = true;
                    var modalInstance = $uibModal.open({
                        animation: vm.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'views/corporativa/abrirPago.html',
                        controller: 'AbrirPagoCtrl',
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
                });
            } else {
                cajasFactory.sumaTotalDetalle(vm.saldo.ClvSession).then(function(data) {
                    var items = {
                        Contrato: vm.Cliente.Contrato,
                        Compania: vm.saldo.IdCompania,
                        Distribuidor: vm.saldo.IdDistribuidor,
                        Session: vm.saldo.ClvSession,
                        SessionPadre: vm.saldo.ClvSessionPadre,
                        Monto: data.GetDeepSumaTotalDetalleResult.Monto
                    };
                    vm.animationsEnabled = true;
                    var modalInstance = $uibModal.open({
                        animation: vm.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'views/corporativa/yaPago.html',
                        controller: 'YaPagoCtrl',
                        controllerAs: '$ctrl',
                        backdrop: 'static',
                        keyboard: false,
                        size: 'md',
                        resolve: {
                            items: function() {
                                return items;
                            }
                        }
                    });
                });
            }
        });
    }


    var vm = this;
    vm.buscarPorContrato = buscarPorContrato
    vm.abrirPago = abrirPago;
}
