'use strict';
angular
	.module('softvApp')
	.factory('atencionFactory', function($http, $q, globalService, $localStorage) {
		var paths = {
			plazas: '/Muestra_Compania_RelUsuario/GetMuestra_Compania_RelUsuarioList',
			servicios: '/MuestraTipSerPrincipal/GetMuestraTipSerPrincipalList',
			usuarios: '/MUESTRAUSUARIOS/GetMUESTRAUSUARIOSList',
			buscarAtencion: '/uspBuscaLLamadasDeInternet/GetuspBuscaLLamadasDeInternetList',
			colonias: '/uspConsultaColonias/GetuspConsultaColoniasList'
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

		factory.buscarAtencion = function(objAte) {
			var deferred = $q.defer();
			var Parametros = {
				'TipSer': objAte.servicio,
				'NumReporte': objAte.reporte,
				'ContratoCom': objAte.contrato,
				'Nombre': objAte.nombre,
				'AP': objAte.paterno,
				'AM': objAte.materno,
				'Calle': objAte.calle,
				'Numero': objAte.numero,
				'clvColonia': objAte.colonia,
				'SetUpBox': objAte.setupbox,
				'IdUsuario': $localStorage.currentUser.idUsuario,
				'Op': objAte.op
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.buscarAtencion, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.getColonias = function(idcomp) {
			var deferred = $q.defer();
			var Parametros = {
				'idcompania': idcomp
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.colonias, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		return factory;
	});
