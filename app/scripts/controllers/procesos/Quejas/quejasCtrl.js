'use strict';
angular
	.module('softvApp')
	.controller('quejasCtrl', function($state, ngNotify, $location, $uibModal, quejasFactory) {

		function InitalData() {

			quejasFactory.MuestraPlazas().then(function(data) {
				vm.Plazas = data.GetMuestra_Compania_RelUsuarioListResult;

				quejasFactory.ObtenServicios().then(function(data) {
					vm.Servicios = data.GetMuestraTipSerPrincipalListResult;
					vm.Servicio = vm.Servicios[0];
					vm.Plaza = vm.Plazas[0];
					vm.Status = vm.LosStatus[0];
					quejasFactory.ObtenColonias(vm.Plazas[0].id_compania).then(function(data) {
						vm.Colonias = data.GetuspConsultaColoniasListResult;
						var Parametros = {
							'Clv_TipSer': vm.Servicio.Clv_TipSerPrincipal,
							'Clv_Queja': 0,
							'Contrato': '',
							'NOMBRE': '',
							'AP': '',
							'AM': '',
							'CALLE': '',
							'NUMERO': '',
							'SetupBox': '',
							'Status': vm.Status.Clave,
							'Op': 45,
							'ClvColonia': 0,
							'IdCompania': vm.Plaza.id_compania,
							'ClvUsuario': 0,
							'SoloNivel2': 0,
							'NoTicket': 0
						};
						quejasFactory.ObtenLista(Parametros).then(function(data) {
							console.log(data);
							vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
						});
					});
				});
			});
		}

		function ObtenQuejas(object) {
			vm.ListaQuejas = [];
			var Parametros = {
				'Clv_TipSer': object.Clv_TipSer,
				'Clv_Queja': object.Clv_Queja,
				'Contrato': object.Contrato,
				'NOMBRE': object.NOMBRE,
				'AP': object.AP,
				'AM': object.AM,
				'CALLE': object.CALLE,
				'NUMERO': object.NUMERO,
				'SetupBox': object.SetupBox,
				'Status': object.Status,
				'Op': object.Op,
				'ClvColonia': object.ClvColonia,
				'IdCompania': object.IdCompania,
				'ClvUsuario': 0,
				'SoloNivel2': 0,
				'NoTicket': object.NoTicket
			};

		}


		function BuscaReporte() {
			var Parametros = {
				'Clv_TipSer': 0,
				'Clv_Queja': vm.Reporte,
				'Contrato': '',
				'NOMBRE': '',
				'AP': '',
				'AM': '',
				'CALLE': '',
				'NUMERO': '',
				'SetupBox': '',
				'Status': '',
				'Op': 3,
				'ClvColonia': 0,
				'IdCompania': 0,
				'ClvUsuario': 0,
				'SoloNivel2': 0,
				'NoTicket': 0
			};
			quejasFactory.ObtenLista(Parametros).then(function(data) {
				console.log(data);
				vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
			});
		}

		function BuscaContrato() {

			if (vm.Servicio == null) {
				alert('Selecciona un servicio');
				return;
			}

			if (vm.Plaza == null) {
				alert('Selecciona un plaza');
				return;
			}
			var Parametros = {
				'Clv_TipSer': vm.Servicio.Clv_TipSerPrincipal,
				'Clv_Queja': 0,
				'Contrato': vm.Contrato,
				'NOMBRE': '',
				'AP': '',
				'AM': '',
				'CALLE': '',
				'NUMERO': '',
				'SetupBox': '',
				'Status': '',
				'Op': 0,
				'ClvColonia': 0,
				'IdCompania': vm.Plaza.id_compania,
				'ClvUsuario': 0,
				'SoloNivel2': 0,
				'NoTicket': 0
			};
			quejasFactory.ObtenLista(Parametros).then(function(data) {
				console.log(data);
				vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
			});
		}

		function BuscaporNombre() {

			var Parametros = {
				'Clv_TipSer': 0,
				'Clv_Queja': 0,
				'Contrato': 0,
				'NOMBRE': vm.Nombre,
				'AP': vm.APaterno,
				'AM': vm.AMaterno,
				'CALLE': '',
				'NUMERO': '',
				'SetupBox': '',
				'Status': '',
				'Op': 1,
				'ClvColonia': 0,
				'IdCompania': 0,
				'ClvUsuario': 0,
				'SoloNivel2': 0,
				'NoTicket': 0
			};
			quejasFactory.ObtenLista(Parametros).then(function(data) {
				console.log(data);
				vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
			});

		}

		function BuscaporDireccion() {
			var colonia;
			if (vm.Colonia == null) {
				colonia = 0;
			} else {
				colonia = vm.Colonia.clvColonia;
			}

			var Parametros = {
				'Clv_TipSer': 0,
				'Clv_Queja': 0,
				'Contrato': 0,
				'NOMBRE': '',
				'AP': '',
				'AM': '',
				'CALLE': vm.Calle,
				'NUMERO': vm.Numero,
				'SetupBox': '',
				'Status': '',
				'Op': 2,
				'ClvColonia': colonia,
				'IdCompania': 0,
				'ClvUsuario': 0,
				'SoloNivel2': 0,
				'NoTicket': 0
			};
			quejasFactory.ObtenLista(Parametros).then(function(data) {
				console.log(data);
				vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
			});

		}

		function CambioPlaza(x) {
			quejasFactory.ObtenColonias(x.id_compania).then(function(data) {
				vm.Colonias = data.GetuspConsultaColoniasListResult;
				var Parametros = {
					'Clv_TipSer': vm.Servicio.Clv_TipSerPrincipal,
					'Clv_Queja': 0,
					'Contrato': 0,
					'NOMBRE': '',
					'AP': '',
					'AM': '',
					'CALLE': '',
					'NUMERO': '',
					'SetupBox': '',
					'Status': vm.Status.Clave,
					'Op': 45,
					'ClvColonia': 0,
					'IdCompania': x.id_compania,
					'ClvUsuario': 0,
					'SoloNivel2': 0,
					'NoTicket': 0
				};
				quejasFactory.ObtenLista(Parametros).then(function(data) {
					console.log(data);
					vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
				});
			});
		}

		function CambioServicio(x) {

		}

		function CambioStatus() {

			var Parametros = {
				'Clv_TipSer': vm.Servicio.Clv_TipSerPrincipal,
				'Clv_Queja': 0,
				'Contrato': '',
				'NOMBRE': '',
				'AP': '',
				'AM': '',
				'CALLE': '',
				'NUMERO': '',
				'SetupBox': '',
				'Status': vm.Status.Clave,
				'Op': 199,
				'ClvColonia': 0,
				'IdCompania': vm.Plaza.id_compania,
				'ClvUsuario': 0,
				'SoloNivel2': 0,
				'NoTicket': 0
			};
			quejasFactory.ObtenLista(Parametros).then(function(data) {
				console.log(data);
				vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
			});

		}

		function CambioNivel() {

		}

		function BuscaporSTB() {

			if (vm.STB == null) {
				alert('selecciona stb');
			}
			var Parametros = {
				'Clv_TipSer': 0,
				'Clv_Queja': 0,
				'Contrato': 0,
				'NOMBRE': '',
				'AP': '',
				'AM': '',
				'CALLE': '',
				'NUMERO': '',
				'SetupBox': vm.STB,
				'Status': '',
				'Op': 6,
				'ClvColonia': 0,
				'IdCompania': 0,
				'ClvUsuario': 0,
				'SoloNivel2': 0,
				'NoTicket': 0
			};
			quejasFactory.ObtenLista(Parametros).then(function(data) {
				console.log(data);
				vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
			});
		}

		function BuscaporTicket() {

			if (vm.Ticket == null) {
				alert('selecciona ticket');
			}
			var Parametros = {
				'Clv_TipSer': 0,
				'Clv_Queja': 0,
				'Contrato': 0,
				'NOMBRE': '',
				'AP': '',
				'AM': '',
				'CALLE': '',
				'NUMERO': '',
				'SetupBox': '',
				'Status': '',
				'Op': 7,
				'ClvColonia': 0,
				'IdCompania': 0,
				'ClvUsuario': 0,
				'SoloNivel2': 0,
				'NoTicket': vm.Ticket
			};
			quejasFactory.ObtenLista(Parametros).then(function(data) {
				console.log(data);
				vm.ListaQuejas = data.GetBuscaQuejasSeparado2ListResult;
			});

		}

		function abrirBonificacion() {
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/ModalBonificacion.html',
				controller: 'ModalBonificacionCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'md',
				resolve: {
					// contrato: function() {
					// 	return vm.GlobalContrato;
					// }
				}
			});
		}

		function abrirDetalleQueja(id) {
			console.log(id);
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/ModalConsultaQueja.html',
				controller: 'ModalConsultaQuejaCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'lg',
				resolve: {
					id: function() {
						return id;
					}
				}
			});
		}

		function EjecutaQueja(id, contrato, servicio) {
			alert(servicio);
			$state.go('home.procesos.ejecutaqueja', {
				'id': id,
				'contrato': contrato,
				'servicio': servicio
			});
		}


		var vm = this;
		InitalData();
		vm.Titulo = 'Quejas area técnica'
		vm.BuscaReporte = BuscaReporte;
		vm.BuscaContrato = BuscaContrato;
		vm.BuscaporNombre = BuscaporNombre;
		vm.BuscaporDireccion = BuscaporDireccion;
		vm.CambioPlaza = CambioPlaza;
		vm.CambioServicio = CambioServicio;
		vm.CambioStatus = CambioStatus;
		vm.CambioNivel = CambioNivel;
		vm.BuscaporSTB = BuscaporSTB;
		vm.BuscaporTicket = BuscaporTicket;
		vm.abrirBonificacion = abrirBonificacion;
		vm.abrirDetalleQueja = abrirDetalleQueja;
		vm.EjecutaQueja = EjecutaQueja;
		vm.LosStatus = [{
				'Clave': 'P',
				'Nombre': 'Pendiente'
			},
			{
				'Clave': 'V',
				'Nombre': 'Con visita'
			},
			{
				'Clave': 'E',
				'Nombre': 'Ejecutadas'
			},
			{
				'Clave': 'p',
				'Nombre': 'En Proceso'
			}
		];

	});
