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
					pageTitle: 'SOFTV | CAJAS',
					permissions: {
						only: ['cajasSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/cajas',
				templateUrl: 'views/facturacion/facturacionCajas.html',
				controller: 'FacturacionCajasCtrl',
				controllerAs: 'ctrl'
			},
			{
				name: 'home.facturacion.ventas',
				data: {
					pageTitle: 'SOFTV | VENTAS',
					permissions: {
						only: ['ventasSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/ventas',
				templateUrl: 'views/facturacion/facturacionVentas.html',
				controller: 'FacturacionVentasCtrl',
				controllerAs: 'ctrl'
			},
			{
				name: 'home.facturacion.desglose',
				data: {
					pageTitle: 'SOFTV | DESGLOSE',
					permissions: {
						only: ['desglosedemonedaSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/desglose',
				templateUrl: 'views/facturacion/DesgloseMoneda.html',
				controller: 'DesgloseMonedaCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.facturacion.entregas',
				data: {
					pageTitle: 'SOFTV | ENTREGAS',
					permissions: {
						only: ['entregasparcialesSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/entregas',
				templateUrl: 'views/facturacion/EntregasParciales.html',
				controller: 'EntregasParcialesCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.facturacion.arqueo',
				data: {
					pageTitle: 'SOFTV | ARQUEOS',
					permissions: {
						only: ['arqueodecajasSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/arqueos',
				templateUrl: 'views/facturacion/ArqueoCajas.html',
				controller: 'ArqueoCajasCtrl',
				controllerAs: '$ctrl'
			}
		];
		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
