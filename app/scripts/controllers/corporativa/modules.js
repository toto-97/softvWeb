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
			url: '/facturacion/corporativa/contratoMaestro',
			templateUrl: 'views/corporativa/contratoMaestro.html',
			controller: 'ContratoMaestroCtrl',
			controllerAs: '$ctrl'
		}
	];
	states.forEach(function(state) {
		$stateProvider.state(state);
	});
}
