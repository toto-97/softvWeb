'use strict';
angular
	.module('softvApp')
	.controller('ModalCambioDomicilioInternetCtrl', function ($uibModalInstance, cajasFactory, items, $rootScope, ngNotify, ContratoMaestroFactory) {

		/// Muestra las ciudades desde el factory
		function initialData() {
			cajasFactory.dameCiudades(items.Contrato).then(function (data) {
				vm.ciudades = data.GetCiudadCAMDOListResult;
			});
		}

		/// Muestra las ciudades para su cambio
		function changeCiudad() {
			cajasFactory.dameLocalidades(items.Contrato, vm.selectedCiudad.Clv_Ciudad).then(function (data) {
				vm.localidades = data.GetLocalidadCAMDOListResult;
			});
		}

		/// Muestra las colonias para su cambio
		function changeLocalidad() {
			cajasFactory.dameColonias(items.Contrato, vm.selectedLocalidad.Clv_Localidad).then(function (data) {
				vm.colonias = data.GetColoniaCAMDOListResult;
			});
		}

		/// Muestra las calles para su cambio
		function changeColonia() {
			cajasFactory.dameCalles(items.Contrato, vm.selectedColonia.CLV_COLONIA).then(function (data) {
				vm.calles = data.GetCalleCAMDOListResult;
			});
		}

		/// Reliza los cambios hechos por el usuario
		function ok() {
			//Vamos a validar las coordenadas
			if (vm.latitud != undefined && vm.longitud != undefined) {

				var latS = vm.latitud.split(".");
				var lonS = vm.longitud.split(".");
				if (latS[1].length < 6 || lonS[1].length < 6) {
					ngNotify.set('Las coordenadas tienen que tener por lo menos 6 decimales.', 'error');
				}
				else {
					var paramValida = {};
					paramValida.Longitud = vm.longitud;
					paramValida.Latitud = vm.latitud;
					paramValida.Contrato = items.Contrato;
					ContratoMaestroFactory.GetValidaCoordenadasCAMDO(paramValida).then(function (dataValida) {
						vm.ValidaCoordenadas = dataValida.GetValidaCoordenadasCAMDOResult;
						console.log('vm.ValidaCoordenadas',vm.ValidaCoordenadas);
						if (vm.ValidaCoordenadas.Cobertura == 1) {
							//Vamos a guardar la calle en caso que se haya elegido capturar la calle
							if (vm.MuestraCapturaCalle) {
								var paramGuardaCalle = {
									'Contrato': items.Contrato,
									'Clv_Ciudad': vm.selectedCiudad.Clv_Ciudad,
									'Clv_Localidad': vm.selectedLocalidad.Clv_Localidad,
									'Clv_Colonia': vm.selectedColonia.CLV_COLONIA,
									'CalleNombre': vm.NombreCalle
								};
								ContratoMaestroFactory.GetGuardarCalleNuevaCAMDO(paramGuardaCalle).then(function (data) {
									var paramAddCAMDO = {
										'entity_CAMDOFAC': {
											'Clv_Sesion': items.Session,
											'CONTRATO': items.Contrato,
											'Clv_Calle': data.GetGuardarCalleNuevaCAMDOResult,
											'NUMERO': vm.numero,
											'Num_int': vm.numeroInterior,
											'ENTRECALLES': vm.entreCalles,
											'Clv_Colonia': vm.selectedColonia.CLV_COLONIA,
											'Clv_Localidad': vm.selectedLocalidad.Clv_Localidad,
											'TELEFONO': vm.telefono,
											'ClvTecnica': 0,
											'Clv_Ciudad': vm.selectedCiudad.Clv_Ciudad,
											'Clv_Sector': 0,
											'Latitud': vm.latitud,
											'Longitud': vm.longitud,
											'IdProveedorNew': vm.ValidaCoordenadas.IdProveedorNew,
											'Id_beam_paqueteNew': vm.ValidaCoordenadas.Id_beam_paqueteNew,
											'CambiaSAN': vm.ValidaCoordenadas.CambiaSAN//,
											//'CambiaServicio': vm.ValidaCoordenadas.CambiaServicio
										}
									};
									ContratoMaestroFactory.GetNUECAMDOFACnoInt(paramAddCAMDO).then(function (data) {
										cajasFactory.addAdicionales(items.Session, items.Texto, items.Contrato, items.Tipo).then(function (data) {
											$uibModalInstance.dismiss('cancel');
											$rootScope.$emit('realoadPagos', {});
										});
									});
								});
							}
							else {
								var paramAddCAMDO = {
									'entity_CAMDOFAC': {
										'Clv_Sesion': items.Session,
										'CONTRATO': items.Contrato,
										'Clv_Calle': vm.selectedCalle.Clv_calle,
										'NUMERO': vm.numero,
										'Num_int': vm.numeroInterior,
										'ENTRECALLES': vm.entreCalles,
										'Clv_Colonia': vm.selectedColonia.CLV_COLONIA,
										'Clv_Localidad': vm.selectedLocalidad.Clv_Localidad,
										'TELEFONO': vm.telefono,
										'ClvTecnica': 0,
										'Clv_Ciudad': vm.selectedCiudad.Clv_Ciudad,
										'Clv_Sector': 0,
										'Latitud': vm.latitud,
										'Longitud': vm.longitud,
										'IdProveedorNew': vm.ValidaCoordenadas.IdProveedorNew,
										'Id_beam_paqueteNew': vm.ValidaCoordenadas.Id_beam_paqueteNew//,
										//'CambiaSAN': vm.ValidaCoordenadas.CambiaSAN
									}
								};
								ContratoMaestroFactory.GetNUECAMDOFACnoInt(paramAddCAMDO).then(function (data) {
									cajasFactory.addAdicionales(items.Session, items.Texto, items.Contrato, items.Tipo).then(function (data) {
										$uibModalInstance.dismiss('cancel');
										$rootScope.$emit('realoadPagos', {});
									});
								});
							}
						}
						else {
							ngNotify.set('No existe cobertura en las coordenadas ingresadas.', 'error');
						}
					});
				}
			}
		}

		/// Cancela el moviemiento
		function cancel() {
			cajasFactory.cancelarDomicilio(items.Session, items.Contrato).then(function (data) {
				$uibModalInstance.dismiss('cancel');
				$rootScope.$emit('realoadPagos', {});
			});
		}

		/// Guarda la calle que capture el usuario
		function CapturaCalle() {
			vm.MuestraCapturaCalle = true;
			console.log('CapturaCalle', vm.MuestraCapturaCalle);
		}

		/// Selecciona una calle para el cambio
		function SeleccionaCalle() {
			vm.MuestraCapturaCalle = false;
			console.log('SeleccionaCalle', vm.MuestraCapturaCalle);
		}

		var vm = this;
		vm.cancel = cancel;
		vm.changeCiudad = changeCiudad;
		vm.changeLocalidad = changeLocalidad;
		vm.changeColonia = changeColonia;
		vm.ok = ok;
		vm.MuestraCapturaCalle = false;
		vm.CapturaCalle = CapturaCalle;
		vm.SeleccionaCalle = SeleccionaCalle;
		initialData();
	});
