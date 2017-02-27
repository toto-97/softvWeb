'use strict';
angular.module('softvApp')
	.factory('permisosFactory', function($http, $q, globalService, $localStorage) {


		var factory = {};
		var paths = {
			getPermisoList: '/Module/GetPermisoist',
			getModuleList: '/Module/GetModuleList',
			GuardaPermisos: '/Permiso/AddPermiso'
		};

		factory.GetPermisoList = function(obj) {
			console.log(obj);
			var Parametros = {
				'IdRol': obj.IdRol
			};
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};
			$http.post(globalService.getUrl() + paths.getPermisoList, JSON.stringify(
				Parametros
			), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};

		factory.GuardaPermisos = function(array) {
			var permiso = {
				'permisos': {
					'IdRol': 1,
					'IdModule': 1,
					'OptAdd': true,
					'OptSelect': true,
					'OptUpdate': true,
					'OptDelete': true
				}
			};
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};
			console.log(JSON.stringify(
				permiso
			));
			$http.post(globalService.getUrl() + paths.GuardaPermisos, JSON.stringify(permiso), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};



		factory.GetModuleList = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};

			$http.get(globalService.getUrl() + paths.getModuleList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		}


		return factory;
	});
