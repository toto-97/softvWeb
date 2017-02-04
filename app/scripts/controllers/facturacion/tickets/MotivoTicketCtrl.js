'use strict';
angular.module('softvApp')
	.controller('MotivoTicketCtrl', function($uibModalInstance, $rootScope, ngNotify) {
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
	});
