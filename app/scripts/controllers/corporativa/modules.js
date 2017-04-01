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
				pageTitle: 'SAC | CONTRATO MAESTRO',
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
				pageTitle: 'SAC | NUEVO CONTRATO MAESTRO',
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
				pageTitle: 'SAC | Editar CONTRATO MAESTRO',
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
			name: 'home.corporativa.recepcionpago',
			data: {
				pageTitle: 'SAC | RECEPCION DE PAGO',
				permissions: {
					only: ['recepciondepagosSelect'],
					options: {
						reload: false
					}
				}
			},
			url: '/corporativa/recepcionpago',
			templateUrl: 'views/corporativa/Recepcionpago.html',
			controller: 'RecepcionPagoCtrl',
			controllerAs: '$ctrl'
		}
	];
	states.forEach(function(state) {
		$stateProvider.state(state);
	});
}
