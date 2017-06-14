'use strict';
angular
	.module('softvApp')
	.service('globalService', function() {
		var svc = {};

		svc.getUrl = function() {
			return 'http://172.16.126.44:8585/SoftvWCFService.svc';
		};

		svc.getUrlReportes = function() {
			return 'http://172.16.126.44:8585';
		};

		return svc;
	});
