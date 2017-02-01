'use strict';
angular
	.module('softvApp')
	.config(function($stateProvider) {
		var states = [{
				name: 'home.reportes',
				abstract: true,
				template: '<div ui-view></div>'
			},
			{
				name: 'home.reportes.ciudadcartera',
				data: {
					pageTitle: 'SOFTV | REPORTES POR CIDAD Y CARTERA',
					permissions: {
						only: ['reporteporciudadycarteraSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reporteciudadcartera',
				templateUrl: 'views/reportes/reporteciudadcartera.html',
				controller: 'ReporteCuidadCarteraCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.cortes',
				data: {
					pageTitle: 'SOFTV | REPORTES DE CORTES',
					permissions: {
						only: ['cortesSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/cortes',
				templateUrl: 'views/reportes/ReporteCortes.html',
				controller: 'ReporteCortesCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.reportes.especiales',
				data: {
					pageTitle: 'SOFTV | REPORTES DE CORTES ESPECIALES',
					permissions: {
						only: ['cortesespecialesSelect'],
						options: {
							reload: false
						}
					}
				},
				url: '/reportes/especiales',
				templateUrl: 'views/reportes/ReporteSucursales.html',
				controller: 'ReporteSucursalesCtrl',
				controllerAs: '$ctrl'
			}

		];
		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
