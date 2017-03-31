'use strict';
angular
	.module('softvApp')
	.factory('pagosMaestrosFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			cobraSaldoMaestro: '/CobraSaldoContratoMaestro/GetDeepCobraSaldoContratoMaestro',
			obtenEdoCuenta: '/ObtieneEdoCuentaSinSaldar/GetObtieneEdoCuentaSinSaldarList',
			grabaFactura: '/GrabaFacturaCMaestro/GetGrabaFacturaCMaestro',
			dimeSiYaGrabeFacMaestro: '/DimeSiYaGrabeUnaFacMaestro/GetDimeSiYaGrabeUnaFacMaestro',
			nuevoPagoEfectivo: '/NuevoPago/AddNuevoPago_FacMaestro',
			pagoGrabaFactura: '/GuardaPagoFacturaMaestro/AddGuardaPagoFacturaMaestro'
		};

		factory.cobraSaldoMaestro = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				"Contrato":contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.cobraSaldoMaestro, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.obtenEdoCuenta = function(contrato,clave) {
			var deferred = $q.defer();
			var Parametros = {
				"Contrato":contrato,
				"ClvSession":clave
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.obtenEdoCuenta, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.grabaFactura = function(objPagar) {
			var deferred = $q.defer();
			var Parametros = {
				"ContratoMaestro": objPagar.contrato,
				"Credito": objPagar.credito,
				"Cajera": objPagar.cajera, 
				"IpMaquina": objPagar.maquina,
				"Sucursal": objPagar.sucursal,
				"IdCompania": objPagar.compania,
				"IdDistribuidor": objPagar.distribuidor,
				"ClvSessionPadre": objPagar.sessionPadre,
				"Tipo": objPagar.tipo,
				"Monto": objPagar.monto,
				"GLOEFECTIVO2": objPagar.GLOEFECTIVO2,
				"GLOCHEQUE2": objPagar.GLOCHEQUE2,
				"GLOCLV_BANCOCHEQUE2": objPagar.GLOCLV_BANCOCHEQUE2,
				"NUMEROCHEQUE2": objPagar.NUMEROCHEQUE2,
				"GLOTARJETA2": objPagar.GLOTARJETA2,
				"GLOCLV_BANCOTARJETA2": objPagar.GLOCLV_BANCOTARJETA2,
				"NUMEROTARJETA2": objPagar.NUMEROTARJETA2,
				"TARJETAAUTORIZACION2": objPagar.TARJETAAUTORIZACION2,
				"CLV_Nota2": objPagar.CLV_Nota2,
				"GLONOTA3": objPagar.GLONOTA3,
				"ToKen2": objPagar.token,
				'NoPagos' : objPagar.NoPagos,
  				'PagoInicial': objPagar.PagoInicial

			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.grabaFactura, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.dimeSiYaGrabeFacMaestro = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				"ContratoMae": contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.dimeSiYaGrabeFacMaestro, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.nuevoPagoEfectivo = function(session,efectivo,cambio) {
			var deferred = $q.defer();
			var Parametros = {
				"objNuevoPago_FacMaestro": {
						"IdSession": session,
						"Efectivo": efectivo,
						"Cambio": cambio
					}
				};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.nuevoPagoEfectivo, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		factory.pagoGrabaFactura = function(objPagar) {
			var deferred = $q.defer();
			var Parametros = {
				"objGuardaPagoFacturaMaestro":
				{
					"Clv_FacturaMaestro": objPagar.Clv_FacturaMaestro,
					"ContratoMaestro": objPagar.ContratoMaestro,
					"Cajera": objPagar.Cajera,
					"IpMaquina": objPagar.IpMaquina,
					"Sucursal": objPagar.Sucursal,
					"Monto": objPagar.Monto,
					"GLOEFECTIVO2": objPagar.GLOEFECTIVO2,
					"GLOCHEQUE2": objPagar.GLOCHEQUE2,
					"GLOCLV_BANCOCHEQUE2": objPagar.GLOCLV_BANCOCHEQUE2,
					"NUMEROCHEQUE2": objPagar.NUMEROCHEQUE2,
					"GLOTARJETA2": objPagar.GLOTARJETA2,
					"GLOCLV_BANCOTARJETA2": objPagar.GLOCLV_BANCOTARJETA2,
					"NUMEROTARJETA2": objPagar.NUMEROTARJETA2,
					"TARJETAAUTORIZACION2": objPagar.TARJETAAUTORIZACION2,
					"CLV_Nota3": objPagar.CLV_Nota3,
					"GLONOTA3": objPagar.GLONOTA3,
					"IdCompania": objPagar.IdCompania,
					"IdDistribuidor": objPagar.IdDistribuidor
				}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.pagoGrabaFactura, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};
		
		return factory;
	});
