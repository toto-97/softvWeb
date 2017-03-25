'use strict';
angular
	.module('softvApp')
	.factory('pagosMaestrosFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			cobraSaldoMaestro: '/CobraSaldoContratoMaestro/GetDeepCobraSaldoContratoMaestro',
			obtenEdoCuenta: '/ObtieneEdoCuentaSinSaldar/GetObtieneEdoCuentaSinSaldarList'
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
		
		return factory;
	});
