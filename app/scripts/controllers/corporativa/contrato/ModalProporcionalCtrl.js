'use strict';
angular
	.module('softvApp')
	.controller('ModalProporcionalCtrl', function($uibModalInstance, $uibModal, $rootScope, ngNotify ,contrato) {

		/// No se usa
		this.$onInit = function() {
       
		}

		/// Busca los contratos proporcionales
		function cancel() {
			$uibModalInstance.dismiss('cancel');
			contrato.Proporcional=false;
			$rootScope.$emit('contrato_proporcional', contrato);
		}

		/// Selecciona un contrato proporcional
        function ok(){
            $uibModalInstance.dismiss('cancel');
			contrato.Proporcional=true;
			$rootScope.$emit('contrato_proporcional', contrato);
        }

		var vm = this;
		vm.cancel = cancel;
        vm.ok=ok;
	});
