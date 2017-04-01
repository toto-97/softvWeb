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
				name: 'home.facturacion.desgloseNuevo',
				data: {
					pageTitle: 'SOFTV | NUEVO DESGLOSE DE MONEDA',
					permissions: {
						only: ['desglosedemonedaUpdate'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/desglose/nuevo',
				templateUrl: 'views/facturacion/nuevoDesgloseMoneda.html',
				controller: 'NuevoDesgloseCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.facturacion.desgloseDetalle',
				data: {
					pageTitle: 'SOFTV | DETALLE DESGLOSE DE MONEDA',
					permissions: {
						only: ['desglosedemonedaSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/desglose/detalle/:id',
				templateUrl: 'views/facturacion/detalleDesglose.html',
				controller: 'DetalleDesgloseCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.facturacion.desgloseEditar',
				data: {
					pageTitle: 'SOFTV | EDITAR DESGLOSE DE MONEDA',
					permissions: {
						only: ['editarPermission'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/desglose/editar/:id',
				templateUrl: 'views/facturacion/editarDesglose.html',
				controller: 'EditarDesgloseCtrl',
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
				name: 'home.facturacion.nuevaEntrega',
				data: {
					pageTitle: 'SOFTV | NUEVA ENTREGA',
					permissions: {
						only: ['entregasparcialesUpdate'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/entrega/nueva',
				templateUrl: 'views/facturacion/nuevaEntrega.html',
				controller: 'NuevaEntregaCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.facturacion.detalleEntrega',
				data: {
					pageTitle: 'SOFTV | DETALLE DE ENTREGA',
					permissions: {
						only: ['entregasparcialesSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/entrega/detalle/:id',
				templateUrl: 'views/facturacion/detalleEntrega.html',
				controller: 'DetalleEntregaCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.facturacion.editarEntrega',
				data: {
					pageTitle: 'SOFTV | EDITAR ENTREGA',
					permissions: {
						only: ['entregasparcialesUpdate'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/entrega/editar/:id',
				templateUrl: 'views/facturacion/editarEntrega.html',
				controller: 'EditarEntregaCtrl',
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
			},
			{
				name: 'home.facturacion.tickets',
				data: {
					pageTitle: 'SOFTV | CANCELACIÓN Y REIMPRECIÓN DE TICKETS',
					permissions: {
						only: ['ticketsSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/facturacion/tickets',
				templateUrl: 'views/facturacion/tickets.html',
				controller: 'TicketsCtrl',
				controllerAs: '$ctrl'
			}

		];
		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
