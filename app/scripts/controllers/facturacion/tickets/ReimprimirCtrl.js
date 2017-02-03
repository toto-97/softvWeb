'use strict';
angular
	.module('softvApp')
	.controller('ReimprimirCtrl', function($uibModalInstance, $rootScope, ngNotify) {
		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
	});
