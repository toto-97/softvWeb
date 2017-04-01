'use strict';
angular.module('softvApp').controller('EscogerPagoCtrl', EscogerPagoCtrl);

function EscogerPagoCtrl($uibModal, $state, $rootScope, cajasFactory, ngNotify, inMenu, $uibModalInstance, $localStorage, items, metodo, pagosMaestrosFactory) {

    function cambio(pago) {
		if (pago == 1){
			vm.fijos = true;
			vm.variables = false;
			vm.botonFijo = true;
			vm.botonVariable = false;
		}
		else if (pago == 2){
			vm.fijos = false;
			vm.variables = true;
			vm.botonFijo = false;
			vm.botonVariable = true;
		}
	}
	
	function guardarFijo() {
		if (vm.pagoInicial == undefined || vm.pagoInicial == null || vm.pagoInicial == 0 || vm.pagoInicial < 0 || vm.numeroPagos == undefined || vm.numeroPagos == null || vm.numeroPagos == 0 || vm.numeroPagos < 0) {
			ngNotify.set('Los campos no deben de ir nulos, negativos o en 0', 'error');
		}else {
			var objPagar = {
				'contrato': items.Contrato,
				'credito':metodo,
				'cajera': $localStorage.currentUser.usuario,
				'maquina': $localStorage.currentUser.maquina,
				'sucursal': $localStorage.currentUser.sucursal,
				'compania': items.Compania,
				'distribuidor': items.Distribuidor,
				'sessionPadre': items.SessionPadre,
				'tipo': 0,
				'monto': vm.monto,
				'GLOEFECTIVO2': 0,
				'GLOCHEQUE2': 0,
				'GLOCLV_BANCOCHEQUE2': 0,
				'NUMEROCHEQUE2': '',
				'GLOTARJETA2': 0,
				'GLOCLV_BANCOTARJETA2': 0,
				'NUMEROTARJETA2': '',
				'TARJETAAUTORIZACION2': '',
				'CLV_Nota2': 0,
				'GLONOTA3': 0,
				'token': $localStorage.currentUser.token1,
				'NoPagos' : vm.numeroPagos,
				'PagoInicial': vm.pagoInicial
			};
			pagosMaestrosFactory.grabaFactura(objPagar).then(function(dataGraba) {
				vm.clvCactura = dataGraba.GetGrabaFacturaCMaestroResult.ClvFacturaMaestro;
				var elem = {
					'NoPagos' : vm.numeroPagos,
					'PagoInicial': vm.pagoInicial,
					'Clv_FacturaMaestro': vm.clvCactura
				};
				$uibModalInstance.dismiss('cancel');
				vm.animationsEnabled = true;
				var modalInstance = $uibModal.open({
					animation: vm.animationsEnabled,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'views/corporativa/pagarCredito.html',
					controller: 'PagarCreditoCtrl',
					controllerAs: '$ctrl',
					backdrop: 'static',
					keyboard: false,
					size: 'md',
					resolve: {
						items: function() {
							return items;
						},
						metodo: function() {
							return metodo;
						},
						elem: function() {
							return elem;
						}
					}
				});
			});
		}
	}

	function guardarVariable() {
		if (vm.abono == undefined || vm.abono == null || vm.abono == 0 || vm.abono < 0) {
			ngNotify.set('Los campos no deben de ir nulos, negativos o en 0', 'error');
		}else {
			var objPagar = {
				'contrato': items.Contrato,
				'credito':metodo,
				'cajera': $localStorage.currentUser.usuario,
				'maquina': $localStorage.currentUser.maquina,
				'sucursal': $localStorage.currentUser.sucursal,
				'compania': items.Compania,
				'distribuidor': items.Distribuidor,
				'sessionPadre': items.SessionPadre,
				'tipo': 0,
				'monto': vm.monto,
				'GLOEFECTIVO2': 0,
				'GLOCHEQUE2': 0,
				'GLOCLV_BANCOCHEQUE2': 0,
				'NUMEROCHEQUE2': '',
				'GLOTARJETA2': 0,
				'GLOCLV_BANCOTARJETA2': 0,
				'NUMEROTARJETA2': '',
				'TARJETAAUTORIZACION2': '',
				'CLV_Nota2': 0,
				'GLONOTA3': 0,
				'token': $localStorage.currentUser.token1,
				'NoPagos' : 0,
				'PagoInicial': vm.abono
			};
			console.log(objPagar);
			pagosMaestrosFactory.grabaFactura(objPagar).then(function(dataGraba) {
				console.log(dataGraba);
				vm.clvCactura = dataGraba.GetGrabaFacturaCMaestroResult.ClvFacturaMaestro;
				var elem = {
					'NoPagos' : 0,
					'PagoInicial': vm.abono,
					'Clv_FacturaMaestro': vm.clvCactura
				};
				console.log(elem);
				$uibModalInstance.dismiss('cancel');
				vm.animationsEnabled = true;
				var modalInstance = $uibModal.open({
					animation: vm.animationsEnabled,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'views/corporativa/pagarCredito.html',
					controller: 'PagarCreditoCtrl',
					controllerAs: '$ctrl',
					backdrop: 'static',
					keyboard: false,
					size: 'md',
					resolve: {
						items: function() {
							return items;
						},
						metodo: function() {
							return metodo;
						},
						elem: function() {
							return elem;
						}
					}
				});
			});
		}
	}

	function operacion() {
		if (vm.pagoInicial > vm.monto) {
			vm.pagoInicial = 0;
		}else {
			vm.primer = (vm.monto  - vm.pagoInicial);
			if (vm.numeroPagos == 0 || vm.numeroPagos == undefined || vm.numeroPagos == null) {
				vm.mensualidad = 0;
			}else {
				vm.mensualidad = vm.primer / vm.numeroPagos; 
			}
		}
	}

    function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

    var vm = this;
    vm.cambio = cambio;
	vm.guardarFijo = guardarFijo;
	vm.guardarVariable = guardarVariable;
	vm.operacion = operacion;
    vm.cancel = cancel;
	vm.monto = items.Monto;
}
