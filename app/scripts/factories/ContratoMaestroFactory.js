'use strict';
angular.module('softvApp')
	.factory('ContratoMaestroFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			GetContratoList: '/ContratoMaestroFac/GetContratos_CS',
			BuscarContratos: '/ContratoMaestroFac/GetBusquedaContratoMaestroFac',
			GetDistribuidores: '/DomicilioFiscal/GetDistribuidores',
			GetCiudadList: '/DomicilioFiscal/GetListaCiudadesPorPlaza',
            GetMuestraFacturasMaestroList:'/MuestraFacturasMaestro/GetMuestraFacturasMaestroList',
			BuscaFacturasMaestro:'/BuscaFacturasMaestro/GetBuscaFacturasMaestroList',
			UploadFile: '/ContratoMaestroFac/GetLayoutFac'
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



			factory.GetMuestraFacturasMaestroList = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.GetMuestraFacturasMaestroList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		};


        factory.BuscaFacturasMaestro = function(objeto) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'Fecha': objeto.Fecha,
				'Ticket': objeto.Ticket,
				'ContratoMaestro': objeto.ContratoMaestro,
				'Cliente':objeto.Cliente,
				'Op': objeto.Op
			};
			console.log(parametros);
			$http.post(globalService.getUrl() + paths.BuscaFacturasMaestro, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;

		};

		

		factory.BuscarContratos = function(objeto) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'RazonSocial': objeto.RazonSocial,
				'NombreComercial': objeto.NombreComercial,
				'ClvCiudad': objeto.ClvCiudad,
				'Op': objeto.Op
			};
			$http.post(globalService.getUrl() + paths.BuscarContratos, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;

		};

		factory.GetDistribuidores = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.GetDistribuidores, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;

		};

		factory.GetCiudadList = function(Clv_Plaza) {

			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'Clv_Plaza': Clv_Plaza
			};
			$http.post(globalService.getUrl() + paths.GetCiudadList, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;

		};

		factory.UpdateFile = function(file, Distribuidor, contrato) {
			var deferred = $q.defer();
			var data = new FormData();
			for (var i = 0; i < file.length; i++) {
				console.log(file[i]);
				data.append('file' + i, file[i]);
			}
			data.append('Distribuidor', Distribuidor);
			data.append('Contrato', contrato);

			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
					'Content-Type': undefined
				}
			};
			$http.post(globalService.getUrl() + paths.UploadFile, data, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response);
			});

			return deferred.promise;
		};

		return factory;


	});
