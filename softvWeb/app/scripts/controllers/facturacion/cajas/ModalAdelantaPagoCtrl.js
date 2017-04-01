'user strict';
angular.module('softvApp')
	.controller('ModalAdelantaPagoCtrl', function($uibModalInstance, cajasFactory, items, $rootScope) {

		function mesesChange() {
			if (vm.mesesPagar > 12) {
				vm.mesesPagar = 12;
			}
			if (vm.mesesPagar < 1) {
				vm.mesesPagar = 1;
			}
		}

		function ok() {
			cajasFactory.pagoAdelantado(items.Session, items.Concepto.CLV_SERVICIO, items.Concepto.Clv_llavedelservicio, items.Concepto.Clv_UnicaNet, items.CLAVE, vm.mesesPagar, items.Suscriptor.Clv_TipoCliente, items.Contrato).then(function(data) {
				if (data.GetPagoAdelantadoListResult[0].Error == 0) {
					$uibModalInstance.dismiss('cancel');
					$rootScope.$emit('realoadPagos', {});
				} else {
					ngNotify.set(data.GetPagoAdelantadoListResult[0].Msg, 'error');
				}
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.mesesPagar = 1;
		vm.mesesChange = mesesChange;
		vm.ok = ok;
	});
