'use strict';
angular.module('softvApp')
	.factory('permisosFactory', function($http, $q, globalService, $localStorage) {


		var factory = {};
		var paths = {
			getPermisoList: '/Module/GetPermisoist',
			getModuleList: '/Module/GetModuleList',
			GuardaPermisos: '/Permiso/GuardaPermisos'
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
			console.log(array);
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};
			console.log(JSON.stringify({
				'permisos': array
			}));
			$http.post(globalService.getUrl() + paths.GuardaPermisos, JSON.stringify({
				'permisos': array
			}), config).then(function(response) {
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
