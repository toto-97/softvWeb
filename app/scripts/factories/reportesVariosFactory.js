'use strict';
angular.module('softvApp')
	.factory('reportesVariosFactory', reportesVariosFactory);


function reportesVariosFactory($http, $q, globalService) { //, sessionFactory) {
	var factory = {};
	var paths = {
		mostrarCompania: "/compania/GetcompaniaList",
		mostrarTipServ: "/compania/GetListTipServ",
		mostrarDistribuidorByUsuario: "/compania/GetDistribuidorByUsuario",
		mostrarPlazaByDistribuidor: "/compania/GetPlazasByDistribuidor",
		mostrarEstadoByPlaza: "/compania/GetEstadosByplaza",
		mostrarCiudad: "/compania/GetCiudadesBy_PlazasEstado",
		mostrarLocalidadByCiudad: "/compania/GetLocalidadesbyCiudad",
		mostrarColonia: "/compania/GetColoniasBy_Ciudad_Localidad",
		mostrarCalle: "/compania/GetCallesBy_Ciudad_Localidad_Colonia",
		mostrarServInternet: "/compania/GetServiciosInternetList",
		mostrarServDigital: "/compania/GetServiciosDigitalList",
		mostrarTipoCliente: "/compania/GetTipoClienteList",
		mostrarPeriodo: "/compania/GetPeriodosList",
		mostrarMotivoCan: "/compania/GetMotivoCanList"
	};

	factory.ejemplo = function() {
		var asd = ["1", "2"];
		return asd;
	}



	/*		factory.mostrarTipServ = function() {
				var deferred = $q.defer();
				var Parametros = {
				};
				var config = {
					// headers: {
					// 	'Authorization': sessionFactory.getToken()
					// }
				};
				$http.post(globalService.getUrl() + paths.mostrarTipServ, JSON.stringify(Parametros), config).success(function(data) {
					deferred.resolve(data);
				}).error(function(data) {
					deferred.reject(data);
				});
				return deferred.promise;
			}*/



	return factory;
}
