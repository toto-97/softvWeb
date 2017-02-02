'use strict';
angular
	.module('softvApp')
	.config(function($stateProvider) {
		var states = [{
				name: 'home.procesos',
				abstract: true,
				template: '<div ui-view></div>'
			},
			{
				name: 'home.procesos.atencion',
				data: {
					pageTitle: 'SOFTV | ATENCIÓN TELEFÓNICA',
					permissions: {
						only: ['atenciontelefonicaSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/atencion',
				templateUrl: 'views/procesos/atencion.html',
				controller: 'AtencionCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.procesos.atencionNueva',
				data: {
					pageTitle: 'SOFTV | NUEVA ATENCIÓN TELEFÓNICA',
				},
				url: '/atencion/nueva',
				templateUrl: 'views/procesos/atencionNueva.html',
				controller: 'AtencionNuevaCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.procesos.atencionDetalle',
				data: {
					pageTitle: 'SOFTV | ATENCIÓN',
				},
				url: '/atencion/detalle',
				templateUrl: 'views/procesos/atencionDetalle.html',
				controller: 'AtencionDetalleCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.procesos.ordenes',
				data: {
					pageTitle: 'SOFTV | ORDENES DE SERVICIO',
					permissions: {
						only: ['ordenesservicioSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/ordenes',
				templateUrl: 'views/procesos/ordenesServicio.html',
				controller: 'OrdenesServicioCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.procesos.ordenNueva',
				data: {
					pageTitle: 'SOFTV | NUEVA ORDEN DE SERVICIO'
				},
				url: '/ordenNueva/:experience/:context',
				templateUrl: 'views/procesos/ordenNueva.html',
				controller: 'OrdenNuevaCtrl',
				controllerAs: '$ctrl'
			}
		];
		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
