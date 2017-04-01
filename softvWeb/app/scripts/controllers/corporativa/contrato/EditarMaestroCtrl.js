'use strict';

function EditarMaestroCtrl($uibModal, $rootScope, corporativoFactory, $filter, ngNotify, $state, $stateParams) {
	this.$onInit = function() {
		corporativoFactory.singleContrato($stateParams.id).then(function(data) {
			console.log(data);
			vm.contratoMaestro = data.GetRelContratosResult[0];
			corporativoFactory.getDistribuidores().then(function(data) {
				vm.distribuidores = data.GetDistribuidoresResult;
				vm.distribuidores.forEach(function(entry, index) {
					if (entry.Clv_Plaza == vm.contratoMaestro.Distribuidor) {
						vm.distribuidor = vm.distribuidores[index];
					}
				});
			});
			corporativoFactory.getEstados().then(function(data) {
				vm.estados = data.GetMuestraEstadoResult;
				vm.estados.forEach(function(estado, index) {
					if (estado.Clv_Estado == vm.contratoMaestro.Estado) {
						vm.estado = vm.estados[index];
					}
				});
			});
			corporativoFactory.getCiudades(vm.contratoMaestro.Estado).then(function(data) {
				vm.ciudades = data.GetMuestraCiudadResult;
				vm.ciudades.forEach(function(entry, index) {
					if (entry.Clv_Ciudad == vm.contratoMaestro.Ciudad) {
						vm.ciudad = vm.ciudades[index];
					}
				});
			});
			corporativoFactory.getLocalidades(vm.contratoMaestro.Ciudad).then(function(data) {
				vm.localidades = data.GetMuestraLocalidadResult;
				vm.localidades.forEach(function(entry, index) {
					if (entry.Clv_Localidad == vm.contratoMaestro.Localidad) {
						vm.localidad = vm.localidades[index];
					}
				});
			});
			corporativoFactory.getColonias(vm.contratoMaestro.Localidad).then(function(data) {
				vm.colonias = data.GetMuestraColoniaResult;
				vm.colonias.forEach(function(entry, index) {
					if (entry.clv_colonia == vm.contratoMaestro.Colonia) {
						vm.colonia = vm.colonias[index];
					}
				});
			});
			corporativoFactory.getCalles(vm.contratoMaestro.Colonia, vm.contratoMaestro.Localidad).then(function(data) {
				vm.calles = data.GetMuestraCalleResult;
				vm.calles.forEach(function(entry, index) {
					if (entry.Clv_Calle == vm.contratoMaestro.Calle) {
						vm.calle = vm.calles[index];
					}
				});
			});
			corporativoFactory.getCortes().then(function(data) {
				vm.cortes = data.GetTiposCortesClientesListResult;
				vm.cortes.forEach(function(entry, index) {
					if (entry.Id == vm.contratoMaestro.TipoCorteCli) {
						vm.tipocorte = vm.cortes[index];
					}
				});
			});
			corporativoFactory.getTipoPagos().then(function(data) {
				vm.tipoPagos = data.GetTipoPagosFacturasListResult;
				vm.tipoPagos.forEach(function(entry, index) {
					if (entry.Id == vm.contratoMaestro.TipoPago) {
						vm.formapago = vm.tipoPagos[index];
					}
				});
			});
			if (vm.contratoMaestro.Prepago) {
				vm.prepago = 'prepago';
				vm.DesReactiva = true;
				vm.reactivacion = 'manual';
			} else {
				vm.prepago = 'postpago';
				vm.DesReactiva = false;
				vm.reactivacion = 'manual';
			}
			if (vm.contratoMaestro.PagoFac) {
				vm.tipopago = 'factura';
			} else {
				vm.tipopago = 'estado';
			}
			if (vm.contratoMaestro.ReactivarMan) {
				vm.reactivacion = 'manual';
			} else {
				vm.reactivacion = 'factura';
			}
			vm.razon = vm.contratoMaestro.RazonSocial;
			vm.nombrecomercial = vm.contratoMaestro.NombreComercial;
			vm.numerointerior = parseInt(vm.contratoMaestro.NumExt);
			vm.numeroexterior = parseInt(vm.contratoMaestro.NumInt);
			vm.cp = vm.contratoMaestro.CodigoPostal;
			vm.rfc = vm.contratoMaestro.RFC;
			vm.diascredito = vm.contratoMaestro.DiasCredito;
			vm.diasgracia = vm.contratoMaestro.DiasGracia;
			vm.limitecredito = parseInt(vm.contratoMaestro.LimiteCredito);
			var date = vm.contratoMaestro.FechaFac.replace(/[^0-9\.]+/g, '');
			var pattern = /(\d{2})(\d{2})(\d{4})/;
			date = new Date(date.replace(pattern, '$2/$1/$3'));
			vm.fecha = date;
		});
	}

	function abrirContratos() {

		var detalle = {};
		detalle.ContratosSoftv = vm.contratoMaestro.lstCliS;
		detalle.IdContratoMaestro = vm.contratoMaestro.IdContratoMaestro;
		detalle.Action = "EDIT";
		if (vm.distribuidor == null) {
			ngNotify.set('Selecciona una distribuidor', 'error');
			return;
		}
		detalle.Distribuidor = vm.distribuidor;
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'views/corporativa/contratosLigados.html',
			controller: 'ContratosLigadosCtrl',
			controllerAs: '$ctrl',
			backdrop: 'static',
			keyboard: false,
			size: "md",
			resolve: {
				detalle: function() {
					return detalle;
				}
			}
		});
	}

	function guardarContrato() {
		if (vm.prepago == 'prepago') {
			vm.prep = 1;
			vm.posp = 0;
		} else {
			vm.prep = 0;
			vm.posp = 1;
		}
		if (vm.reactivacion == 'manual') {
			vm.reacMan = 1;
			vm.reacPag = 0;
		} else {
			vm.reacMan = 0;
			vm.reacPag = 1;
		}
		if (vm.tipopago == 'estado') {
			vm.pagEdo = 1;
			vm.pagFac = 0;
		} else {
			vm.pagEdo = 0;
			vm.pagFac = 1;
		}
		var auxFecha = $filter('date')(vm.fecha, 'dd/MM/yyyy');
		var contrato = {
			'objContratoMaestroFac': {
				'IdContratoMaestro': vm.contratoMaestro.IdContratoMaestro,
				'RazonSocial': vm.razon,
				'NombreComercial': vm.nombrecomercial,
				'Distribuidor': vm.distribuidor.Clv_Plaza,
				'Estado': vm.estado.Clv_Estado,
				'Ciudad': vm.ciudad.Clv_Ciudad,
				'Localidad': vm.localidad.Clv_Localidad,
				'Colonia': vm.colonia.clv_colonia,
				'Calle': vm.calle.Clv_Calle,
				'NumExt': vm.numerointerior,
				'NumInt': vm.numeroexterior,
				'CodigoPostal': vm.cp,
				'RFC': vm.rfc,
				'Prepago': vm.prep,
				'PostPago': vm.posp,
				'DiasCredito': vm.diascredito,
				'DiasGracia': vm.diasgracia,
				'LimiteCredito': vm.limitecredito,
				'FechaFac': auxFecha,
				'PagoEdoCuetna': vm.pagEdo,
				'PagoFac': vm.pagFac,
				'TipoCorteCli': vm.tipocorte.Id,
				'ReactivarMan': vm.reacMan,
				'ReactivarPagoFac': vm.reacPag,
				'TipoPago': vm.formapago.Id
			}
		};
		corporativoFactory.updateContrato(contrato).then(function(data) {
			console.log(data);
			ngNotify.set('Contrato maestro actualizado correctamente.', 'success');
		});
	}

	function CambioTipoPago(x) {
		if (x == 'postpago') {
			vm.DesReactiva = false;
			vm.reactivacion = 'manual';

		} else {
			vm.DesReactiva = true;
			vm.reactivacion = 'manual';
		}
	}

	var vm = this;
	vm.abrirContratos = abrirContratos;
	vm.guardarContrato = guardarContrato;
	vm.CambioTipoPago = CambioTipoPago;
}
angular.module('softvApp').controller('EditarMaestroCtrl', EditarMaestroCtrl);
