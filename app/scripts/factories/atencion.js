'use strict';
angular
	.module('softvApp')
	.factory('atencionFactory', function($http, $q, globalService, $localStorage) {
		var paths = {
			plazas: '/Muestra_Compania_RelUsuario/GetMuestra_Compania_RelUsuarioList',
			servicios: '/MuestraTipSerPrincipal/GetMuestraTipSerPrincipalList',
			usuarios: '/MUESTRAUSUARIOS/GetMUESTRAUSUARIOSList'
		};
		var factory = {};

		factory.getPlazas = function() {
			var deferred = $q.defer();
			var user = $localStorage.currentUser.idUsuario;
			var Parametros = {
				'ClvUsuario': user,
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.plazas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getServicios = function() {
			var deferred = $q.defer();
			var Parametros = {};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.servicios, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getUsuarios = function() {
			var deferred = $q.defer();
			var Parametros = {
				'OP': 2
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.usuarios, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		return factory;
	});
