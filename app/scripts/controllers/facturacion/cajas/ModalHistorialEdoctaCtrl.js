'use strict';
angular
	.module('softvApp')
	.controller('modalHistorialEdoctaCtrl', function($uibModal, $uibModalInstance, contrato, cajasFactory, ngNotify) {
		function init() {
			cajasFactory.ObtieneEdoCuentaPorContrato(contrato).then(function(data) {
				console.log(data);
				vm.ListaEstados = data.GetObtieneEdoCuentaPorContratoListResult;
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function ok() {

		}

		function Reprocesar(IdEstadoCuenta, contrato) {
			cajasFactory.ValidaReprocesoPorContrato(IdEstadoCuenta).then(function(data) {
				if (data.GetDeepValidaReprocesoPorContratoResult.reproceso > 0) {
					cajasFactory.ReprocesaEdoCuentaContrato(IdEstadoCuenta, contrato).then(function(data) {
						ngNotify.set('El estado de cuenta se reproceso correctamente.');
					});
				} else {
					ngNotify.set('Solo es posible reprocesar el estado de cuenta actual o el cliente tiene un cambio de servicio pendiente', 'error');
				}

			});


		}

		function Reenviar(IdEstadoCuenta) {
			cajasFactory.ReenviaEstadosCuentaPorContrato(IdEstadoCuenta).then(function(data) {
				var reenvia = data.GetDeepReenviaEstadosCuentaPorContratoResult.reenvia;
				if (reenvia > 0) {
					ngNotify.set('El estado de cuenta se reenvió correctamente.');
				} else {
					ngNotify.set('solo es posible reenviar el estado de cuenta actual', 'error');
				}
			});
		}

		function Imprimir(IdEstadoCuenta) {

		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
		init();
		vm.Reenviar = Reenviar;
		vm.Reprocesar = Reprocesar;
		vm.Imprimir = Imprimir;

	});
