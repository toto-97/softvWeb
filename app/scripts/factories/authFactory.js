'use strict';
angular.module('softvApp')
	.factory('authFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getAuthentication: '/DameSessionW/GetDameSessionWList'
		};

		factory.getAuthentication = function(token) {
			var deferred = $q.defer();
			var Parametros = {
				'Id': 0,
				'Codigo': token
			};
			var config = {
				headers: {
					'Authorization': token
				}
			};
			$http.post(globalService.getUrl() + paths.getAuthentication, JSON.stringify(Parametros), config).then(function(response) {
				var resp = false;
				if (response.data.GetDameSessionWListResult[0].Codigo) {
					$localStorage.currentUser = {
						token: response.data.GetDameSessionWListResult[0].Codigo,
						idSucursal: response.data.GetDameSessionWListResult[0].IdSucursal,
						idUsuario: response.data.GetDameSessionWListResult[0].IdUsuario,
						ipMaquina: response.data.GetDameSessionWListResult[0].IpMaquina,
						tipoUsuario: response.data.GetDameSessionWListResult[0].TipoUser,
						Menu: response.data.GetDameSessionWListResult[0].Menu
					};
					resp = true;
				} else {
					resp = false;
				}
				deferred.resolve(resp);
			}).catch(function(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		};


		return factory;
	});
