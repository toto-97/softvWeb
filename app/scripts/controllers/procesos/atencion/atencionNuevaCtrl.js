'use strict';
angular
	.module('softvApp')
	.controller('AtencionNuevaCtrl', function($uibModal, atencionFactory, ngNotify) {
		function initialData() {
			atencionFactory.serviciosNuevo().then(function(data) {
				vm.servicios = data.GetMuestraTipSerPrincipal2ListResult;
				vm.selectedServicio = vm.servicios[0];
				MuestraTrabajos(vm.selectedServicio.Clv_TipSerPrincipal);
				GetClasificacionProblemas();
			});
		}

		function GetClasificacionProblemas() {
			atencionFactory.GetClasificacionProblemas().then(function(data) {
				vm.clasificacionProblemas = data.GetuspConsultaTblClasificacionProblemasListResult;
			});
		}

		function GetclasificacionQuejas() {
			atencionFactory.getclasificacionQuejas().then(function(data) {
				vm.Departamentos = data.GetMUESTRACLASIFICACIONQUEJASListResult;
			});
		}

		function GetprioridadQueja() {
			atencionFactory.GetprioridadQueja().then(function(data) {
				vm.Prioridades = data.GetSoftv_GetPrioridadQuejaListResult;
			});
		}

		function MuestraTrabajos(tipo) {
			atencionFactory.MuestraTrabajos(tipo).then(function(data) {
				vm.Trabajos = data.GetMUESTRATRABAJOSQUEJASListResult;
			});
		}

		function CambioServicio(servicio) {
			MuestraTrabajos(servicio.Clv_TipSerPrincipal);
		}

		function abrirPagos() {
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/modalTickets.html',
				controller: 'ModalTicketsCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'lg',
				resolve: {
					contrato: function() {
						return vm.GlobalContrato;
					}
				}
			});
		}

		function abrirAgenda() {
			alert('ok')
			var options = {};
			options.Contrato = vm.GlobalContrato;
			options.Clv_TipSer = vm.selectedServicio.Clv_TipSerPrincipal;
			options.Problema = vm.DescripcionProblema;
			options.Solucion = vm.DescripcionSolucion;
			options.Clv_Trabajo = vm.Trabajo.CLV_TRABAJO;
			options.clvPrioridadQueja = vm.Prioridad.clvPrioridadQueja;
			options.clv_llamada = vm.NumeroLlamada;
			options.clvProblema = vm.Problema.clvProblema;
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/ModalAgenda.html',
				controller: 'ModalAgendaCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: "sm",
				resolve: {
					options: function() {
						return options;
					}
				}
			});
		}


		function abrirBusquedaCliente() {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/ModalBuscaCliente.html',
				controller: 'ModalBuscaClienteCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: "lg",
				resolve: {
					// options: function() {
					// 	return options;
					// }
				}
			});
		}

		function abrirReportes() {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/historialReportes.html',
				controller: 'HistorialReportesCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: "lg",
				// resolve: {
				//     factura: function () {
				//         return factura;
				//     }
				// }
			});
		}


		function AddLLamadasdeInternet() {

			var atencion = (vm.tipoAtencion == 'telefonica') ? 'S' : 'T';
			var parametros = {
				'Clv_Usuario:': 2,
				'Contrato': vm.GlobalContrato,
				'Descripcion': vm.DescripcionProblema,
				'Solucion': vm.DescripcionSolucion,
				'Clv_trabajo': vm.Trabajo.CLV_TRABAJO,
				'clv_queja': 0,
				'CLV_TIPSER': vm.selectedServicio.Clv_TipSerPrincipal,
				'TipoAtencion': atencion
			}
			atencionFactory.AddLLamadasdeInternet(parametros).then(function(data) {
				vm.NumeroLlamada = data.AddLLamadasdeInternetResult;
			});

		}

		function buscarColonia() {
			var parametros = {
				contrato: vm.contrato,
				nombre: '',
				paterno: '',
				materno: '',
				calle: '',
				numero: '',
				colonia: 0,
				setupbox: '',
				usuario: 0,
				servicio: vm.selectedServicio.Clv_TipSerPrincipal,
				op: 0
			};
			atencionFactory.buscarCliente(param).then(function(data) {
				console.log(data);
				vm.atenciones = data.GetuspBuscaContratoSeparado2ListResult;
			});
		}

		function buscarNombres() {
			var parametros = {
				contrato: vm.contrato,
				nombre: '',
				paterno: '',
				materno: '',
				calle: '',
				numero: '',
				colonia: 0,
				setupbox: '',
				usuario: 0,
				servicio: vm.selectedServicio.Clv_TipSerPrincipal,
				op: 0
			};
			atencionFactory.buscarCliente(param).then(function(data) {
				console.log(data);
				vm.atenciones = data.GetuspBuscaContratoSeparado2ListResult;
			});
		}

		function buscaContrato() {
			var parametros = {
				contrato: vm.contrato,
				nombre: '',
				paterno: '',
				materno: '',
				calle: '',
				numero: '',
				colonia: 0,
				setupbox: '',
				usuario: 0,
				servicio: vm.selectedServicio.Clv_TipSerPrincipal,
				op: 0
			};
			atencionFactory.buscarCliente(param).then(function(data) {
				console.log(data);
				vm.atenciones = data.GetuspBuscaContratoSeparado2ListResult;
			});

			//mandar llamar servicio buscarCliente
		}

		function EnterContrato(event) {
			if (event.keyCode == 13) {
				var param = {};
				param.contrato = vm.contrato;
				param.servicio = vm.selectedServicio.Clv_TipSerPrincipal;
				param.usuario = 2;
				param.op = 0;
				atencionFactory.buscarCliente(param).then(function(data) {
					var detalle = data.GetuspBuscaContratoSeparado2ListResult[0];
					var contrato = detalle.ContratoBueno;
					vm.GlobalContrato = contrato;
					vm.NombreCliente = detalle.Nombre + detalle.Apellido_Paterno + " " + detalle.Apellido_Materno;
					vm.DireccionCliente = "Calle: " + detalle.CALLE + " #" + detalle.NUMERO + " Colonia: " + detalle.COLONIA + " Ciudad:" + detalle.CIUDAD;
					atencionFactory.getServiciosCliente(contrato).then(function(data) {
						vm.ServiciosCliente = data.GetDameSerDelCliFacListResult;
					});
				});
			}
		}

		function generaReporte() {
			atencionFactory.generaReporte(vm.GlobalContrato, vm.selectedServicio.Clv_TipSerPrincipal).then(function(data) {
				if (data.GetuspContratoServListResult[0].Pasa == true) {
					ngNotify.set('No se puede generar una  queja, ya el cliente cuenta con una pendiente.', 'error');
				} else {
					GetclasificacionQuejas();
					GetprioridadQueja();
					AddLLamadasdeInternet();
				}
			});
		}

		function ValidaOrdenQuejas() {
			atencionFactory.ValidaOrdenQuejas(vm.GlobalContrato, vm.selectedServicio.Clv_TipSerPrincipal)
				.then(function(data) {
					if (data.GetDeepVALIDAOrdenQuejaResult.Msg == 0) {
						abrirAgenda();
					} else {
						ngNotify.set(data.GetDeepVALIDAOrdenQuejaResult.Msg, 'error');
					}
				});
		}

		var vm = this;
		initialData();
		vm.abrirPagos = abrirPagos;
		vm.abrirReportes = abrirReportes;
		vm.tipoAtencion = 'telefonica';
		vm.buscaContrato = buscaContrato;
		vm.showDatosCliente = true;
		vm.EnterContrato = EnterContrato;
		vm.FechaActual = new Date();
		vm.CambioServicio = CambioServicio;
		vm.generaReporte = generaReporte;
		vm.ValidaOrdenQuejas = ValidaOrdenQuejas;
		//$('.datosCliente').collapse(); desplegar hasta que se busque un cliente



	});
