'use strict';
angular.module('softvApp')
	.factory('corporativoFactory', function ($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getDistribuidores: '/DomicilioFiscal/GetDistribuidores',
			getEstados: '/DomicilioFiscal/GetMuestraEstado',
			getCiudades: '/DomicilioFiscal/GetMuestraCiudad',
			getLocalidades: '/DomicilioFiscal/GetMuestraLocalidad',
			getColonias: '/DomicilioFiscal/GetMuestraColonia',
			getCalles: '/DomicilioFiscal/GetMuestraCalle',
			getCortes: '/TiposCortesClientes/GetTiposCortesClientesList',
			getTipoPagos: '/TipoPagosFacturas/GetTipoPagosFacturasList',
			addMaestro: '/ContratoMaestroFac/AddContratoMaestroFac',
			validaContrato: '/ValidaSiContratoExiste_CM/GetValidaSiContratoExiste_CM',
			ligarContratos: '/ContratoMaestroFac/GetAddRelContratoMaestroContrato',
			singleContrato: '/ContratoMaestroFac/GetRelContratos',
			updateContrato: '/ContratoMaestroFac/UpdateContratoMaestroFac',
			UpdateRelContrato: '/ContratoMaestroFac/GetAddUpdate',
			buscarCliente: '/uspBuscaContratoSeparado2/GetBuscaByIdDisList',
			EliminaContratosLigados: '/ContratoMaestroFac/GetEliminaContratosLigados',
			GetObtienePolizasMaestro: '/PolizaMaestro/GetObtienePolizasMaestro',
			EliminaPoliza: '/PolizaMaestro/GetEliminaPoliza',
			GetDetallesPolizaMaestro: '/PolizaMaestro/GetDetallesPolizaMaestro',
			GetGeneraNuevaPolizaMaestro: '/PolizaMaestro/GetGeneraNuevaPolizaMaestro',
			GetPolizaTxt: '/PolizaMaestro/GetPolizaTxt',
			GetObtieneGeneralesPolizaMaestro: '/PolizaMaestro/GetObtieneGeneralesPolizaMaestro',
			//
			GetObtienePolizasMaestroCobros: '/PolizaMaestro/GetObtienePolizasMaestroCobros',
			EliminaPolizaCobros: '/PolizaMaestro/GetEliminaPolizaCobros',
			GetDetallesPolizaMaestroCobros: '/PolizaMaestro/GetDetallesPolizaMaestroCobros',
			GetGeneraNuevaPolizaMaestroCobros: '/PolizaMaestro/GetGeneraNuevaPolizaMaestroCobros',
			GetPolizaTxtCobros: '/PolizaMaestro/GetPolizaTxtCobros',
			GetObtieneGeneralesPolizaMaestroCobros: '/PolizaMaestro/GetObtieneGeneralesPolizaMaestroCobros'
		};

		factory.GetObtieneGeneralesPolizaMaestro = function (Clv_Poliza) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'Clv_Poliza': Clv_Poliza
			};
			$http.post(globalService.getUrl() + paths.GetObtieneGeneralesPolizaMaestro, JSON.stringify(parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.GetObtieneGeneralesPolizaMaestroCobros = function (Clv_Poliza) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'Clv_Poliza': Clv_Poliza
			};
			$http.post(globalService.getUrl() + paths.GetObtieneGeneralesPolizaMaestroCobros, JSON.stringify(parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.updateContrato = function (contrato) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.updateContrato, JSON.stringify(contrato), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};


		factory.singleContrato = function (contrato) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var Parametros = {
				'IdContratoMaestro': contrato

			};
			$http.post(globalService.getUrl() + paths.singleContrato, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.UpdateRelContrato = function (contrato, lista, distribuidor) {
			console.log(contrato);
			console.log(distribuidor);
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var Parametros = {
				'objCM': {
					'IdContratoMaestro': contrato,
					'Distribuidor': distribuidor
				},
				'Contratos': lista

			};

			console.log(Parametros);
			$http.post(globalService.getUrl() + paths.UpdateRelContrato, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.EliminaContratosLigados = function (contrato, lista, distribuidor) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var Parametros = {
				'objCM': {
					'IdContratoMaestro': contrato,
					'Distribuidor': distribuidor
				},
				'Contratos': lista,
				'Usuario': $localStorage.currentUser.usuario
			};

			console.log(Parametros);
			$http.post(globalService.getUrl() + paths.EliminaContratosLigados, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.UpdateRelContratoMultiple = function (contrato, arrContratos, distribuidor) {
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};

			// Mark which request we're currently doing
			var currentRequest = 0;
			// Make this promise based.
			var deferred = $q.defer();
			// Set up a result array
			var results = [];
			
			function makeNextRequest() {
				// Do whatever you need with the array item.
				var Parametros = {
					'objCM': {
						'IdContratoMaestro': contrato,
						'Distribuidor': distribuidor
					},
					'Contratos': arrContratos[currentRequest],
					'Usuario': $localStorage.currentUser.usuario
				};
				$http.post(globalService.getUrl() + paths.UpdateRelContrato, JSON.stringify(Parametros), config)
					.then(function (response) {
						// Save the result.
						results.push(response);
						// Increment progress.
						currentRequest++;
						// Continue if there are more items.
						if (currentRequest < arrContratos.length) {
							makeNextRequest();
						}
						// Resolve the promise otherwise.
						else {
							deferred.resolve(response.data);
						}
					});
				// TODO handle errors appropriately.
			}
			makeNextRequest();
			// return a promise for the completed requests
			return deferred.promise;
		};


		factory.ligarContratos = function (contrato, lista) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var Parametros = {
				'objRep': {
					'IdContratoMaestro': contrato
				},
				'lstRel': lista

			};
			$http.post(globalService.getUrl() + paths.ligarContratos, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.ligarContratosMultiple = function (contrato, arrContratos) {
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};

			// Mark which request we're currently doing
			var currentRequest = 0;
			// Make this promise based.
			var deferred = $q.defer();
			// Set up a result array
			var results = [];
			
			function makeNextRequest() {
				// Do whatever you need with the array item.
				var Parametros = {
					'objRep': {
						'IdContratoMaestro': contrato
					},
					'lstRel': arrContratos[currentRequest],
					'Usuario': $localStorage.currentUser.usuario
				};
				$http.post(globalService.getUrl() + paths.ligarContratos, JSON.stringify(Parametros), config)
					.then(function (response) {
						// Save the result.
						results.push(response);
						// Increment progress.
						currentRequest++;
						// Continue if there are more items.
						if (currentRequest < arrContratos.length) {
							makeNextRequest();
						}
						// Resolve the promise otherwise.
						else {
							deferred.resolve(response.data);
						}
					});
				// TODO handle errors appropriately.
			}
			makeNextRequest();
			// return a promise for the completed requests
			return deferred.promise;
		};

		factory.validaContrato = function (contrato, ContratoMaestro) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var Parametros = {
				'ContratoBueno': contrato,
				'ContratoMaestro': ContratoMaestro
			};
			$http.post(globalService.getUrl() + paths.validaContrato, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.addMaestro = function (contrato) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.addMaestro, JSON.stringify(contrato), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getTipoPagos = function () {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getTipoPagos, config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getCortes = function () {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getCortes, config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getDistribuidores = function () {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getDistribuidores, config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getCalles = function (colonia, localidad) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvColonia': colonia,
				'ClvLocalidad': localidad
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getCalles, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getColonias = function (id) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvLocalidad': id
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getColonias, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};


		factory.getLocalidades = function (id) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvCiudad': id
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getLocalidades, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getCiudades = function (id) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvEstado': id
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getCiudades, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getEstados = function () {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getEstados, config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};


		factory.buscarCliente = function (obje) {
			var deferred = $q.defer();
			var Parametros = {
				'ContratoCom': obje.contrato,
				'Nombre': obje.nombre,
				'Apellido_Paterno': obje.paterno,
				'Apellido_Materno': obje.materno,
				'CALLE': obje.calle,
				'NUMERO': obje.numero,
				'ClvColonia': obje.colonia,
				'SetupBox': obje.setupbox,
				'IdUsuario': $localStorage.currentUser.idUsuario,
				'TipoSer': obje.servicio,
				'Op': obje.op,
				'IdDistribuidor': obje.IdDistribuidor
			};

			console.log(JSON.stringify(Parametros));
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.buscarCliente, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.GetObtienePolizasMaestro = function (obj) {
			var deferred = $q.defer();
			//console.log(JSON.stringify(obj));
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetObtienePolizasMaestro, JSON.stringify(obj), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.EliminaPoliza = function (obj) {
			var deferred = $q.defer();
			//console.log(JSON.stringify(obj));
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.EliminaPoliza, JSON.stringify(obj), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.GetDetallesPolizaMaestro = function (obj) {
			var deferred = $q.defer();
			//console.log(JSON.stringify(obj));
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetDetallesPolizaMaestro, JSON.stringify(obj), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.GetGeneraNuevaPolizaMaestro = function (obj) {
			var deferred = $q.defer();
			//console.log(JSON.stringify(obj));
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetGeneraNuevaPolizaMaestro, JSON.stringify(obj), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.GetPolizaTxt = function (obj) {
			var deferred = $q.defer();
			//console.log(JSON.stringify(obj));
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetPolizaTxt, JSON.stringify(obj), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};



		factory.GetObtienePolizasMaestroCobros = function (obj) {
			var deferred = $q.defer();
			//console.log(JSON.stringify(obj));
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetObtienePolizasMaestroCobros, JSON.stringify(obj), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.EliminaPolizaCobros = function (obj) {
			var deferred = $q.defer();
			//console.log(JSON.stringify(obj));
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.EliminaPolizaCobros, JSON.stringify(obj), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.GetDetallesPolizaMaestroCobros = function (obj) {
			var deferred = $q.defer();
			//console.log(JSON.stringify(obj));
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetDetallesPolizaMaestroCobros, JSON.stringify(obj), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.GetGeneraNuevaPolizaMaestroCobros = function (obj) {
			var deferred = $q.defer();
			//console.log(JSON.stringify(obj));
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetGeneraNuevaPolizaMaestroCobros, JSON.stringify(obj), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.GetPolizaTxtCobros = function (obj) {
			var deferred = $q.defer();
			//console.log(JSON.stringify(obj));
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetPolizaTxtCobros, JSON.stringify(obj), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		return factory;
	});
