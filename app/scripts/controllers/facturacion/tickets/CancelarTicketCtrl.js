'use strict';
angular.module('softvApp')
	.controller('cancelarTicketCtrl', function($uibModalInstance, $uibModal, $rootScope, ngNotify) {
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function ok() {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/facturacion/modalmotivoTicket.html',
				controller: 'MotivoTicketCtrl',
				controllerAs: '$ctrl',
				backdrop: 'static',
				keyboard: false,
				size: 'md'
			});
		}

		var vm = this;
		vm.cancel = cancel;
		vm.ok = ok;
	});
