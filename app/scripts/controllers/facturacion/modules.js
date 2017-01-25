'use strict';
angular
	.module('softvApp')
	.config(function($stateProvider) {
		var states = [{
				name: 'home.facturacion',
				abstract: true,
				template: '<div ui-view></div>'
			},
			{
				name: 'home.facturacion.cajas',
				data: {
					pageTitle: 'SOFTV | CAJAS'
				},
				url: '/facturacion/cajas',
				templateUrl: 'views/facturacion/facturacionCajas.html',
				controller: 'FacturacionCajasCtrl',
				controllerAs: 'ctrl'
			},
			{
				name: 'home.facturacion.ventas',
				data: {
					pageTitle: 'SOFTV | VENTAS'
				},
				url: '/facturacion/ventas',
				templateUrl: 'views/facturacion/facturacionVentas.html',
				controller: 'FacturacionVentasCtrl',
				controllerAs: 'ctrl'
			}
		];
		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
