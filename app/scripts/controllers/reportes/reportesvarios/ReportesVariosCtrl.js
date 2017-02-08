'use strict';
angular.module('softvApp')
	.controller('ReportesVariosCtrl', function($state, ngNotify, reportesVariosFactory, globalService) // servicio
		{
			//$scope.unavariable = elservicio.getData();
			//reportesVariosFactory.ejemplo();
			//ngNotify.set(reportesVariosFactory.ejemplo() + ' ',	{type:'error'});
			//reportesVariosFactory.mostrarTipServ();
			//ngNotify.set(reportesVariosFactory.mostrarTipServ() + ' ', {type:'error'});
			//---------------------------------

			var vm = this;

			//-----------------------------------------------------------------
			// inicializa botones del menú de Reportes

			vm.cleanArray = cleanArray;
			vm.showOpcion = showOpcion;
			vm.changeBgColor = changeBgColor;
			vm.soloInternet_esconde = true; //esconde div
			//------------------------------
			vm.pdistribuidores = true; //no mostrar
			vm.pplazas = true; //no mostrar
			vm.pestados = true;
			vm.pciudades = true;
			vm.plocalidades = true;
			vm.pcolonias = true;
			vm.pserviciosInternet = true;
			vm.pserviciosDigital = true;
			vm.ptipoclientes = true;
			vm.pperiodos = true;
			vm.prangosfecha = true;
			vm.pmesanio = true;
			vm.pcalles = true;
			vm.pstatus = true;
			vm.preporte = true;

			//Inicializa variables
			var servicioSeleccionado = 3;
			vm.reporteSeleccionado = 1; //value del reporte seleccionado
			vm.principales = false; //se muestra para digital

			var objPrincipal = {};
			var objRangoFechas = {};
			var estatusCliente = {};
			var objParametros = {};
			//$('#anioC').val(''); $('#anioC2').val(''); //revisar

			var Distribuidores = [];
			var Plazas = [];
			var Estados = [];
			var Ciudades = [];
			var Localidades = [];
			var Colonias = [];
			var Calles = [];
			var Periodos = [];
			var ServiciosInternet = [];
			var ServiciosDigital = [];
			var TipoClientes = [];
			var Motcan = [];
			var Motcan2 = []; //Modal Seleccion de Status de cliente

			var DistribuidoresTodos = [];
			var PlazasTodos = [];
			var EstadosTodos = [];
			var CiudadesTodos = [];
			var LocalidadesTodos = [];
			var ColoniasTodos = [];
			var CallesTodos = [];
			var PeriodosTodos = [];
			var ServiciosInternetTodos = [];
			var ServiciosDigitalTodos = [];
			var TipoClientesTodos = [];

			var buscaOnovar = 0;
			vm.botonRegresar = true; //oculta
			vm.divMotivoCancelacion1 = true;

			var clv_usuario = 1; //siste, RECIBIR
			var banderas = {};
			banderas.clv_usuario = clv_usuario;
			banderas.banderaDistribuidor = 0;
			banderas.banderaCiudad = 0;
			banderas.banderaLocalidad = 0;
			banderas.banderaColonia = 0;
			banderas.banderaCalle = 0; // estado del checkbox
			banderas.banderaTodoSeleccionado = 0;


			vm.serviciosdi = [{
					name: 'Tv Digital',
					value: '3'
				}, //0
				{
					name: 'Internet',
					value: '2'
				} //1
			];
			vm.ServicioDigitalInternet = vm.serviciosdi[0].value; //index 0 como predeterminado

			vm.soloInternet_esconde = true; //esconde div
			vm.changedValue = function(item) {
				servicioSeleccionado = vm.ServicioDigitalInternet;

				if (servicioSeleccionado == 3) //Digital, no muestra div
				{
					vm.soloInternet_esconde = true; //se oculta
					vm.principales = false; // sí se muestra      //  muestra botón del reporte 'contrataciones principales' //NO BORRAR
				} else if (servicioSeleccionado == 2) // Internet, muestra div
				{
					vm.soloInternet_esconde = false; //se muestra
					vm.principales = true; // NO se muestra, esconde botón del reporte 'contrataciones principales'  // NO BORRAR
				}
			}

			vm.fechaInicial = new Date();
			vm.fechaFinal = new Date();

			vm.motcan1 = 0; // set selected value to a particular value
			vm.motcan2 = 0; // set selected value to a particular value

			//Valida input numérico
			vm.anioC = {
				value: 2010
			};
			vm.anioC2 = {
				value: 2010
			};

			vm.meses = [{
					name: 'Enero',
					value: '1'
				},
				{
					name: 'Febrero',
					value: '2'
				},
				{
					name: 'Marzo',
					value: '3'
				},
				{
					name: 'Abril',
					value: '4'
				},
				{
					name: 'Mayo',
					value: '5'
				},
				{
					name: 'Junio',
					value: '6'
				},
				{
					name: 'Julio',
					value: '7'
				},
				{
					name: 'Agosto',
					value: '8'
				},
				{
					name: 'Septiembre',
					value: '9'
				},
				{
					name: 'Octubre',
					value: '10'
				},
				{
					name: 'Noviembre',
					value: '11'
				},
				{
					name: 'Diciembre',
					value: '12'
				}
			];

			vm.ultimoMesModel = vm.meses[0].value; //  $scope.meses[0].value; //index 0 como predeterminado

			vm.menores = [{
					name: 'Menor o igual',
					value: '1'
				},
				{
					name: 'Igual',
					value: '2'
				}
			];
			vm.menoresModel = vm.menores[0].value;
			vm.divMotivoCancelacion1 = true; //se oculta



			//inicializa botones del menú de Reportes

			vm.myButton1 = 'btn-info active';
			vm.reporteSeleccionado = 1;
			vm.myButton2 = 'btn-default';
			vm.myButton3 = 'btn-default';
			vm.myButton4 = 'btn-default';
			vm.myButton5 = 'btn-default';
			vm.myButton6 = 'btn-default';
			vm.myButton7 = 'btn-default';
			vm.myButton8 = 'btn-default';
			vm.myButton9 = 'btn-default';
			vm.myButton10 = 'btn-default';
			vm.myButton11 = 'btn-default';
			vm.myButton12 = 'btn-default';
			vm.myButton13 = 'btn-default';
			vm.myButton14 = 'btn-default';

			//---------------------------------------------


			function cleanArray() {

				objPrincipal = {};
				objRangoFechas = {};
				estatusCliente = {};
				objParametros = {};
				objParametros.conectado = 0, objParametros.Fuera = 0, objParametros.Susp = 0, objParametros.Insta = 0,
					objParametros.Desconect = 0, objParametros.DescTmp = 0, objParametros.baja = 0;
				vm.anioC = {
					value: 2010
				};
				vm.anioC2 = {
					value: 2010
				};

				Distribuidores = [];
				Plazas = [];
				Estados = [];
				Ciudades = [];
				Localidades = [];
				Colonias = [];
				Calles = [];
				Periodos = [];
				ServiciosInternet = [];
				ServiciosDigital = [];
				TipoClientes = [];
				Motcan = [];
				Motcan2 = [];

				DistribuidoresTodos = [];
				PlazasTodos = [];
				EstadosTodos = [];
				CiudadesTodos = [];
				LocalidadesTodos = [];
				ColoniasTodos = [];
				CallesTodos = [];
				PeriodosTodos = [];
				ServiciosInternetTodos = [];
				ServiciosDigitalTodos = [];
				TipoClientesTodos = [];

				vm.botonRegresar = true; //oculta
				vm.divMotivoCancelacion1 = true; //se oculta

				clv_usuario = 1; //siste
				banderas = {};
				banderas.clv_usuario = clv_usuario;
				banderas.banderaDistribuidor = 0;
				banderas.banderaCiudad = 0;
				banderas.banderaLocalidad = 0;
				banderas.banderaColonia = 0;
				banderas.banderaCalle = 0; // estado del checkbox
				banderas.banderaTodoSeleccionado = 0;

				// ListaTipser(); ListaDistribuidores();
				// ListaServiciosInternet(); ListaServiciosDigital();
				// ListaTipoClientes(); ListaPeriodos();
				// ListaMotcan(); ListaMotcan2();

				vm.fechaInicial = new Date();
				vm.fechaFinal = new Date();

				vm.search = null;
				vm.inicializaCheckbox(); //INICIALIZAR TODOS LOS CHECKBOX

			}


			vm.inicializaCheckbox = inicializaCheckbox;

			function inicializaCheckbox() {

				pla = 0, est = 0, coloni = 0, sinter = 0, sdig = 0, tipo = 0, peri = 0;

				vm.d = {
					checked: false
				}
				vm.p = {
					checked: false
				}
				vm.e = {
					checked: false
				}
				vm.c = {
					checked: false
				}
				vm.l = {
					checked: false
				}
				vm.o = {
					checked: false
				}
				vm.a = {
					checked: false
				}
				vm.r = {
					checked: false
				}
				vm.t = {
					checked: false
				}
				vm.si = {
					checked: false
				}
				vm.sd = {
					checked: false
				}
				vm.x = {
					checked: false
				} //hijos

				//-------- status cliente
				vm.staC = {
					checked: false
				}
				vm.staF = {
					checked: false
				}
				vm.staS = {
					checked: false
				}
				vm.staI = {
					checked: false
				}
				vm.staD = {
					checked: false
				}
				vm.statN = {
					checked: false
				}
				vm.statT = {
					checked: false
				}
				//-------busca o no
				vm.buscaOno = {
					checked: false
				}
				buscaOnovar = 0;
			}



			vm.statusCancel = statusCancel;

			function statusCancel() {

				if (objParametros.baja == 1) //checked
				{
					vm.divMotivoCancelacion1 = true; //se oculta
					//---------------------------------------------------------------
					objParametros.baja = 0;
					estatusCliente.motivoCancelacion = 0; //id opcion seleccionada

				} else if (objParametros.baja == 0) // not checked
				{
					vm.divMotivoCancelacion1 = false; //se muestra
					//---------------------------------------------------------------
					objParametros.baja = 1;
					estatusCliente.motivoCancelacion = vm.motcan2; //$("#selectMotcan2").val(); //id del motivo
				}
			}









			function showOpcion() {


				vm.z = {
					checked: false
				} //filtro todos, filtro cada uno
				vm.search = null; //limpia barra búsqueda
				vm.botonRegresar = true; //no muestra

				vm.pdistribuidores = true; //no mostrar
				vm.pplazas = true; //no mostrar
				vm.pestados = true;
				vm.pciudades = true;
				vm.plocalidades = true;
				vm.pcolonias = true;
				vm.pserviciosInternet = true;
				vm.pserviciosDigital = true;
				vm.ptipoclientes = true;
				vm.pperiodos = true;
				vm.prangosfecha = true;
				vm.pmesanio = true;
				vm.pcalles = true;
				vm.pstatus = true;
				vm.preporte = true;
			}


			vm.elMenu = elMenu

			function elMenu() {
				vm.myButton1 = 'btn-default';
				vm.myButton2 = 'btn-default';
				vm.myButton3 = 'btn-default';
				vm.myButton4 = 'btn-default';
				vm.myButton5 = 'btn-default';
				vm.myButton6 = 'btn-default';
				vm.myButton7 = 'btn-default';
				vm.myButton8 = 'btn-default';
				vm.myButton9 = 'btn-default';
				vm.myButton10 = 'btn-default';
				vm.myButton11 = 'btn-default';
				vm.myButton12 = 'btn-default';
				vm.myButton13 = 'btn-default';
				vm.myButton14 = 'btn-default';
			}






			function changeBgColor(valReporte) {

				vm.elMenu();

				switch (valReporte) {
					case 1:
						vm.myButton1 = "btn-info active";
						break;
					case 2:
						vm.myButton2 = "btn-info active";
						break;
					case 3:
						vm.myButton3 = "btn-info active";
						break;
					case 4:
						vm.myButton4 = "btn-info active";
						break;
					case 5:
						vm.myButton5 = "btn-info active";
						break;
					case 6:
						vm.myButton6 = "btn-info active";
						break;
					case 7:
						vm.myButton7 = "btn-info active";
						break;
					case 8:
						vm.myButton8 = "btn-info active";
						break;
					case 9:
						vm.myButton9 = "btn-info active";
						break;
					case 10:
						vm.myButton10 = "btn-info active";
						break;
					case 11:
						vm.myButton11 = "btn-info active";
						break;
					case 12:
						vm.myButton12 = "btn-info active";
						break;
					case 13:
						vm.myButton13 = "btn-info active";
						break;
					case 14:
						vm.myButton14 = "btn-info active";
						break;
				}

				vm.reporteSeleccionado = valReporte;
				vm.cleanArray();
				vm.showOpcion();
				vm.pdistribuidores = false; //mostrar

			}



			// 1.- DISTRIBUIDORES
			vm.filtroDistribuidores = filtroDistribuidores;

			function filtroDistribuidores() {
				var Distribuidores = ["Saab", "Volvo"]; //---- llena arreglo //	Distribuidores.length=0;
				ngNotify.set('filtro distribuidores!', {
					type: 'error'
				});
				//Si el array Distribuidores está vacío, no pasar al siguiente modal

				if (Distribuidores.length == 0) {
					ngNotify.set('Seleccione al menos un distribuidor', {
						type: 'error'
					});
				} else //array no vacío
				{
					if (banderas.banderaTodoSeleccionado == 1) {

						showServiciosDI(); //va a servicios <--

					} else { // sigue orden normal

						showplazas(); //muestra siguiente modal
					}
				}

			}


			// 2.- PLAZAS
			vm.showplazas = showplazas;

			function showplazas() {

				ngNotify.set('showplazas!');
				vm.search = ""; //limpia barra búsqueda
				vm.pplazas = false; //show
				vm.pdistribuidores = true; //hide
				//	ListaPlazas();
			}


			// 3.- ESTADOS

			vm.showEstados = showEstados;

			function showEstados() {
				var Plazas = ["Saab", "Volvo"]; //---- llena arreglo
				ngNotify.set('ESTADOS!');

				if (Plazas.length == 0) //Si el array Distribuidores está vacío, no pasar al siguiente modal
				{
					ngNotify.set('Seleccione al menos una plaza', {
						type: 'error'
					});
				} else {

					vm.search = null; //limpia barra búsqueda
					vm.pplazas = true;
					vm.pdistribuidores = true;
					vm.pestados = false; //show
					//  ListaEstados();
				}
			}

			// 4.- CIUDADES


			vm.showCiudades = showCiudades;

			function showCiudades() {
				var Estados = ["Saab", "Volvo"]; //---- llena arreglo
				ngNotify.set('ciudades!');
				//Si el array está vacío, no pasar al siguiente modal
				if (Estados.length == 0) {
					//alert('Seleccione al menos un estado');
					ngNotify.set('Seleccione al menos un estado', {
						type: 'error'
					});
				} else {
					vm.search = null; //limpia barra búsqueda
					vm.pplazas = true;
					vm.pestados = true;
					vm.pciudades = false;
					//ListaCiudades();
				}
			}

			// 5.- LOCALIDADES


			vm.showLocalidades = showLocalidades;

			function showLocalidades() {
				var Ciudades = ["Saab", "Volvo"]; //---- llena arreglo
				ngNotify.set('localidades!');
				//Si el array  está vacío, no pasar al siguiente modal
				if (Ciudades.length == 0) {
					//alert('Seleccione al menos una ciudad');
					ngNotify.set('Seleccione al menos una ciudad', {
						type: 'error'
					});
				} else {
					//$scope.showLocalidades();
					vm.search = null; //limpia barra búsqueda
					vm.pplazas = true;
					vm.pestados = true;
					vm.pciudades = true;
					vm.plocalidades = false;
					// ListaLocalidades();
				}
			}

			// 6.- COLONIAS
			vm.showColonias = showColonias;

			function showColonias() { //Si el array Distribuidores está vacío, no pasar al siguiente modal
				var Localidades = ["Saab", "Volvo"]; //---- llena arreglo
				ngNotify.set('colonias!');
				if (Localidades.length == 0) {
					//alert('Seleccione al menos una localidad');
					ngNotify.set('Seleccione al menos una localidad', {
						type: 'error'
					});
				} else {
					vm.search = null; //limpia barra búsqueda
					vm.pplazas = true;
					vm.pestados = true;
					vm.pciudades = true;
					vm.plocalidades = true;
					vm.pcolonias = false;
					//ListaColonias();
				}
			}


			// 7.- SERVICIOS

			vm.showServiciosDI = showServiciosDI;

			function showServiciosDI() // muestra servicios digital o internet
			{
				var Colonias = ["Saab", "Volvo"]; //---- llena arreglo
				ngNotify.set('serviciosDi, servicioSeleccionado! ' + servicioSeleccionado);
				//Si el array está vacío, no pasar al siguiente modal
				if (Colonias.length == 0) {
					ngNotify.set('Seleccione al menos una colonia', {
						type: 'error'
					});
				} else //pasa al siguiente modal
				{
					vm.search = null; //limpia barra búsqueda
					vm.pplazas = true;
					vm.pestados = true;
					vm.pciudades = true;
					vm.plocalidades = true;
					vm.pcolonias = true;

					if (servicioSeleccionado == 3) //Mostrar servicio Digital
					{
						vm.pserviciosDigital = false;
						//ListaServiciosDigital();
					} else if (servicioSeleccionado == 2) //Mostrar servicio Internet
					{
						vm.pserviciosInternet = false;
						//ListaServiciosInternet();
					}
				}
			}


			// 8.- TIPO DE CLIENTES

			vm.showTipoClientes = showTipoClientes;


			function showTipoClientes() {
				var ServiciosDigital = ["Saab", "Volvo"]; //---- llena arreglo
				var ServiciosInternet = ["Saab", "Volvo"]; //---- llena arreglo

				ngNotify.set('tipo clientes')
				if (vm.reporteSeleccionado != 12) {
					//Si el array está vacío, no pasar al siguiente modal
					if (((servicioSeleccionado == 3) && (ServiciosDigital.length == 0)) || ((servicioSeleccionado == 2) && (ServiciosInternet.length == 0))) {
						//alert('Seleccione al menos un servicio');
						ngNotify.set('Seleccione al menos un servicio', {
							type: 'error'
						});
					} else {
						vm.search = null; //limpia barra búsqueda
						vm.pplazas = true;
						vm.pestados = true;
						vm.pciudades = true;
						vm.plocalidades = true;
						vm.pcolonias = true;
						vm.pserviciosInternet = true;
						vm.pserviciosDigital = true;
						vm.ptipoclientes = false; // sí se muestra tipo clientes
						//ListaTipoClientes();
					}
				} else if (vm.reporteSeleccionado == 12) //Si el reporte seleccionado es '12.- Paquetes de Cortesía'
				{
					vm.showPeriodos(); //no muestra 'tipoclientes' y muestra el siguiente
				}
			}





			// 9.- PERIODOS

			vm.showPeriodos = showPeriodos;

			function showPeriodos() {
				var TipoClientes = ["Saab", "Volvo"]; //---- llena arreglo
				//Si el array TipoClientes está vacío, no pasar al siguiente modal
				ngNotify.set('periodos');

				if (vm.reporteSeleccionado != 12) //Filtro para los reportes que tienen tipo de clientes
				{
					if (TipoClientes.length == 0) {
						//alert('Seleccione al menos un tipo de cliente');
						ngNotify.set('Seleccione al menos un tipo de cliente', {
							type: 'error'
						});
					} else {
						vm.search = null; //limpia barra búsqueda
						vm.pplazas = true;
						vm.pestados = true;
						vm.pciudades = true;
						vm.plocalidades = true;
						vm.pcolonias = true;
						vm.pserviciosInternet = true;
						vm.pserviciosDigital = true;
						vm.ptipoclientes = true;
						vm.pperiodos = false; //muestra periodos
						//ListaPeriodos();
					}
				} else if (vm.reporteSeleccionado == 12) // Reporte no tiene tipos de clientes
				{
					vm.search = null; //limpia barra búsqueda
					vm.pplazas = true;
					vm.pestados = true;
					vm.pciudades = true;
					vm.plocalidades = true;
					vm.pcolonias = true;
					vm.pserviciosInternet = true;
					vm.pserviciosDigital = true;
					vm.ptipoclientes = true;
					vm.pperiodos = false; //muestra periodos
					//ListaPeriodos();
				}
			}



			//10.- RANGOS DE FECHA
			vm.showRangosFecha = showRangosFecha;

			function showRangosFecha() {
				var Periodos = ["Saab", "Volvo"]; //---- llena arreglo
				ngNotify.set('rangos de fecha');


				if (Periodos.length == 0) //Si el array Periodos está vacío, no pasar al siguiente modal
				{
					ngNotify.set('Seleccione al menos un periodo', {
						type: 'error'
					});
				} else {
					if ((vm.reporteSeleccionado >= 1 && vm.reporteSeleccionado <= 4) || (vm.reporteSeleccionado == 10) || (vm.reporteSeleccionado == 12)) {

						vm.showReporte();
					} else if ((vm.reporteSeleccionado == 5) || (vm.reporteSeleccionado == 6) || (vm.reporteSeleccionado == 8) || (vm.reporteSeleccionado == 9) || (vm.reporteSeleccionado == 11)) {
						if (vm.reporteSeleccionado == 9) //Muestra div Motcan si es el reporte 9.-Cancelaciones
						{
							vm.MotcanDiv = false; //se muestra       //divT1 = document.getElementById("MotcanDiv");divT1.style.display = "";
						} else //No muestra el div Motcan
						{
							vm.MotcanDiv = true; //se oculta      //divT2 = document.getElementById("MotcanDiv");                    divT2.style.display = "none";
						}

						vm.search = null; //limpia barra búsqueda
						//rangosFecha existe
						vm.pplazas = true;
						vm.pestados = true;
						vm.pciudades = true;
						vm.plocalidades = true;
						vm.pcolonias = true;
						vm.pserviciosInternet = true;
						vm.pserviciosDigital = true;
						vm.ptipoclientes = true;
						vm.pperiodos = true;
						vm.prangosfecha = false;
						// ListaMotcan();  //ListaRangosFecha();

					} else //cualquier otro reporte
					{
						//rangosFecha no existe en estos reportes, pasa al siguiente modal,        no es necesario filtroRangosFecha
						vm.showMesAnio();
					}
				}
			}


			//11
			vm.showMesAnio = showMesAnio;

			function showMesAnio() {

				if ((vm.reporteSeleccionado == 5) || (vm.reporteSeleccionado == 6) || (vm.reporteSeleccionado == 8) || (vm.reporteSeleccionado == 9) || (vm.reporteSeleccionado == 11)) {

					var D1 = vm.fechaInicial; // no se usa porque tiene formato con zona horaria
					var month = D1.getUTCMonth() + 1; //months from 1-12
					var day = D1.getUTCDate();
					var year = D1.getUTCFullYear();
					var fechaInicialYMD = year + "/" + month + "/" + day;

					var D2 = vm.fechaFinal; // no se usa porque tiene formato con zona horaria
					var month = D2.getUTCMonth() + 1; //months from 1-12
					var day = D2.getUTCDate();
					var year = D2.getUTCFullYear();
					var fechaFinalYMD = year + "/" + month + "/" + day;

					objPrincipal.fecha_ini = fechaInicialYMD; //$scope.fechaInicial;
					objPrincipal.fecha_fin = fechaFinalYMD; //$scope.fechaFinal;

					if (vm.reporteSeleccionado == 9) //9.-Cancelaciones
					{
						objRangoFechas.motcan = vm.motcan1; //$("#selectMotcan1").val(); //id del motivo
						objRangoFechas.motivo = 1; //se usa como contmotcan //id del motivo //muestra el div motcan
					} else //Como no muestra el div Motcan, todo en ceros
					{
						objRangoFechas.motcan = 0; //id opcion seleccionada
						objRangoFechas.motivo = 0; //lista no activa
					}
					//alert('motcan ' + objRangoFechas.motcan + ' ' + ' motivo ' + objRangoFechas.motivo + 'PASA AL FINAL');

					vm.showReporte();
				} else {
					//objPrincipal.fecha_ini = "0000-00-00";
					objPrincipal.fecha_ini = String.Empty; //string null
					objPrincipal.fecha_fin = String.Empty; // string null "0000-00-00";
					//alert('objPrincipal.fecha_ini  ' + objPrincipal.fecha_ini + ' ' + ' objPrincipal.fecha_fin ' + objPrincipal.fecha_fin);

					if (vm.reporteSeleccionado == 7) {
						vm.search = null; //limpia barra búsqueda
						//showMesAnio existe
						vm.pplazas = true;
						vm.pestados = true;
						vm.pciudades = true;
						vm.plocalidades = true;
						vm.pcolonias = true;
						vm.pserviciosInternet = true;
						vm.pserviciosDigital = true;
						vm.ptipoclientes = true;
						vm.pperiodos = true;
						vm.prangosfecha = true;
						vm.pmesanio = false;
						//ListaMesAnio();
					} else //cualquier otro reporte
					{
						vm.showCalles();
					}
				}
			}


			//12.- CALLES

			vm.showCalles = showCalles;

			function showCalles() {
				if ((vm.reporteSeleccionado == 7)) {

					if (vm.anioC.value == 0) {
						//alert("Escriba un año");
						ngNotify.set('Escriba un año', {
							type: 'error'
						});
					} else {
						estatusCliente.mes = vm.ultimoMesModel; //$("#ultimoMes").val();
						//estatusCliente.anio = $("#anioC").val(); //REVISAR
						estatusCliente.anio = vm.anioC.value; //toma el año tecleado

						//alert('mes ' + estatusCliente.mes + ', ' + ' anio ' + estatusCliente.anio + ', PASA AL FINAL');
						vm.showReporte();
					}
				} else {
					if ((vm.reporteSeleccionado == 13) || (vm.reporteSeleccionado == 14)) //calles existe en estos reportes
					{
						vm.search = null; //limpia barra búsqueda
						vm.pplazas = true;
						vm.pestados = true;
						vm.pciudades = true;
						vm.plocalidades = true;
						vm.pcolonias = true;
						vm.pserviciosInternet = true;
						vm.pserviciosDigital = true;
						vm.ptipoclientes = true;
						vm.pperiodos = true;
						vm.prangosfecha = true;
						vm.pmesanio = true;
						vm.pcalles = false;
						// ListaCalles();
					}
				}
			}



			//13.- Status del cliente
			vm.showStatus = showStatus;
			var Calles = ["Saab", "Volvo"]; //---- llena arreglo
			function showStatus() {

				var Calles = ["Saab", "Volvo"]; //---- llena arreglo

				if ((vm.reporteSeleccionado == 13) || (vm.reporteSeleccionado == 14)) { //Si el array Calles está vacío, no pasar al siguiente modal
					if (Calles.length == 0) {
						ngNotify.set('Seleccione al menos una calle', {
							type: 'error'
						});
					} else {
						vm.search = null; //limpia barra búsqueda
						vm.pplazas = true;
						vm.pestados = true;
						vm.pciudades = true;
						vm.plocalidades = true;
						vm.pcolonias = true;
						vm.pserviciosInternet = true;
						vm.pserviciosDigital = true;
						vm.ptipoclientes = true;
						vm.pperiodos = true;
						vm.prangosfecha = true;
						vm.pmesanio = true;
						vm.pcalles = true;
						vm.pstatus = false; //muestra status de cliente
						//   ListaMotcan2();                //ListaStatus();
					}
				}
			}


			vm.divMotivoCancelacion2 = true; //se oculta

			vm.buscaOnoFunction = buscaOnoFunction;

			function buscaOnoFunction() {
				if (buscaOnovar == 1) //checked
				{
					vm.divMotivoCancelacion2 = true; //se oculta
					////---------------------------------------------------------------
					buscaOnovar = 0;
					//estatusCliente.motivoCancelacion = 0; //id opcion seleccionada

				} else if (buscaOnovar == 0) // not checked
				{
					vm.divMotivoCancelacion2 = false; //se muestra
					////---------------------------------------------------------------
					buscaOnovar = 1;
					//estatusCliente.motivoCancelacion = $scope.motcan2; //$("#selectMotcan2").val(); //id del motivo
				}
			}



			vm.filtroStatus = filtroStatus;

			function filtroStatus() {
				//
				objParametros.conectado = 1;
				//

				if ((objParametros.conectado == 0) && (objParametros.Insta == 0) && (objParametros.DescTmp == 0) && (objParametros.Fuera == 0) &&
					(objParametros.Desconect == 0) && (objParametros.Susp == 0) && (objParametros.conectado == 0) && (objParametros.baja == 0)) {
					//alert("Seleccione por lo menos un status");
					ngNotify.set('Seleccione al menos un status', {
						type: 'error'
					});
				} else if ((objParametros.conectado == 1) || (objParametros.Insta == 1) || (objParametros.DescTmp == 1) || (objParametros.Fuera == 1) ||
					(objParametros.Desconect == 1) || (objParametros.Susp == 1) || (objParametros.conectado == 1) || (objParametros.baja == 1)) {

					objRangoFechas.motcan = vm.motcan2; //$("#selectMotcan1").val(); //id del motivo
					objRangoFechas.motivo = 0; //podría cambiar


					if (buscaOnovar == 1) //checked
					{
						if (vm.anioC2.value == 0) //en modal estatusCliente
						{
							//alert("Escriba un año");
							ngNotify.set('Escriba un año', {
								type: 'error'
							});
						} else {
							estatusCliente.buscaOno = 1;
							estatusCliente.buscarPor = vm.menoresModel; //$("#menorOigual").val(); //<= ó =
							estatusCliente.mes = vm.mesqueadeudaList; //$("#mesQueAdeuda").val();
							estatusCliente.anio = vm.anioC2.value;
							$ // $("#anioC2").val();

							//pasa al siguiente modal
							vm.showReporte();
						}
					} else {
						estatusCliente.buscaOno = 0;
						estatusCliente.buscarPor = 0; //<= ó =
						estatusCliente.mes = 0;
						estatusCliente.anio = 0;
						//$scope.muestraDistribuidores(); //crea xml
						//alert('PASA AL FINAL');
						vm.showReporte();
					}
					//selectMotcan2
				}
				//$scope.muestraDistribuidores(); //crea xml
			}






			//14
			vm.showReporte = showReporte;

			function showReporte() {
				vm.search = null; //limpia barra búsqueda
				vm.pplazas = true;
				vm.pestados = true;
				vm.pciudades = true;
				vm.plocalidades = true;
				vm.pcolonias = true;
				vm.pserviciosInternet = true;
				vm.pserviciosDigital = true;
				vm.ptipoclientes = true;
				vm.pperiodos = true;
				vm.prangosfecha = true;
				vm.pmesanio = true;
				vm.pcalles = true;
				vm.pstatus = true;
				vm.preporte = false;

				//vm.muestraDistribuidores(); //crea xml
			}








			function distribuidorPadre() {

				if (banderas.banderaDistribuidor == 1) {
					banderas.banderaDistribuidor = 0;
					Distribuidores = []; //limpiar
				} else if (banderas.banderaDistribuidor == 0) {
					Distribuidores = []; //limpiar antes de llenar
					//    ListaDistribuidores();

					var i;
					for (i = 0; i < DistribuidoresTodos.length; i++) //cuántos distribuidores existen
					{
						AddToArray(Distribuidores, DistribuidoresTodos[i]); //array, objeto
					}
					banderas.banderaDistribuidor = 1;
				}
			}








			vm.asd = asd;

			function asd() {

				ngNotify.set('asd!', {
					type: 'error'
				});
			}


			/*
					function nuevaEntrega() {
						ngNotify.set('Your notification message goes here!');
					}

					function goTO() {
						$state.go('home.atencion.detalle');
					}*/
		});
