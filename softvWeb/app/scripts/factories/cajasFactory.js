'use strict';
angular
	.module('softvApp')
	.factory('cajasFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			buscarContrato: '/BusCliPorContrato_Fac/GetBusCliPorContrato_FacList',
			validarContrato: '/sp_dameContratoCompaniaAdic/Getsp_dameContratoCompaniaAdicList',
			serviciosCliente: '/DameSerDelCliFac/GetDameSerDelCliFacList',
			dameSession: '/DameClv_Session/GetDeepDameClv_Session',
			dameDetallePago: '/DameDetalle/GetDameDetalleList',
			dameSumaPago: '/SumaDetalle/GetSumaDetalleList',
			buscarPorNombre: '/uspBusCliPorContratoSeparado/GetuspBusCliPorContratoSeparadoList',
			dameHistorialServicios: '/BuscaFacturasHistorial/GetBuscaFacturasHistorialList',
			dameInformacionCliente: '/InformacionClientePeriodos/GetInformacionClientePeriodosList',
			dameHistorialOrdenes: '/BuscaOrdenServicio/GetBuscaOrdenServicioList',
			dameHistorialQuejas: '/BuscaQuejasL/GetBuscaQuejasLList',
			dameServiciosCliente: '/MuestraTipSerPrincipal/GetMuestraTipSerPrincipalList',
			dameClabe: '/BotonClabe/GetBotonClabeList',
			dameSuscriptor: '/DameTiposClientes/GetDameTiposClientesList',
			suspencionTemporal: '/SuspencionTemporal/GetSuspencionTemporalList',
			dameAparatosAdeudo: '/MuestraAparatosCobroAdeudo/GetMuestraAparatosCobroAdeudoList',
			quitarDetalle: '/QuitarDetalle/GetQuitarDetalleList',
			addBitacora: '/Bitacora/AddBitacora',
			quitarAntena: '/QuitarAntenaDevolucion/DeleteQuitarAntenaDevolucion',
			cobrarAdeudo: '/CobraAdeudo/AddGrabaDevolucionAparatoL',
			borrarAdeudo: '/QuitarAntenaDevolucion/DeleteBorraCobraAdeudo',
			dameSucursalCompa: '/DameRelSucursalCompa/GetDeepDameRelSucursalCompa',
			dimeSiYaFact: '/DameRelSucursalCompa/GetDeepDimeSiYaGrabeFac',
			sumaTotalDetalle: '/SumaTotalDetalle/GetDeepSumaTotalDetalle',
			dameBancos: '/MuestraBancos/GetMuestraBancosList',
			dameMontoCredito: '/MontoNotaCredito/GetDeepMontoNotaCredito',
			nuevoPago: '/NuevoPago/AddNuevoPago',
			puedoAdelantarPago: '/Adelantar/GetDeepAdelantar',
			checaAdelantarPagos: '/Adelantar/GetDeepChecaAdelantarPagosDif',
			pagoAdelantado: '/PagoAdelantado/GetPagoAdelantadoList',
			grabaPago: '/GrabaFacturas2/GetDeepGrabaFacturas2',
			muestraServicios: '/MuestraServiciosFAC/GetMuestraServiciosFACList',
			consultaCamdo: '/CAMDOFAC/GetCAMDOFAC',
			dameCiudades: '/CiudadCAMDO/GetCiudadCAMDOList',
			dameLocalidades: '/LocalidadCAMDO/GetLocalidadCAMDOList',
			dameColonias: '/ColoniaCAMDO/GetColoniaCAMDOList',
			dameCalles: '/CalleCAMDO/GetCalleCAMDOList',
			addCamdo: '/CAMDOFAC/AddCAMDOFAC',
			addAdicionales: '/AddServicioAdicionales/GetDeepAddServicioAdicionales',
			cancelarDomicilio: '/CAMDOFAC/DeleteCAMDOFAC',
			dameVendedores: '/VendedoresL/GetVendedoresLList',
			ultimoFolio: '/UltimoSerieYFolio/GetUltimoSerieYFolioList',
			folioDisponible: '/FolioDisponible/GetFolioDisponibleList',
			damePeriodoCliente: '/InformacionClientePeriodos/GetPeriodoCliente',
			dameTicket: '/CrearTicketTable/GetCrearTicketTableList',
			dameDatosPago: '/ConceptosTicketPagos/GetConceptosTicketPagosList',
			dameOrdenServicio: '/ConsultaOrsSer/GetUrlOrdSer',
			dameSingleQueja: '/ConsultarQuejasTable/GetConsultarQuejasTableList',
			validaAparatos: '/ValidaPideAparatos/GetValidaPideAparatosList',
			montCantList: '/MotCan/GetMotCanList',
			motivoCancelar: '/QuitarAntenaDevolucion/DeleteBorraCobraAdeudo',
			checarServicios: '/ChecarServiciosCancelados/GetDeepChecarServiciosCancelados',
			cobrarBaja: '/CobraBajasOPrecobraAdeudo/GetDeepCobraBajasOPrecobraAdeudo',
			preCobraAdeudo: '/CobraBajasOPrecobraAdeudo/GetDeepPrecobraAdeudo',
			insertSeguridadToken: '/SeguridadToken/AddSeguridadToken',
			imprimirClabe: '/BotonClabe/GetBotonImprimeClabe',
			preguntaCajas: '/uspHaz_Pregunta/GetDeepuspHaz_Pregunta',
			afirmaPregunta: '/uspHaz_Pregunta/GetDeeAfirmacionPregunta',
			checaRetiro: '/ChecaOrdenRetiro/GetChecaOrdenRetiroList',
			getObservaciones: '/ConRelClienteObs/GetDeepConRelClienteObs'
		};

		factory.validarContrato = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'ContratoCom': contrato,
				'ClvUsuario': $localStorage.currentUser.idUsuario,
				'Modulo': 'facturacion'
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.validarContrato, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.buscarContrato = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Id': 0,
				'ContratoC': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.buscarContrato, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.getObservaciones = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getObservaciones, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.checaRetiro = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.checaRetiro, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.afirmaPregunta = function(contrato, meses, op, session, op2) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato,
				'MesesAdelantados': meses,
				'Op': op,
				'ClvSession': session,
				'Op2': op2
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.afirmaPregunta, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.preguntaCajas = function(contrato, op) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato,
				'Op': op
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.preguntaCajas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.imprimirClabe = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.imprimirClabe, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.serviciosCliente = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.serviciosCliente, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameSession = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameSession, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameDetallePago = function(session) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_Session': session
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameDetallePago, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameSumaPago = function(session) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_Session': session
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameSumaPago, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.buscarPorNombre = function(nombre, paterno, materno) {
			var deferred = $q.defer();
			var Parametros = {
				'ContratoC': '',
				'Nombre': nombre,
				'Apellido_Paterno': paterno,
				'Apellido_Materno': materno,
				'Calle': '',
				'Numero': '',
				'Op': 1,
				'ClvColonia': 0
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.buscarPorNombre, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.buscarPorDireccion = function(calle, numero) {
			var deferred = $q.defer();
			var Parametros = {
				'ContratoC': '',
				'Nombre': '',
				'Apellido_Paterno': '',
				'Apellido_Materno': '',
				'Calle': calle,
				'Numero': numero,
				'Op': 2,
				'ClvColonia': 0
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.buscarPorNombre, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameHistorialServicios = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Id': 1,
				'Serie': '',
				'Folio': 0,
				'Fecha': '01/01/1900',
				'Tipo': 'T',
				'ContratoO': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameHistorialServicios, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameInformacionCliente = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameInformacionCliente, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameHistorialOrdenes = function(contrato, status) {
			var deferred = $q.defer();
			var Parametros = {
				'STATUS': status,
				'ContratoO': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameHistorialOrdenes, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameHistorialQuejas = function(contrato, status, servicio) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_TipSer': servicio,
				'ContratoO': contrato,
				'Status': status
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameHistorialQuejas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameServiciosCliente = function() {
			var deferred = $q.defer();
			var Parametros = {};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameServiciosCliente, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameClabe = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameClabe, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameSuscriptor = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameSuscriptor, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.suspencionTemporal = function(contrato, session) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato,
				'IdSession': session
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.suspencionTemporal, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameAparatosAdeudo = function(contrato, session, detalle) {
			var deferred = $q.defer();
			var Parametros = {
				'IdSession': session,
				'IdDetalle': detalle,
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameAparatosAdeudo, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.quitarDetalle = function(contrato, session, detalle, tipoCliente) {
			var deferred = $q.defer();
			var Parametros = {
				'IdSession': session,
				'ClvDetalle': detalle,
				'IdTipoCli': tipoCliente,
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.quitarDetalle, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.addBitacora = function(contrato, mensaje) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser;
			var Parametros = {
				'objBitacora': {
					'Usuario': user.usuario,
					'Contrato': contrato,
					'Id': 2,
					'Concepto': mensaje
				}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.addBitacora, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.quitarAntena = function(session, servicio) {
			var deferred = $q.defer();
			var Parametros = {
				'IdSession': session,
				'IdTipSer': servicio
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.quitarAntena, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};


		factory.cobrarAdeudo = function(lstDevolucionApa) {
			var deferred = $q.defer();
			var Parametros = {
				'lstCobraAdeudo': {
					'Id': 0
				},
				'lstDevolucionApa': lstDevolucionApa
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.cobrarAdeudo, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.borrarAdeudo = function(session) {
			var deferred = $q.defer();
			var Parametros = {
				'IdSession': session
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.borrarAdeudo, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameSucursalCompa = function(contrato) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser;
			var Parametros = {
				'IdSucursal': user.sucursal,
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameSucursalCompa, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dimeSiYaFact = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dimeSiYaFact, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.sumaTotalDetalle = function(session) {
			var deferred = $q.defer();
			var Parametros = {
				'IdSession': session
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.sumaTotalDetalle, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameBancos = function() {
			var deferred = $q.defer();
			var Parametros = {};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameBancos, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameMontoCredito = function(nota, contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'IdNota': nota,
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameMontoCredito, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.nuevoPago = function(session, efectivo, cambio) {
			var deferred = $q.defer();
			var Parametros = {
				'objNuevoPago': {
					'IdSession': session,
					'Efectivo': efectivo,
					'Cambio': cambio
				}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			console.log(Parametros);
			$http.post(globalService.getUrl() + paths.nuevoPago, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.puedoAdelantarPago = function(session) {
			var deferred = $q.defer();
			var Parametros = {
				'IdSession': session
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.puedoAdelantarPago, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.checaAdelantarPagos = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.checaAdelantarPagos, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.pagoAdelantado = function(session, servicio, llave, unicaNet, clave, meses, tipoCli, contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_Session': session,
				'Clv_Servicio': servicio,
				'Clv_llave': llave,
				'Clv_UnicaNet': unicaNet,
				'Clave': clave,
				'MesesAdelantados': meses,
				'IdTipoCli': tipoCli,
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.pagoAdelantado, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.insertSeguridadToken = function(session) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser;
			var Parametros = {
				'objSeguridadToken': {
					'Token1': $localStorage.currentUser.token1,
					'Token2': $localStorage.currentUser.token,
					'IdUsuario': user.idUsuario,
					'Usuario': user.usuario,
					'IdSucursal': user.sucursal,
					'IpMaquina': user.maquina,
					'ClvSession': session
				}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.insertSeguridadToken, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.grabaPago = function(objpagar) {
			var deferred = $q.defer();
			var user = $localStorage.currentUser;
			var Parametros = {
				'Contrato': objpagar.contrato,
				'Clv_Session': objpagar.clv_session,
				'Cajera': user.usuario,
				'Sucursal': user.sucursal,
				'IpMaquina': user.maquina,
				'Tipo': objpagar.tipo,
				'Serie_V': objpagar.serie_v,
				'Folio_V': objpagar.folio_v,
				'Clv_Vendedor': objpagar.clv_vendedor,
				'Tipo1': 0,
				'Monto1': objpagar.monto1,
				'GLOEFECTIVO2': objpagar.GLOEFECTIVO2,
				'GLOCHEQUE2': objpagar.GLOCHEQUE2,
				'GLOCLV_BANCOCHEQUE2': objpagar.GLOCLV_BANCOCHEQUE2,
				'NUMEROCHEQUE2': objpagar.NUMEROCHEQUE2,
				'GLOTARJETA2': objpagar.GLOTARJETA2,
				'GLOCLV_BANCOTARJETA2': objpagar.GLOCLV_BANCOTARJETA2,
				'NUMEROTARJETA2': objpagar.NUMEROTARJETA2,
				'TARJETAAUTORIZACION2': objpagar.TARJETAAUTORIZACION2,
				'CLV_Nota3': objpagar.CLV_Nota3,
				'GLONOTA3': objpagar.GLONOTA3,
				'Token': $localStorage.currentUser.token,
				'Token1': user.token1

			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.grabaPago, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.muestraServicios = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.muestraServicios, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.consultaCamdo = function(session, contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_Sesion': session,
				'CONTRATO': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.consultaCamdo, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameCiudades = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameCiudades, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameLocalidades = function(contrato, ciudad) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato,
				'Ciudad': ciudad
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameLocalidades, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameColonias = function(contrato, localidad) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato,
				'localidad': localidad
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameColonias, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameCalles = function(contrato, colonia) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato,
				'colonia': colonia
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameCalles, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.addCamdo = function(objdomicilio) {
			var deferred = $q.defer();
			var Parametros = {
				'objCAMDOFAC': {
					'Clv_Sesion': objdomicilio.Clv_Sesion,
					'CONTRATO': objdomicilio.CONTRATO,
					'Clv_Calle': objdomicilio.Clv_Calle,
					'NUMERO': objdomicilio.NUMERO,
					'Num_int': objdomicilio.Num_int,
					'ENTRECALLES': objdomicilio.ENTRECALLES,
					'Clv_Colonia': objdomicilio.Clv_Colonia,
					'Clv_Localidad': objdomicilio.Clv_Localidad,
					'TELEFONO': objdomicilio.TELEFONO,
					'ClvTecnica': objdomicilio.ClvTecnica,
					'Clv_Ciudad': objdomicilio.Clv_Ciudad,
					'Clv_Sector': objdomicilio.Clv_Sector,
				}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.addCamdo, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.addAdicionales = function(session, texto, contrato, tipo) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_Session': session,
				'Clv_Txt': texto,
				'Clv_UnicaNet': contrato,
				'Clave': 0,
				'MesesAdelantados': 1,
				'TvAdic': 0,
				'op': 0,
				'Clv_TipoCliente': tipo,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.addAdicionales, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.cancelarDomicilio = function(session, contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_Sesion': session,
				'CONTRATO': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.cancelarDomicilio, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameVendedores = function() {
			var deferred = $q.defer();
			var user = $localStorage.currentUser;
			var Parametros = {
				'IdUsuario': user.idUsuario,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameVendedores, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.ultimoFolio = function(vendedor) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_Vendedor': vendedor,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.ultimoFolio, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.folioDisponible = function(vendedor, serie) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_Vendedor': vendedor,
				'Serie': serie
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.folioDisponible, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.damePeriodoCliente = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.damePeriodoCliente, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameTicket = function(factura) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_Factura': factura,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameTicket, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameDatosPago = function(factura) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_Factura': factura,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameDatosPago, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameOrdenServicio = function(orden) {
			var deferred = $q.defer();
			var Parametros = {
				'IdOrden': orden,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameOrdenServicio, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dameSingleQueja = function(queja) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_Queja': queja,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dameSingleQueja, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.validaAparatos = function(session, detalle) {
			var deferred = $q.defer();
			var Parametros = {
				'IdSession': session,
				'IdDetalle': detalle,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.validaAparatos, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.montCantList = function() {
			var deferred = $q.defer();
			var Parametros = {};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.montCantList, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.motivoCancelar = function(session) {
			var deferred = $q.defer();
			var Parametros = {
				'IdSession': session
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.motivoCancelar, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.checarServicios = function(contrato, session, motivo, detalle) {
			var deferred = $q.defer();
			var Parametros = {
				'IdSession': session,
				'Contrato': contrato,
				'ClvMotivo': motivo,
				'ClvDetalle': detalle
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.checarServicios, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.cobrarBaja = function(contrato, session, motivo) {
			var deferred = $q.defer();
			var Parametros = {
				'IdSession': session,
				'Contrato': contrato,
				'IdMotCan': motivo,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.cobrarBaja, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.preCobraAdeudo = function(session, detalle, motivo) {
			var deferred = $q.defer();
			var Parametros = {
				'IdSession': session,
				'IdDetalle': detalle,
				'IdMotCan': motivo,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.preCobraAdeudo, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};
		return factory;
	});
