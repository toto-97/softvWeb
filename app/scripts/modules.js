'use strict';
angular
	.module('softvApp')
	.config(function($stateProvider) {
		var states = [{
				name: 'home',
				data: {
					pageTitle: 'BIENVENIDO | SOFTV WEB'
				},
				url: '/home',
				views: {
					'homeview': {
						templateUrl: 'views/main.html',
						controller: 'HomeCtrl',
						controllerAs: '$ctrl'
					}
				},
			},
			{
				name: 'auth',
				url: '/auth',
				data: {
					pageTitle: 'BIENVENIDO | SOFTV WEB'
				},
				views: {
					'loginview': {
						templateUrl: 'views/login/login.html',
						controller: 'LoginCtrl',
						controllerAs: '$ctrl'
					}
				},
			}
		];

		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
