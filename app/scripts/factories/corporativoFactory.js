'use strict';
angular.module('softvApp')
	.factory('corporativoFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getDistribuidores: '/DomicilioFiscal/GetDistribuidores',
			getEstados: '/DomicilioFiscal/GetMuestraEstado',
			getCiudades: '/DomicilioFiscal/GetMuestraCiudad',
			getLocalidades: '/DomicilioFiscal/GetMuestraLocalidad',
			getColonias: '/DomicilioFiscal/GetMuestraColonia',
			getCalles: '/DomicilioFiscal/GetMuestraCalle'
		};


		factory.getDistribuidores = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getDistribuidores, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getCalles = function(colonia, localidad) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvColonia': colonia,
				'ClvLocalidad': localidad
			}
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getCalles, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getColonias = function(id) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvLocalidad': id
			}
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getColonias, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};


		factory.getLocalidades = function(id) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvCiudad': id
			}
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getLocalidades, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getCiudades = function(id) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvEstado': id
			}
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getCiudades, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getEstados = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getEstados, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		return factory;
	});
