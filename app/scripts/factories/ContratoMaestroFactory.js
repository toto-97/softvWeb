'use strict';
angular.module('softvApp')
	.factory('ContratoMaestroFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			GetContratoList: '/ContratoMaestroFac/GetContratoMaestroFacList'
		};
		factory.GetContratoList = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.GetContratoList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};
		return factory;
	});
