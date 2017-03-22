'use strict';
angular
	.module('softvApp')
	.service('globalService', function() {
		var svc = {};

		svc.getUrl = function() {
			return 'http://35.164.143.107/SoftvWCFService.svc';
		};

		svc.getUrlReportes = function() {
			return 'http://35.164.143.107';
		};

		return svc;
	});
