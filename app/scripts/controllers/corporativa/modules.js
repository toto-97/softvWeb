'use strict';
angular.module('softvApp').config(corporativaConf);

function corporativaConf($stateProvider) {
	var states = [{
			name: 'home.corporativa',
			abstract: true,
			template: '<div ui-view></div>'
		},
		{
			name: 'home.corporativa.maestro',
			data: {
				pageTitle: 'SOFTV | CONTRATO MAESTRO',
				permissions: {
					only: ['contratomaestroSelect'],
					options: {
						reload: false
					}
				}
			},
			url: '/corporativa/contratoMaestro',
			templateUrl: 'views/corporativa/contratoMaestro.html',
			controller: 'ContratoMaestroCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.corporativa.maestroNuevo',
			data: {
				pageTitle: 'SOFTV | NUEVO CONTRATO MAESTRO',
				permissions: {
					only: ['contratomaestroAdd'],
					options: {
						reload: false
					}
				}
			},
			url: '/corporativa/nuevo/contrato',
			templateUrl: 'views/corporativa/nuevoContratoMaestro.html',
			controller: 'NuevoMaestroCtrl',
			controllerAs: '$ctrl'
		}
	];
	states.forEach(function(state) {
		$stateProvider.state(state);
	});
}
