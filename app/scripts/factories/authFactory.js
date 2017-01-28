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
						token1: token,
						usuario: response.data.GetDameSessionWListResult[0].Usuario,
						sucursal: response.data.GetDameSessionWListResult[0].IdSucursal,
						idUsuario: response.data.GetDameSessionWListResult[0].IdUsuario,
						maquina: response.data.GetDameSessionWListResult[0].IpMaquina,
						tipoUsuario: response.data.GetDameSessionWListResult[0].TipoUser,
						Menu: response.data.GetDameSessionWListResult[0].Menu
					};
					var menu = $localStorage.currentUser.Menu;
					var myArray = [];
					menu.forEach(function(entry) {
						myArray.push(entry.Class);
						entry.MenuChild.forEach(function(hijo) {
							myArray.push(hijo.Class);
							hijo.MenuChild.forEach(function(nieto) {
								myArray.push(nieto.Class);
							});
						});
					});
					$localStorage.currentUser.myArray = myArray;
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
