'use strict';
angular
	.module('softvApp')
	.service('globalService', function() {
		var svc = {};

		svc.getUrl = function() {
			return 'http://localhost:64481/SoftvWCFService.svc';
			//return 'http://192.168.50.6:64481/SoftvWCFService.svc';
		};

		svc.getUrlReportes = function() {
			//return 'http://192.168.50.6:64481';
			return 'http://localhost:64481';
		};
		return svc;
	});
