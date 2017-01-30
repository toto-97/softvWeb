'use strict';
angular.module('softvApp')
	.controller('ModalPreguntaCtrl', function($uibModalInstance, items, cajasFactory, $rootScope) {

		function ok() {
			if (items.op == 900) {
				cajasFactory.afirmaPregunta(items.contrato, items.meses, items.op, items.session, 1).then(function(suscriptor) {
					$rootScope.$emit('realoadPagos', {});
					$uibModalInstance.dismiss('cancel');
				});
			} else {
				cajasFactory.afirmaPregunta(items.contrato, items.meses, items.op, items.session, 0).then(function(suscriptor) {
					$rootScope.$emit('realoadPagos', {});
					$uibModalInstance.dismiss('cancel');
				});
			}
		}

		function cancel() {
			if (items.op == 900) {
				cajasFactory.afirmaPregunta(items.contrato, items.meses, items.op, items.session, 0).then(function(suscriptor) {
					$rootScope.$emit('realoadPagos', {});
				});
			}
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.pregunta = items.pregunta;
		vm.cancel = cancel;
		vm.ok = ok;
	});
