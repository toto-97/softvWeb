'use strict';
angular
	.module('softvApp')
	.factory('quejasFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			MuestraPlazas: '/Muestra_Compania_RelUsuario/GetMuestra_Compania_RelUsuarioList',
			ObtenServicios: '/MuestraTipSerPrincipal/GetMuestraTipSerPrincipalList',
			ObtenColonias: '/uspConsultaColonias/GetuspConsultaColoniasList',
			ObtenLista: '/BuscaQuejasSeparado2/GetBuscaQuejasSeparado2List',
			ValidaQueja: '/ValidaQuejaCompaniaAdic/GetDeepValidaQuejaCompaniaAdic',
			BuscaBloqueado: '/BuscaBloqueado/GetDeepBuscaBloqueado',
			ConsultaQueja: '/Quejas/GetQuejasList',
			ObtenTecnicos: '/Muestra_Tecnicos_Almacen/GetMuestra_Tecnicos_AlmacenList',
			ObtenPrioridad: '/Softv_GetPrioridadQueja/GetSoftv_GetPrioridadQuejaList'
		};

		factory.ObtenPrioridad = function() {
			var deferred = $q.defer();

			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.ObtenPrioridad, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};


		factory.ObtenTecnicos = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.ObtenTecnicos, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.ConsultaQueja = function(queja) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_Queja': queja

			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.ConsultaQueja, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};


		factory.BuscaBloqueado = function(contrato) {
			var deferred = $q.defer();
			var Parametros = {
				'Contrato': contrato,

			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.BuscaBloqueado, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};


		factory.ValidaQueja = function(idqueja) {
			var deferred = $q.defer();
			var Parametros = {
				'ClvQueja': idqueja,
				'IdUsuario': $localStorage.currentUser.idUsuario
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.ValidaQueja, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};



		factory.ObtenLista = function(object) {
			var deferred = $q.defer();
			var Parametros = {
				'Clv_TipSer': object.Clv_TipSer,
				'Clv_Queja': object.Clv_Queja,
				'Contrato': object.Contrato,
				'NOMBRE': object.NOMBRE,
				'AP': object.AP,
				'AM': object.AM,
				'CALLE': object.CALLE,
				'NUMERO': object.NUMERO,
				'SetupBox': object.SetupBox,
				'Status': object.Status,
				'Op': object.Op,
				'ClvColonia': object.ClvColonia,
				'IdCompania': object.IdCompania,
				'ClvUsuario': $localStorage.currentUser.idUsuario,
				'SoloNivel2': object.SoloNivel2,
				'NoTicket': object.NoTicket
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.ObtenLista, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		}

		factory.ObtenColonias = function(compania) {
			var deferred = $q.defer();
			var Parametros = {
				'idcompania': compania
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.ObtenColonias, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.ObtenServicios = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.ObtenServicios, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};

		factory.MuestraPlazas = function() {
			var deferred = $q.defer();
			var Parametros = {
				'ClvUsuario': $localStorage.currentUser.idUsuario
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.MuestraPlazas, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});

			return deferred.promise;
		};



		return factory;
	});
