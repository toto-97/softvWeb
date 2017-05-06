'use strict';
angular
	.module('softvApp')
	.controller('QuejaEjecutaCtrl', function($state, ngNotify, $location, $uibModal, $stateParams, atencionFactory, quejasFactory) {

		function InitalData() {
		
			vm.clv_queja = $stateParams.id;
			vm.contrato = $stateParams.contrato;	
			vm.Servicio = $stateParams.servicio;
			quejasFactory.ValidaQueja(vm.clv_queja).then(function(data) {
				if (data.GetDeepValidaQuejaCompaniaAdicResult.Valida == 0) {
					var param = {};
					param.contrato = vm.contrato;
					param.servicio = vm.Servicio;
					param.op = 0;
					atencionFactory.buscarCliente(param).then(function(data) {		

						var detalle = data.GetuspBuscaContratoSeparado2ListResult[0];
						var contrato = detalle.ContratoBueno;
						vm.GlobalContrato = contrato;
						contratoBuenoGlobal = contrato;						
						vm.NombreCliente = detalle.Nombre + detalle.Apellido_Paterno + " " + detalle.Apellido_Materno;
						vm.Calle = detalle.CALLE;
						vm.Numero = detalle.NUMERO;
						vm.Colonia = detalle.COLONIA;
						vm.Ciudad = detalle.CIUDAD;
						atencionFactory.getServiciosCliente(contrato).then(function(data) {						
							vm.ServiciosCliente = data.GetDameSerDelCliFacListResult;

							quejasFactory.ConsultaQueja($stateParams.id).then(function(data) {
								var detqueja = data.GetQuejasListResult[0];													
								//console.log(detqueja);
								statusQueja = detqueja.Status;
								vm.UsuarioGenero = detqueja.UsuarioGenero;
								vm.UsuarioEjecuto = detqueja.UsuarioEjecuto;
								vm.TecnicoAgenda = detqueja.NombreTecAge;
								vm.TurnoAgenda = detqueja.TurnoAge;
								vm.FechaAgenda = detqueja.FechaAge;
								vm.ComentarioAgenda = detqueja.ComentarioAge;
								vm.DetalleProblema = detqueja.Problema;
								vm.Observaciones = detqueja.Observaciones;
								vm.DetalleSolucion = detqueja.Solucion;
								
								//dateParse('04/01/2017');
								var fsolicitud = detqueja.Fecha_Soliciutud.split(' ');
								vm.FechaSolicitud = fsolicitud[0];
								var hora = getTime(detqueja.Fecha_Soliciutud);
								vm.HoraSolicitud = hora;

								if (detqueja.Fecha_Ejecucion != null) {
									var fejecucion = detqueja.Fecha_Ejecucion.split(' ');
									//console.log(fejecucion);
									vm.FechaEjecucion = fejecucion[0];
									var horaEjecucion = getTime(detqueja.Fecha_Ejecucion);
									vm.HoraEjecucion = horaEjecucion;
								}
								if (detqueja.FechaProceso != null) {
									var fproceso = detqueja.FechaProceso.split(' ');
									vm.FechaProceso = fproceso[0];
									vm.HoraProceso = getTime(detqueja.FechaProceso);
								}

								if (detqueja.Visita1 != null) {								
									var fvisita1 = detqueja.Visita1.split(' ');
									//console.log(fvisita1[0]);
									vm.Fechavisita1 = fvisita1[0];
									vm.Horavisita1 = getTime(detqueja.Visita1);
									vis1 = detqueja.Visita1;								
								}

								if (detqueja.Visita2 != null) {
									var fvisita2 = detqueja.Visita2.split(' ');
									//console.log(fvisita2[0]);
									vm.Fechavisita2 = fvisita2[0];
									vm.Horavisita2 = getTime(detqueja.Visita2);
								//	vm.FVisita2 = true;
									vis2 = detqueja.Visita2;
								}

								if (detqueja.Visita3 != null) {
									var fvisita3 = detqueja.Visita3.split(' ');
									//console.log(fvisita3[0]);
									vm.Fechavisita3 = fvisita3[0];
									vm.Horavisita3 = getTime(detqueja.Visita3);
								//	vm.FVisita3 = true;		
									vis3 = detqueja.Visita3;				
								}

								if (detqueja.EjecucuionReal != null) {
									var fEjecucuionReal = detqueja.EjecucuionReal.split(' ');
									//console.log(fEjecucuionReal[0]);
									vm.FechaEjecucuionReal = fEjecucuionReal[0];
									vm.HoraEjecucuionReal = getTime(detqueja.EjecucuionReal);
								}
							
								vm.Departamento = detqueja.Clasificacion;
								vm.Clv_trabajo = detqueja.Clv_Trabajo;
								vm.Clv_prioridad = detqueja.clvPrioridadQueja;
								vm.Clv_problema = detqueja.clvProblema;
								//console.log( 'ejecucion ' + detqueja.Fecha_Ejecucion);
								vm.ProblemaReal = detqueja.Solucion;					

								//vm.Visita = true;
								vm.Visita = detqueja.Visita;
								vm.Clv_status = detqueja.Status;
								for (var t = 0; t < vm.Status.length; t++) {
									if (vm.Status[t].Clave == vm.Clv_status) {
										vm.Estatus = vm.Status[t];
										Bloqueo(true);
									}
								}


								quejasFactory.ObtenTecnicos(vm.GlobalContrato).then(function(data) {
									vm.Tecnicos = data.GetMuestra_Tecnicos_AlmacenListResult;
									if (detqueja.Clave_Tecnico != null){										
									//vm.Trabajos = data.GetMUESTRATRABAJOSQUEJASListResult;
									for (var a = 0; a < vm.Tecnicos.length; a++) {
										if (vm.Tecnicos[a].clv_Tecnico == detqueja.Clave_Tecnico) {
											vm.Tecnico = vm.Tecnicos[a];
										//	console.log('tecnicos '+ vm.Tecnicos[a]);
										}
									}
								}
								});

								/*
								quejasFactory.ObtenTecnicos(vm.GlobalContrato).then(function(data) {
									vm.Tecnicos = data.GetMuestra_Tecnicos_AlmacenListResult;
								});*/

								atencionFactory.MuestraTrabajos(vm.Servicio).then(function(data) {
									vm.Trabajos = data.GetMUESTRATRABAJOSQUEJASListResult;
									for (var a = 0; a < vm.Trabajos.length; a++) {
										if (vm.Trabajos[a].CLV_TRABAJO == vm.Clv_trabajo) {
											vm.Trabajo = vm.Trabajos[a];
										}
									}
								});

								quejasFactory.ObtenPrioridad().then(function(data) {
									vm.Prioridades = data.GetSoftv_GetPrioridadQuejaListResult;
									for (var a = 0; a < vm.Prioridades.length; a++) {
										if (vm.Prioridades[a].clvPrioridadQueja == vm.Clv_prioridad) {
											vm.Prioridad = vm.Prioridades[a];
										}
									}
								});
								atencionFactory.getServicios().then(function(data) {
									vm.Servicios = data.GetMuestraTipSerPrincipalListResult;
									for (var a = 0; a < vm.Servicios.length; a++) {
										if (vm.Servicios[a].Clv_TipSerPrincipal == vm.Servicio) {
											vm.Servicio = vm.Servicios[a];
										}
									}
								});

								atencionFactory.GetClasificacionProblemas().then(function(data) {
									vm.Problemas = data.GetuspConsultaTblClasificacionProblemasListResult;
									for (var a = 0; a < vm.Problemas.length; a++) {
										if (vm.Problemas[a].clvProblema == vm.Clv_problema) {
											vm.Problema = vm.Problemas[a];
										}
									}
								});

							});

						});

						Ejecutaqueja(contratoBuenoGlobal);
					});
				} else {
					$state.go('home.procesos.reportes');
					ngNotify.set('La queja pertenece a un contrato de plazas adicionales al usuario, no puede ejecutarla', 'error');
				}

			});
		
		}

		function dateParse(date) {
			var realdate = date.split(" ")
			var strDate = realdate[0];
			console.log(strDate);
			var dateParts = strDate.split("/");
			console.log(dateParts);
			var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
			console.log(dateParts[0].length)
			console.log(dateParts[1].length)
			console.log(dateParts[2].length)
			if (dateParts[0].length == 1) {
				var dia = '0' + ateParts[0];
				console.log(dia);
			}
			console.log(date);
		}


		function getTime(date) {
			var fejecucion = date.split(' ');
			//console.log(fejecucion);
			if (fejecucion.length == 3) {
				return fejecucion[2];
			} else if (fejecucion.length == 4) {
				var hora = fejecucion[3].split(':');
				if (hora[0].length == 1) {
					return '0' + fejecucion[3];
				} else {
					return fejecucion[3];
				}

			}
		}


		function abrirBonificacion() {

			var detalle = {};
			detalle.Block = true;
			detalle.Queja = object.Clv_Queja;
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
					detalle: function() {
						return detalle;
					}
				}
			});
		}

		function Bloqueo(aplicabloqueo) {
			
			if (contratoBloqueado == 1)
			{
				vm.BtnGuarda = false;					
			}
			else{
				if (vm.Estatus.Clave == 'E') {
					if (aplicabloqueo == true) {
						vm.BtnGuarda = false;
						vm.FEjecucion = true;
						vm.FVisita1 = true;
						vm.FVisita2 = true;
						vm.FVisita3 = true;
						vm.FProceso = true;
						vm.Itrabajo = false;
						vm.Iprioridad = true;
						vm.IDetProblema = true;
						vm.IClasproblema = true;
						vm.Iprobreal = true;
						vm.Iobser = true;
						vm.IEstatus = true;
						vm.Iejecucion = 'input-yellow';
						vm.Ivisita = 'input-normal';
						vm.Iproceso = 'input-normal';
						vm.ISelectEstatus = 'input-normal';
					} else {
						vm.BtnGuarda = true;
						vm.FEjecucion = false;
						vm.FVisita1 = true;
						vm.FVisita2 = true;
						vm.FVisita3 = true;
						vm.FProceso = true;
						vm.Itrabajo = false;
						vm.Iprioridad = false;
						vm.IDetProblema = true;
						vm.IClasproblema = true;
						vm.Iprobreal = false;
						vm.Iobser = false;
						vm.IEstatus = false;
						vm.Iejecucion = 'input-yellow';
						vm.Ivisita = 'input-normal';
						vm.Iproceso = 'input-normal';
						vm.ISelectEstatus = 'input-normal';
					}

				} else if (vm.Estatus.Clave == 'P') {
					ngNotify.set('Seleccione un status distinto a "pendiente"', 'error');				
					vm.BtnGuarda = false;
					vm.FEjecucion = true;
					vm.FVisita1 = true;
					vm.FVisita2 = true;
					vm.FVisita3 = true;
					vm.FProceso = true;
					vm.Itrabajo = false;
					vm.Iprioridad = false;
					vm.IDetProblema = true;
					vm.IClasproblema = true;
					vm.Iprobreal = false;
					vm.Iobser = false;
					vm.IEstatus = false;
					vm.Iejecucion = 'input-normal';
					vm.Ivisita1 = 'input-normal';
					vm.Ivisita2 = 'input-normal';
					vm.Ivisita3 = 'input-normal';
					vm.Iproceso = 'input-normal';
					vm.ISelectEstatus = 'input-yellow';
				} else if (vm.Estatus.Clave == 'V') {
					vm.BtnGuarda = true;
					vm.FEjecucion = true;
					//vm.FVisita1 = (vm.visita1 == '') ? true : false;
					//vm.FVisita2 = (vm.visita2 == '') ? true : false;
					//vm.FVisita3 = (vm.visita3 == '') ? true : false;					
					if((vm.Fechavisita1 == undefined) && (vm.Fechavisita2 == undefined) && (vm.Fechavisita3 == undefined))
					{
						vm.FVisita1 = false;
						vm.FVisita2 = true;
						vm.FVisita3 = true;
					}else if((vm.Fechavisita1 != undefined) && (vm.Fechavisita2 != undefined) && (vm.Fechavisita3 != undefined))
					{
						vm.FVisita1 = true;
						vm.FVisita2 = true;
						vm.FVisita3 = true;				
					}

					if((vm.Fechavisita1 != undefined) && (vm.Fechavisita2 == undefined) && (vm.Fechavisita3 == undefined))
					{
						vm.FVisita1 = true;
						vm.FVisita2 = false;
						vm.FVisita3 = true;
					}
					if ((vm.Fechavisita1 != undefined) && (vm.Fechavisita2 != undefined) && (vm.Fechavisita3 == undefined))
					{
						vm.FVisita1 = true;
						vm.FVisita2 = true;
						vm.FVisita3 = false;
					}

					vm.FProceso = true;
					vm.Itrabajo = false;
					vm.Iprioridad = false;
					vm.IDetProblema = true;
					vm.IClasproblema = true;
					vm.Iprobreal = false;
					vm.Iobser = false;
					vm.IEstatus = false;
					vm.Iejecucion = 'input-normal';
					vm.Ivisita1 = 'input-yellow';
					vm.Ivisita2 = 'input-yellow';
					vm.Ivisita3 = 'input-yellow';
					vm.Iproceso = 'input-normal';
					vm.ISelectEstatus = 'input-normal';
				} else if (vm.Estatus.Clave == 'S') {					
					//getDateToday();		
					//vm.HoraProceso = horaHoy;
					vm.BtnGuarda = true;
					vm.FEjecucion = true;
					vm.FVisita1 = true;
					vm.FVisita2 = true;
					vm.FVisita3 = true;
					vm.FProceso = false;
					vm.Itrabajo = false;
					vm.Iprioridad = false;
					vm.IDetProblema = true;
					vm.IClasproblema = true;
					vm.Iprobreal = false;
					vm.Iobser = false;
					vm.IEstatus = false;
					vm.Iejecucion = 'input-normal';
					vm.Ivisita1 = 'input-normal';
					vm.Ivisita2 = 'input-normal';
					vm.Ivisita3 = 'input-normal';
					vm.Iproceso = 'input-yellow';
					vm.ISelectEstatus = 'input-normal';
				} else {
					alert('Ninguna');
				}
			}
		}

		function CambiaEstatus() {
			Bloqueo(false);
		}

		function Ejecutaqueja(contratoBuenoGlobal) {
			quejasFactory.ValidaQueja(vm.clv_queja).then(function(data) {				
				if (data.GetDeepValidaQuejaCompaniaAdicResult.Valida == 0) {
					quejasFactory.BuscaBloqueado(contratoBuenoGlobal).then(function(bloqueado) {
						var obj = {};				
						if (bloqueado.GetDeepBuscaBloqueadoResult.Bloqueado == 1){
							contratoBloqueado = 1;
							ngNotify.set('El cliente '+ contratoBuenoGlobal +' ha sido bloqueado, por lo que no se podrá ejecutar la orden', 'error');	
						}else{
					
							if (vm.Estatus.Clave == 'P') {
							
							}else if(vm.Estatus.Clave == 'E'){
								if (vm.FechaEjecucion == undefined || vm.FechaEjecucion == '') {
									ngNotify.set('Seleccione la fecha de ejecución', 'error');
									return;
								}
								else if (vm.FechaEjecucion != undefined && vm.FechaEjecucion != ''){
									console.log(vm.FechaEjecucion);
									console.log(vm.FechaSolicitud);
								
									getDateToday();
									console.log(fechaHoy);
									if(vm.FechaEjecucion <= vm.FechaSolicitud || vm.FechaEjecucion > fechaHoy){
										ngNotify.set('La fecha de ejecución no debe ser anterior a la fecha de solicitud ni posterior a la fecha actual', 'error');
										return;
									}else if ((vm.FechaEjecucion >= vm.FechaSolicitud) && (vm.FechaEjecucion <= fechaHoy))
									{
									
										if (vm.HoraEjecucion == undefined || vm.HoraEjecucion == '')
										{	
											ngNotify.set('Seleccione la hora del ejecución', 'error');
											return;
										}
										else if (vm.HoraEjecucion != undefined && vm.HoraEjecucion != '')
										{											
											if (vm.FechaEjecucion == vm.FechaSolicitud) {		
												

												if (vm.HoraEjecucion < vm.HoraSolicitud)
												{
													ngNotify.set('La hora de ejecución '+ vm.HoraEjecucion + ' no puede ser anterior a la hora de solicitud '+vm.HoraSolicitud , 'error');
													return;												
												}
												else{
													obj.Fecha_Ejecucion = vm.FechaEjecucion;												
													vm.FechaEjecucuionReal = fechaHoy;
													vm.HoraEjecucuionReal = horaHoy;		
												}											
											}
											else if (vm.FechaProceso != vm.FechaSolicitud) {														
												obj.Fecha_Ejecucion = vm.FechaEjecucion;
												vm.FechaEjecucuionReal = fechaHoy;
												vm.HoraEjecucuionReal = horaHoy;	
											}
										}								
									}
								}
							}
							else if (vm.Estatus.Clave == 'S') {
								getDateToday();		
								if (vm.FechaProceso == undefined || vm.FechaProceso == '') {
									ngNotify.set('Seleccione la fecha de proceso', 'error');
									return;
								}
								else{	

									if( (vm.FechaProceso < vm.FechaSolicitud) || (vm.FechaProceso > fechaHoy)) {
									ngNotify.set('La fecha de proceso no debe ser anterior a la fecha de solicitud ni posterior a la fecha actual', 'error');
									return;
									}
									else if ((vm.FechaProceso >= vm.FechaSolicitud) && (vm.FechaProceso <= fechaHoy))  {
										
										if (vm.HoraProceso == undefined || vm.HoraProceso == '')
										{	
											ngNotify.set('Seleccione la hora del proceso', 'error');
											return;
										}
										else if (vm.HoraProceso != undefined && vm.HoraProceso != '')
										{											
											if (vm.FechaProceso == vm.FechaSolicitud) {		
												if (vm.HoraProceso <= vm.HoraSolicitud)
												{
													ngNotify.set('La hora de proceso '+ vm.HoraProceso + ' no puede ser anterior o igual a la hora de solicitud '+vm.HoraSolicitud , 'error');
													return;												
												}
												else{
													obj.FechaProceso = vm.FechaProceso;
													obj.HP = vm.HoraProceso;	
												}											
											}
											else if (vm.FechaProceso != vm.FechaSolicitud) {
														
												obj.FechaProceso = vm.FechaProceso;
												obj.HP = vm.HoraProceso;		
											}
										}							
									}
								}
							} 
							else if (vm.Estatus.Clave == 'V') {									
								obj.FechaProceso = '';
								obj.HP = '';			

								if ((vm.Fechavisita1 == undefined || vm.Fechavisita1 == '') && (vm.Fechavisita2 == undefined || vm.Fechavisita2 == '') && (vm.Fechavisita3 == undefined || vm.Fechavisita3 == '')) 
								{									
									ngNotify.set('Seleccione la fecha de visita', 'error');
									return;		
								}
								if ((vis1 != null) && (vis2 == null) && (vm.Fechavisita2 == undefined || vm.Fechavisita2 =='')){
									ngNotify.set('Seleccione la fecha de visita 2', 'error');
									return;	
								}
								else if ((vis1 != null) && (vis2 != null) && (vis3 == null) && (vm.Fechavisita3 == undefined || vm.Fechavisita3 =='')){
									ngNotify.set('Seleccione la fecha de visita 3', 'error');
									return;	
								}

								if (vm.Fechavisita1 != undefined && vm.Fechavisita1 != '') 									
								{	
									getDateToday();									
									if( (vm.Fechavisita1 < vm.FechaSolicitud) || (vm.Fechavisita1 > fechaHoy)) {
										ngNotify.set('La fecha de visita no debe ser anterior a la fecha de solicitud ni posterior a la fecha actual', 'error');
										return;
									}
									else if ((vm.Fechavisita1 >= vm.FechaSolicitud) && (vm.Fechavisita1 <= fechaHoy))  {

										if (vm.Horavisita1 == undefined || vm.Horavisita1 == '')
										{	
												ngNotify.set('Seleccione la hora de visita 1', 'error');
												return;
										}
										else if (vm.Horavisita1 != undefined && vm.Horavisita1 != ''){
											var horaValida = validaHora(vm.Horavisita1);								
												if(vm.FVisita1 == false)
												{
													if ( (vm.Fechavisita1 == fechaHoy) && (horaValida == 0) ){												
														ngNotify.set('La hora de visita '+ vm.Horavisita1 + ' no puede ser anterior a la hora de solicitud '+vm.HoraSolicitud , 'error');
														return;		
													}
													else  if( (vm.Fechavisita1 == fechaHoy) && (horaValida == 1) ){													
														obj.Visita1 = vm.Fechavisita1;
														obj.HV1 = vm.Horavisita1;
													}
													else if (vm.Fechavisita1 != fechaHoy) {
														obj.Visita1 = vm.Fechavisita1;
														obj.HV1 = vm.Horavisita1;
													}
												}else {
															obj.Visita1 = vm.Fechavisita1;
														obj.HV1 = vm.Horavisita1;											
												}										
	
										}							
									}
								}


								

								if (vm.Fechavisita2 != undefined && vm.Fechavisita2 != '') 									
								{	
									obj.Visita2 = vm.Fechavisita2;
									obj.HV2 = vm.Horavisita2;

									getDateToday();
									if( (vm.Fechavisita2 < vm.FechaSolicitud) || (vm.Fechavisita2 > fechaHoy)) {
										ngNotify.set('La fecha de visita no debe ser anterior a la fecha de solicitud ni posterior a la fecha actual', 'error');
										return;
									}
									else if ((vm.Fechavisita2 >= vm.FechaSolicitud) && (vm.Fechavisita2 <= fechaHoy))  {
										
										if (vm.Horavisita2 == undefined || vm.Horavisita2 == '')
										{	
												ngNotify.set('Seleccione la hora de visita 1', 'error');
												return;
										}
										else if (vm.Horavisita2 != undefined && vm.Horavisita2 != ''){
											var horaValida = validaHora(vm.Horavisita2);											

											if(vis2 == null || vis2 == undefined){
												if ( (vm.Fechavisita2 == fechaHoy) && (horaValida == 0) ){
												
													ngNotify.set('La hora de visita '+ vm.Horavisita2 + ' no puede ser anterior a la hora de solicitud '+ vm.HoraSolicitud , 'error');
													return;		
												}
												else if ((vm.Fechavisita2 == fechaHoy) && (horaValida == 1) )    
												{
													obj.Visita2 = vm.Fechavisita2;
													obj.HV2 = vm.Horavisita2;
												}	
											}else{
												obj.Visita2 = vm.Fechavisita2;
												obj.HV2 = vm.Horavisita2;
											}			
										}							
									}
								}

								if (vm.Fechavisita3 != undefined && vm.Fechavisita3 != '' )							
								{	
									obj.Visita1 = vm.Fechavisita1;
									obj.HV1 = vm.Horavisita1;
									obj.Visita2 = vm.Fechavisita2;
									obj.HV2 = vm.Horavisita2;
									getDateToday();
									if( (vm.Fechavisita3 < vm.FechaSolicitud) || (vm.Fechavisita3 > fechaHoy)) {
										ngNotify.set('La fecha de visita no debe ser anterior a la fecha de solicitud ni posterior a la fecha actual', 'error');
										return;
									}
									else if ((vm.Fechavisita3 >= vm.FechaSolicitud) && (vm.Fechavisita3 <= fechaHoy))  {

										if (vm.Horavisita3 == undefined || vm.Horavisita3 == '')
										{	
												ngNotify.set('Seleccione la hora de visita 3', 'error');
												return;
										}
										else if (vm.Horavisita3 != undefined && vm.Horavisita3 != ''){										
											var horaValida = validaHora(vm.Horavisita3);

											if(vis3 == null || vis3 == undefined){

												if ( (vm.Fechavisita3 == fechaHoy) && (horaValida == 0) ){
												
													ngNotify.set('La hora de visita '+ vm.Horavisita3 + ' no puede ser anterior a la hora de solicitud '+ vm.HoraSolicitud , 'error');
													return;		
												}
												else if ((vm.Fechavisita3 == fechaHoy) && (horaValida == 1) )    
												{
													obj.Visita3 = vm.Fechavisita3;
													obj.HV3 = vm.Horavisita3;
												}	
											}else{
												obj.Visita3 = vm.Fechavisita3;
												obj.HV3 = vm.Horavisita3;
											}	
										}							
									}
									//return;	
								}		
													
							}
							else {
								ngNotify.set('Seleccione un estatus', 'error');
							}							

							obj.Clv_Queja = vm.clv_queja;						
							obj.Status = vm.Estatus.Clave;
														
							
										
							if (vm.FechaProceso == undefined) {
								obj.FechaProceso = '';
								obj.HP = '';
							} else {
								obj.FechaProceso = vm.FechaProceso
								obj.HP = vm.HoraProceso;
							}

							obj.Visita = vm.Visita;

							obj.Clv_Tecnico = vm.Tecnico.clv_Tecnico;

							obj.clvProblema = vm.Problema.clvProblema;

							obj.clvPrioridadQueja = vm.Prioridad.clvPrioridadQueja;

							obj.Solucion = vm.ProblemaReal;						
					
							quejasFactory.UpdateQuejas(obj).then(function(data) {								
							
								if(data.UpdateQuejasResult == -1)
								{
										ngNotify.set('La orden se ha guardado correctamente.', 'success');
								}else {
										ngNotify.set('Ha surgido un error', 'error');
								}									
							});	
						
							// quejasFactory.UpdateQuejas(obj).then(function(data) {
							// 	ngNotify.set('La orden se ha guardado correctamente', 'success');
							// });
						} 
					});

				} else {

					ngNotify.set('La queja pertenece a un contrato de plazas adicionales al usuario, no puede ejecutarla', 'error');
				}
			});
		}

		function DescargaMaterial() {
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/ModalDescargaMaterial.html',
				controller: 'ModalDescargaMaterialCtrl',
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


		function abrirBonificacion() {		
			var detalle = {};
			detalle.Block = true;
			detalle.Queja = laClvQueja;
			detalle.Origen = 'btnEjec';
			detalle.Status = statusQueja;
			detalle.contratoBloqueado = contratoBloqueado;

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
					detalle: function() {
						return detalle;
					}
				}
			});
		}
	
		function validaHora( hora) {
			var horaSol, merSol, minSol, horaRes, merRes, minRes;
			merSol = vm.HoraSolicitud.substring(5,7);	
			horaSol = vm.HoraSolicitud.substring(0,2);
			minSol = vm.HoraSolicitud.substring(3,5);	
			merRes = hora.substring(6,9);	
			horaRes = hora.substring(0,2);
			minRes = hora.substring(3,5);	
			var res = 0;

			if (merRes == 'AM' || merRes =='am')
			{
				switch (horaRes){
					case '00':
						horaRes = '24';    break;
				    case '12':
			           horaRes = '24';    break;	
			       }
			}
			

			if ( merRes == 'PM' || merRes =='pm'){			
				switch (horaRes){
			   		case '13':
			            horaRes = '01'; break;
			        case '14':
			            horaRes = '02'; break;
			        case '15':
			            horaRes = '03'; break;
			        case '16':
			            horaRes = '04'; break;
			        case '17':
			            horaRes = '05';   break;
			        case '18':
			            horaRes = '06';  break;
			    	case '19':
			            horaRes = '07';  break;
			        case '20':
			            horaRes = '08';  break;
			        case '21':
			            horaRes = '09';  break;
			        case '22':
			            horaRes = '10';   break;
			        case '23':
			            horaRes = '11';   break;		
			        case '24':
			            horaRes = '12';   break;				
				}			
			}

			if((merSol == 'AM' || merSol == 'am') && ( merRes == 'AM' || merRes == 'am'))
			{				
				if (horaSol < horaRes)
				{
					res = 1;			
				}				
				else if(horaSol == horaRes){
					if(minSol <= minRes){
						res = 1;
					}
				}
			}
			else if((merSol == 'PM' || merSol == 'pm') && ( merRes == 'PM' || merRes == 'pm'))
			{
				if (horaSol < horaRes)
				{
					res = 1;			
				}
				else if(horaSol == horaRes){
					if(minSol <= minRes){
						res = 1;
					}
				}
			}
			else if((merSol == 'AM' || merSol == 'am') && ( merRes == 'PM' || merRes == 'pm'))
			{
				res = 1;
			}
			else if((merSol == 'PM' || merSol == 'pm') && ( merRes == 'AM' || merRes == 'am'))
			{
				//res = 0;
			}

			return res;
		}



		function getDateToday(){
			var today = new Date();
			var dd = today.getDate();
			var mes = today.getMonth()+1;
			var anio = today.getFullYear(); 
			var hh = today.getHours();
    		var min = today.getMinutes();
    		var merid;

			if( dd < 10 ) {
			    dd ='0'+dd;
			}
			if( mes < 10 ) {
			    mes ='0'+mes;
			}
    	 	if(hh >= 12){
    			merid = 'PM';
    		}
    		else if (hh < 12)
    		{
    			merid = 'AM'
    		}
    		if (min < 10){
    			min = '0'+min;
    		}

			switch (hh){
		   		case 13:
		            hh = '1'; break;
		        case 14:
		            hh = '2'; break;
		        case 15:
		            hh = '3';   break;
		        case 16:
		            hh = '4';  break;
		        case 17:
		            hh = '5';   break;
		        case 18:
		            hh = '6';  break;
		    	case 19:
		            hh = '7';  break;
		        case 20:
		            hh = '8';  break;
		        case 21:
		            hh = '9';  break;
		        case 22:
		            hh = '10';   break;
		        case 23:
		            hh = '11';   break;
		        case 0:
		            hh = '12';    break;			
			}

    		if( hh < 10 ) {
			    hh ='0'+hh;
			}

			fechaHoy = dd + '/' + mes + '/'+ anio;		
			horaHoy = hh +':'+ min + merid;	
			console.log(fechaHoy);
			console.log(horaHoy);
		}

		var vm = this;
		vm.Status = [{
				'Clave': 'P',
				'Nombre': 'Pendiente'
			},
			{
				'Clave': 'V',
				'Nombre': 'Con visita'
			},
			{
				'Clave': 'E',
				'Nombre': 'Ejecutada'
			},
			{
				'Clave': 'S',
				'Nombre': 'En Proceso'
			}
		];

		InitalData();
		vm.Titulo = 'Ejecutar Queja';
		vm.abrirBonificacion = abrirBonificacion;
		vm.CambiaEstatus = CambiaEstatus;
		vm.Ejecutaqueja = Ejecutaqueja;
		vm.DescargaMaterial = DescargaMaterial;
		vm.abrirBonificacion = abrirBonificacion;

		var contratoBuenoGlobal,   fechaHoy, horaHoy, vis1, vis2, vis3;
		var laClvQueja = $stateParams.id;
		var contratoBloqueado = 0;
		var statusQueja = '';

		var quejaObj =  [{
					'Clv_Queja': $stateParams.id,
					'Status': $stateParams.contrato,
					'Fecha_Ejecucion': $stateParams.servicio	}];
	});




/*'use strict';
angular
	.module('softvApp')
	.controller('QuejaEjecutaCtrl', function($state, ngNotify, $location, $uibModal, $stateParams, atencionFactory, quejasFactory) {

		function InitalData() {

			vm.clv_queja = $stateParams.id;
			vm.contrato = $stateParams.contrato;
			vm.Servicio = $stateParams.servicio;
			quejasFactory.ValidaQueja(vm.clv_queja).then(function(data) {
				if (data.GetDeepValidaQuejaCompaniaAdicResult.Valida == 0) {
					var param = {};
					param.contrato = vm.contrato;
					param.servicio = vm.Servicio;
					param.op = 0;
					atencionFactory.buscarCliente(param).then(function(data) {

						var detalle = data.GetuspBuscaContratoSeparado2ListResult[0];
						var contrato = detalle.ContratoBueno;
						vm.GlobalContrato = contrato;
						vm.NombreCliente = detalle.Nombre + detalle.Apellido_Paterno + " " + detalle.Apellido_Materno;
						vm.Calle = detalle.CALLE;
						vm.Numero = detalle.NUMERO;
						vm.Colonia = detalle.COLONIA;
						vm.Ciudad = detalle.CIUDAD;
						atencionFactory.getServiciosCliente(contrato).then(function(data) {
							vm.ServiciosCliente = data.GetDameSerDelCliFacListResult;

							quejasFactory.ConsultaQueja($stateParams.id).then(function(data) {
								var detqueja = data.GetQuejasListResult[0];
								console.log(detqueja);
								vm.UsuarioGenero = detqueja.UsuarioGenero;
								vm.UsuarioEjecuto = detqueja.UsuarioEjecuto;
								vm.TecnicoAgenda = detqueja.NombreTecAge;
								vm.TurnoAgenda = detqueja.TurnoAge;
								vm.FechaAgenda = detqueja.FechaAge;
								vm.ComentarioAgenda = detqueja.ComentarioAge;
								vm.DetalleProblema = detqueja.Problema;
								vm.Observaciones = detqueja.Observaciones;
								vm.DetalleSolucion = detqueja.Solucion;
								//dateParse('04/01/2017');
								var fsolicitud = detqueja.Fecha_Soliciutud.split(' ');
								vm.FechaSolicitud = fsolicitud[0];
								var hora = getTime(detqueja.Fecha_Soliciutud);
								vm.HoraSolicitud = hora;

								if (detqueja.Fecha_Ejecucion != null) {
									var fejecucion = detqueja.Fecha_Ejecucion.split(' ');
									console.log(fejecucion);
									vm.FechaEjecucion = fejecucion[0];
									var horaEjecucion = getTime(detqueja.Fecha_Ejecucion);
									vm.HoraEjecucion = horaEjecucion;
								}
								if (detqueja.FechaProceso != null) {
									console.log(detqueja.FechaProceso);
									var fproceso = detqueja.FechaProceso.split(' ');
									vm.FechaProceso = fproceso[0];
									vm.HoraProceso = getTime(detqueja.FechaProceso);
								}
								if (detqueja.Visita1 != null) {

									var fvisita1 = detqueja.Visita1.split(' ');
									console.log(fvisita1[0]);
									vm.Fechavisita1 = fvisita1[0];
									vm.Horavisita1 = getTime(detqueja.Visita1);
								}
								if (detqueja.Visita2 != null) {

									var fvisita2 = detqueja.Visita2.split(' ');
									console.log(fvisita2[0]);
									vm.Fechavisita2 = fvisita2[0];
									vm.Horavisita2 = getTime(detqueja.Visita2);
								}
								if (detqueja.Visita3 != null) {

									var fvisita3 = detqueja.Visita3.split(' ');
									console.log(fvisita3[0]);
									vm.Fechavisita3 = fvisita3[0];
									vm.Horavisita3 = getTime(detqueja.Visita3);
								}

								if (detqueja.EjecucuionReal != null) {
									var fEjecucuionReal = detqueja.EjecucuionReal.split(' ');
									console.log(fEjecucuionReal[0]);
									vm.FechaEjecucuionReal = fEjecucuionReal[0];
									vm.HoraEjecucuionReal = getTime(detqueja.EjecucuionReal);
								}

								vm.Departamento = detqueja.Clasificacion;
								vm.Clv_trabajo = detqueja.Clv_Trabajo;
								vm.Clv_prioridad = detqueja.clvPrioridadQueja;
								vm.Clv_problema = detqueja.clvProblema;
								vm.ProblemaReal = detqueja.Solucion;
								//detqueja.Visita
								vm.Visita = detqueja.Visita;
								vm.Clv_status = detqueja.Status;
								for (var t = 0; t < vm.Status.length; t++) {
									if (vm.Status[t].Clave == vm.Clv_status) {
										vm.Estatus = vm.Status[t];
										Bloqueo(true);
									}
								}


								quejasFactory.ObtenTecnicos(vm.GlobalContrato).then(function(data) {
									vm.Tecnicos = data.GetMuestra_Tecnicos_AlmacenListResult;
									if (detqueja.Clave_Tecnico != null) {
										for (var a = 0; a < vm.Tecnicos.length; a++) {
											if (vm.Tecnicos[a].clv_Tecnico == detqueja.Clave_Tecnico) {
												vm.Tecnico = vm.Tecnicos[a];
											}
										}
									}
								});

								atencionFactory.MuestraTrabajos(vm.Servicio).then(function(data) {
									vm.Trabajos = data.GetMUESTRATRABAJOSQUEJASListResult;
									for (var a = 0; a < vm.Trabajos.length; a++) {
										if (vm.Trabajos[a].CLV_TRABAJO == vm.Clv_trabajo) {
											vm.Trabajo = vm.Trabajos[a];
										}
									}
								});

								quejasFactory.ObtenPrioridad().then(function(data) {
									vm.Prioridades = data.GetSoftv_GetPrioridadQuejaListResult;
									for (var a = 0; a < vm.Prioridades.length; a++) {
										if (vm.Prioridades[a].clvPrioridadQueja == vm.Clv_prioridad) {
											vm.Prioridad = vm.Prioridades[a];
										}
									}
								});
								atencionFactory.getServicios().then(function(data) {
									vm.Servicios = data.GetMuestraTipSerPrincipalListResult;
									for (var a = 0; a < vm.Servicios.length; a++) {
										if (vm.Servicios[a].Clv_TipSerPrincipal == vm.Servicio) {
											vm.Servicio = vm.Servicios[a];
										}
									}
								});

								atencionFactory.GetClasificacionProblemas().then(function(data) {
									vm.Problemas = data.GetuspConsultaTblClasificacionProblemasListResult;
									for (var a = 0; a < vm.Problemas.length; a++) {
										if (vm.Problemas[a].clvProblema == vm.Clv_problema) {
											vm.Problema = vm.Problemas[a];
										}
									}
								});

							});

						});



					});
				} else {
					$state.go('home.procesos.reportes');
					ngNotify.set('La Queja pertenece  a un contrato de plazas adicionales al usuario, no puede ejecutarla', 'error');
				}
			});
		}

		function dateParse(date) {
			var realdate = date.split(" ")
			var strDate = realdate[0];
			console.log(strDate);
			var dateParts = strDate.split("/");
			console.log(dateParts);
			var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
			console.log(dateParts[0].length)
			console.log(dateParts[1].length)
			console.log(dateParts[2].length)
			if (dateParts[0].length == 1) {
				var dia = '0' + ateParts[0];
				console.log(dia);
			}
			console.log(date);
		}


		function getTime(date) {
			var fejecucion = date.split(' ');
			console.log(fejecucion);
			if (fejecucion.length == 3) {
				return fejecucion[2];
			} else if (fejecucion.length == 4) {
				var hora = fejecucion[3].split(':');
				if (hora[0].length == 1) {
					return '0' + fejecucion[3];
				} else {
					return fejecucion[3];
				}

			}
		}


		function abrirBonificacion() {
			var detalle = {};
			detalle.Block = true;
			detalle.Queja = object.Clv_Queja;

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
					detalle: function() {
						return detalle;
					}
				}
			});
		}




		function Bloqueo(aplicabloqueo) {

			if (vm.Estatus.Clave == 'E') {
				if (aplicabloqueo == true) {
					vm.BtnGuarda = false;
					vm.FEjecucion = true;
					vm.FVisita1 = true;
					vm.FVisita2 = true;
					vm.FVisita3 = true;
					vm.FProceso = true;
					vm.Itrabajo = true
					vm.Iprioridad = true;
					vm.IDetProblema = true;
					vm.IClasproblema = true;
					vm.Iprobreal = true;
					vm.Iobser = true;
					vm.IEstatus = true;
					vm.Iejecucion = 'input-yellow';
					vm.Ivisita = 'input-normal';
					vm.Iproceso = 'input-normal';
					vm.ISelectEstatus = 'input-normal';
				} else {
					vm.BtnGuarda = true;
					vm.FEjecucion = false;
					vm.FVisita1 = true;
					vm.FVisita2 = true;
					vm.FVisita3 = true;
					vm.FProceso = true;
					vm.Itrabajo = true
					vm.Iprioridad = false;
					vm.IDetProblema = true;
					vm.IClasproblema = true;
					vm.Iprobreal = false;
					vm.Iobser = false;
					vm.IEstatus = false;
					vm.Iejecucion = 'input-yellow';
					vm.Ivisita = 'input-normal';
					vm.Iproceso = 'input-normal';
				}

			} else if (vm.Estatus.Clave == 'P') {
				vm.BtnGuarda = false;
				vm.FEjecucion = true;
				vm.FVisita1 = true;
				vm.FVisita2 = true;
				vm.FVisita3 = true;
				vm.FProceso = true;
				vm.Itrabajo = false
				vm.Iprioridad = false;
				vm.IDetProblema = true;
				vm.IClasproblema = true;
				vm.Iprobreal = false;
				vm.Iobser = false;
				vm.IEstatus = false;
				vm.Iejecucion = 'input-yellow';
				vm.Ivisita1 = 'input-normal';
				vm.Ivisita2 = 'input-normal';
				vm.Ivisita3 = 'input-normal';
				vm.Iproceso = 'input-normal';
				vm.ISelectEstatus = 'input-yellow';
			} else if (vm.Estatus.Clave == 'V') {
				vm.BtnGuarda = true;
				vm.FEjecucion = true;
				vm.FVisita1 = (vm.visita1 == '') ? true : false;
				vm.FVisita2 = (vm.visita2 == '') ? true : false;
				vm.FVisita3 = (vm.visita3 == '') ? true : false;
				vm.FProceso = true;
				vm.Itrabajo = false
				vm.Iprioridad = false;
				vm.IDetProblema = true;
				vm.IClasproblema = true;
				vm.Iprobreal = false;
				vm.Iobser = false;
				vm.IEstatus = false;
				vm.Iejecucion = 'input-normal';
				vm.Ivisita1 = 'input-yellow';
				vm.Ivisita2 = 'input-yellow';
				vm.Ivisita3 = 'input-yellow';
				vm.Iproceso = 'input-normal';
				vm.ISelectEstatus = 'input-normal';
			} else if (vm.Estatus.Clave == 'S') {
				vm.BtnGuarda = true;
				vm.FEjecucion = true;
				vm.FVisita1 = true;
				vm.FVisita2 = true;
				vm.FVisita3 = true;
				vm.FProceso = false;
				vm.Itrabajo = false
				vm.Iprioridad = false;
				vm.IDetProblema = true;
				vm.IClasproblema = true;
				vm.Iprobreal = false;
				vm.Iobser = false;
				vm.IEstatus = false;
				vm.Iejecucion = 'input-normal';
				vm.Ivisita1 = 'input-normal';
				vm.Ivisita2 = 'input-normal';
				vm.Ivisita3 = 'input-normal';
				vm.Iproceso = 'input-yellow';
				vm.ISelectEstatus = 'input-normal';
			} else {
				alert('Ninguna');
			}
		}

		function CambiaEstatus() {
			Bloqueo(false);
		}

		function Ejecutaqueja() {
			quejasFactory.ValidaQueja(vm.clv_queja).then(function(data) {
				console.log(data);
				if (data.GetDeepValidaQuejaCompaniaAdicResult.Valida == 0) {
					quejasFactory.BuscaBloqueado(vm.GlobalContrato).then(function(bloqueado) {
						console.log(bloqueado);
						if (bloqueado.GetDeepBuscaBloqueadoResult.Bloqueado == 0) {
							if (vm.Estatus.Clave == 'P') {
								if (vm.FechaEjecucion == undefined) {
									ngNotify.set('Seleccione la fecha de ejecución', 'error');
									return;
								}

							} else if (vm.Estatus.Clave == 'V') {
								if (vm.visita1 == undefined && vm.visita2 == undefined && vm.visita3 == undefined) {
									ngNotify.set('Seleccione la fecha de visita', 'error');
								}

							} else if (vm.Estatus.Clave == 'S') {
								if (vm.FechaProceso == undefined) {
									ngNotify.set('Seleccione la fecha de proceso', 'error');
								}
							} else {
								ngNotify.set('Seleccione un estatus', 'error');
							}


							alert('here');
							var obj = {};
							console.log(obj);
							obj.Clv_Queja = vm.clv_queja;
							console.log(obj);
							obj.Status = vm.Estatus.Clave;
							console.log(obj);
							obj.Fecha_Ejecucion = vm.FechaEjecucion;
							console.log(obj);
							if (vm.visita1 == undefined) {
								obj.Visita1 = '';
							} else {
								obj.Visita1 = vm.visita1;
							}
							console.log(obj);
							if (vm.visita2 == undefined) {
								obj.Visita2 = '';
							} else {
								obj.Visita2 = vm.visita2
							}
							console.log(obj);
							if (vm.visita3 == undefined) {
								obj.Visita3 = '';
							} else {
								obj.Visita3 = vm.visita3
							}


							obj.HV1 = '';
							obj.HV2 = '';
							obj.HV3 = '';
							obj.FechaProceso = vm.FechaProceso;
							obj.HP = '';
							obj.Visita = vm.Visita;
							obj.Clv_Tecnico = vm.Tecnico.clv_Tecnico;
							obj.clvProblema = vm.Problema.clvProblema;
							obj.clvPrioridadQueja = vm.Prioridad.clvPrioridadQueja;
							obj.Solucion = vm.ProblemaReal;

							console.log(obj);
							// quejasFactory.UpdateQuejas(obj).then(function(data) {
							// 	ngNotify.set('La orden se ha guardado correctamente', 'success');
							// });

						} else {
							ngNotify.set('El cliente, ha sido bloqueado, por lo que no se podrá ejecutar la orden', 'error');
						}
					});

				} else {

					ngNotify.set('La Queja pertenece  a un contrato de plazas adicionales al usuario, no puede ejecutarla', 'error');
				}
			});
		}

		function DescargaMaterial() {
			var modalInstance = $uibModal.open({
				animation: vm.animationsEnabled,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/procesos/ModalDescargaMaterial.html',
				controller: 'ModalDescargaMaterialCtrl',
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
		var vm = this;
		vm.Status = [{
				'Clave': 'P',
				'Nombre': 'Pendiente'
			},
			{
				'Clave': 'V',
				'Nombre': 'Con visita'
			},
			{
				'Clave': 'E',
				'Nombre': 'Ejecutada'
			},
			{
				'Clave': 'S',
				'Nombre': 'En Proceso'
			}
		];

		InitalData();
		vm.Titulo = 'Ejecutar Queja';
		vm.abrirBonificacion = abrirBonificacion;
		vm.CambiaEstatus = CambiaEstatus;
		vm.Ejecutaqueja = Ejecutaqueja;
		vm.DescargaMaterial = DescargaMaterial;


	});
*/