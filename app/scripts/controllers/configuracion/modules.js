'use strict';
angular
	.module('softvApp')
	.config(function($stateProvider) {
		var states = [{
				name: 'home.configuracion',
				abstract: true,
				template: '<div ui-view></div>'
			},
			{
				name: 'home.configuracion.permisos',
				data: {
					pageTitle: 'SOFTV | PERMISOS'
				},
				url: '/configuracion/permisos',
				templateUrl: 'views/configuracion/permisos.html',
				controller: 'AtencionCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.configuracion.roles',
				data: {
					pageTitle: 'SOFTV | ROLES'
				},
				url: '/configuracion/roles',
				templateUrl: 'views/configuracion/roles.html',
				controller: 'AtencionCtrl',
				controllerAs: '$ctrl'
			}
		];
		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
