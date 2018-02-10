'use strict';
angular
	.module('softvApp')
	.service('globalService', function() {
		var svc = {};

				
		//rutas locales
		 svc.getUrl = function() {
	//	return 'http://172.16.126.44:81/SoftvWCFService.svc';
	   	 return 'http://192.168.50.33/SoftvWCFService.svc';
	   // return 'http://localhost:64481/SoftvWCFService.svc';
		};

		svc.getUrlReportes = function() {
	//	return 'http://172.16.126.44:81/';
		return 'http://192.168.50.33/';
		//return 'http://localhost:64481/';
		};

		svc.getUrlMizar = function() {
		//	return 'http://172.16.126.44:85/SoftvWCFService.svc';
		//	return 'http://localhost:64481/SoftvWCFService.svc';	
	    	return 'http://192.168.50.33:85/SoftvWCFService.svc';

		};

		svc.getReporteUrlMizar = function() {
		//return 'http://172.16.126.44:85';
		return 'http://192.168.50.33:85';
	    //	return 'http://localhost:64481';
		};
 
	
		return svc;
	});
