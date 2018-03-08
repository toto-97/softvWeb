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
			pageTitle: 'SAC | EDITAR CONTRATO MAESTRO',
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
			pageTitle: 'SAC | RECEPCIÓN DE PAGOS',
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
	},
	{
		name: 'home.corporativa.pagodetalle',
		data: {
			pageTitle: 'SOFTV | PAGO CONTRATO MAESTRO',
			permissions: {
				only: ['contratomaestroUpdate'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/pagoContratoMaestro/detallepago/:id',
		templateUrl: 'views/corporativa/pagoDetalleContratoMaestro.html',
		controller: 'PagoDetalleContratoMaestroCtrl',
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
	},
	{
		name: 'home.corporativa.reporteRecepcion',
		data: {
			pageTitle: 'SOFTV | REPORTES CONTRATO MAESTRO',
			permissions: {
				only: ['recepciondepagosSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/reporteRecepcion',
		templateUrl: 'views/corporativa/reporteRecepcion.html',
		controller: 'ReporteRecepcionCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.reportesCortes',
		data: {
			pageTitle: 'SAC | REPORTES',
			permissions: {
				only: ['contratomaestroSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/reportesCortesCorporativa',
		templateUrl: 'views/corporativa/reportesCortesCorporativa.html',
		controller: 'reportesCortesCorporativaCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.tickets',
		data: {
			pageTitle: 'SAC | FACTURAS',
			permissions: {
				only: ['facturasSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/tickets',
		templateUrl: 'views/corporativa/tickets.html',
		controller: 'ticketsCorporativaCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.notas',
		data: {
			pageTitle: 'SAC | NOTA DE CREDITO',
			permissions: {
				only: ['notasdecreditoSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/notacredito',
		templateUrl: 'views/corporativa/notaCredito.html',
		controller: 'notaCreditoCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.nuevanota',
		data: {
			pageTitle: 'SAC |NUEVA NOTA DE CREDITO',
			permissions: {
				only: ['notasdecreditoAdd'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/nuevanota',
		templateUrl: 'views/corporativa/nuevaNotaCredito.html',
		controller: 'nuevaNotaCreditoCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.reportesPendientes',
		data: {
			pageTitle: 'SOFTV | REPORTES PAGOS PENDIENTES',
			permissions: {
				only: ['recepciondepagosSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/reportePendientes',
		templateUrl: 'views/corporativa/reportesPendientes.html',
		controller: 'ReportesPendientesCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.reportesResumenContrato',
		data: {
			pageTitle: 'SOFTV | REPORTES RESUMEN POR CONTRATO MAESTRO',
			permissions: {
				only: ['recepciondepagosSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/reportesResumenContrato',
		templateUrl: 'views/corporativa/reportesResumenContrato.html',
		controller: 'reportesResumenContratoCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.reportesServiciosInstalados',
		data: {
			pageTitle: 'SOFTV | REPORTES SERVICIOS INSTALADOS',
			permissions: {
				only: ['recepciondepagosSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/reportesServiciosInstalados',
		templateUrl: 'views/corporativa/reportesServiciosInstalados.html',
		controller: 'reportesServiciosInstaladosCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.reportesServiciosPorInstalar',
		data: {
			pageTitle: 'SOFTV | REPORTES SERVICIOS POR INSTALAR',
			permissions: {
				only: ['recepciondepagosSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/reportesServiciosPorInstalar',
		templateUrl: 'views/corporativa/reportesServiciosPorInstalar.html',
		controller: 'reportesServiciosPorInstalarCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.reportesFacturasVencidas',
		data: {
			pageTitle: 'SOFTV | REPORTES FACTURAS VENCIDAS',
			permissions: {
				only: ['recepciondepagosSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/reportesFacturasVencidas',
		templateUrl: 'views/corporativa/reportesFacturasVencidas.html',
		controller: 'reportesFacturasVencidasCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.prefacturas',
		data: {
			pageTitle: 'SOFTV | FACTURAS',
			permissions: {
				only: ['facturaspreliminaresSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/facturas',
		templateUrl: 'views/corporativa/prefacturas.html',
		controller: 'prefacturasCtrl',
		controllerAs: '$ctrl'
	},
		{
		name: 'home.corporativa.relacioningresos',
		data: {
			pageTitle: 'SOFTV | FACTURAS',
			permissions: {
				
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/relaciondeingresos',
		templateUrl: 'views/corporativa/relacioningresos.html',
		controller: 'relacionIngresosCtrl',
		controllerAs: '$ctrl'
    
	},
	{
		name: 'home.corporativa.polizas',
		data: {
			pageTitle: 'SOFTV | PÓLIZAS',
			permissions: {
				only: ['polizasSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/polizas',
		templateUrl: 'views/corporativa/polizasMaestro.html',
		controller: 'polizaMaestroCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.reportecontratos',
		data: {
			pageTitle: 'SOFTV | CONTRATOS VENCIDOS/POR VENCER',
			permissions: {
				only: ['polizasSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/reportecontratos',
		templateUrl: 'views/corporativa/reporte.contratovencido.html',
		controller: 'reporteContratoVencidoCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.corporativa.reportedetallepago',
		data: {
			pageTitle: 'SOFTV | DETALLE DE PAGOS',
			permissions: {
				only: ['polizasSelect'],
				options: {
					reload: false
				}
			}
		},
		url: '/corporativa/reportedetallepago',
		templateUrl: 'views/corporativa/reporte.detallepago.html',
		controller: 'reporteDetallePagoCtrl',
		controllerAs: '$ctrl'
	}


	];
	states.forEach(function (state) {
		$stateProvider.state(state);
	});
}
