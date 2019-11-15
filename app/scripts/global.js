'use strict';
angular
	.module('softvApp')
	.service('globalService', function () {
		var svc = {};


		//rutas locales

		svc.getUrl = function () {
			//return 'http://172.16.126.44:8300/SoftvWCFService.svc';
			return 'http://172.16.126.41:8000/SoftvWCFService.svc';
			//return 'http://192.168.50.122:3000/SoftvWCFService.svc';
			//return 'http://192.168.50.125:8085/SoftvWCFService.svc';
			//return 'http://localhost:64481/SoftvWCFService.svc';
		};

		svc.getUrlReportes = function () {
			//return 'http://172.16.126.44:8300/';
			return 'http://172.16.126.41:8000/';
			//return 'http://192.168.50.122:3000/';
			//return 'http://192.168.50.125:8085/';
			//return 'http://localhost:64481/';
		};

		svc.getUrlMizar = function () {
			//return 'http://172.16.126.44:8001/SoftvWCFService.svc';
			return 'http://172.16.126.41:8001/SoftvWCFService.svc';
			//return 'http://localhost:64481/SoftvWCFService.svc';	
			//return 'http://192.168.50.122:8000/SoftvWCFService.svc';
		};

		svc.getReporteUrlMizar = function () {
			//return 'http://172.16.126.44:8001';
			return 'http://172.16.126.41:8001';
			//return 'http://192.168.50.122:8000';
			//return 'http://localhost:64481';

		};

		return svc;
	});
