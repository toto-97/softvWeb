'use strict';
angular.module('softvApp')
	.factory('permisosFactory', function($http, $q, globalService, $localStorage) {


		var factory = {};
		var paths = {
			getPermisoList: '/Module/GetPermisoist',
			getModuleList: '/Module/GetModuleList'
		};

		factory.GetPermisoList = function(obj) {
			var Parametros = {
				'IdRol': 40
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

		factory.GetModuleList=function(){
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};

			$http.get(globalService.getUrl() + paths.getModuleList,config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		}


		return factory;
	});
