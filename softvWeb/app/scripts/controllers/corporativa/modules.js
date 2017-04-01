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
		},
		{
			name: 'home.corporativa.maestroEditar',
			data: {
				pageTitle: 'SOFTV | Editar CONTRATO MAESTRO',
				permissions: {
					only: ['contratomaestroUpdate'],
					options: {
						reload: false
					}
				}
			},
			url: '/corporativa/editar/contrato/:id',
			templateUrl: 'views/corporativa/editarContratoMaestro.html',
			controller: 'EditarMaestroCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.corporativa.pago',
			data: {
				pageTitle: 'SOFTV | PAGO CONTRATO MAESTRO',
				permissions: {
					only: ['contratomaestroUpdate'],
					options: {
						reload: false
					}
				}
			},
			url: '/corporativa/pagoContratoMaestro',
			templateUrl: 'views/corporativa/pagoContratoMaestro.html',
			controller: 'PagoContratoMaestroCtrl',
			controllerAs: '$ctrl'
		}
	];
	states.forEach(function(state) {
		$stateProvider.state(state);
	});
}
