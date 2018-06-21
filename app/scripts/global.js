'use strict';
angular
	.module('softvApp')
	.service('globalService', function () {
		var svc = {};


		//rutas locales
		svc.getUrl = function () {
			//return 'http://172.16.126.44:8000/SoftvWCFService.svc';
			return 'http://192.168.50.200/SoftvWCFService.svc';
			//return 'http://localhost:64481/SoftvWCFService.svc';
		};

		svc.getUrlReportes = function () {
			//return 'http://172.16.126.44:8000/';
			return 'http://192.168.50.200/';
			//return 'http://localhost:64481/';
		};

		svc.getUrlMizar = function () {
			//return 'http://172.16.126.44:8001/SoftvWCFService.svc';
			//return 'http://localhost:64481/SoftvWCFService.svc';	
			return 'http://192.168.50.200:85/SoftvWCFService.svc';
		};

		svc.getReporteUrlMizar = function () {
			//return 'http://172.16.126.44:8001';
			return 'http://192.168.50.200:85';
			//return 'http://localhost:64481';
		};

		return svc;
	});
