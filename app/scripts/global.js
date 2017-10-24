'use strict';
angular
	.module('softvApp')
	.service('globalService', function() {
		var svc = {};

		svc.getUrl = function() {
			return 'http://192.168.50.33/SoftvWCFService.svc';
		};

		svc.getUrlReportes = function() {
			return 'http://192.168.50.33';
		};

		return svc;
	});
