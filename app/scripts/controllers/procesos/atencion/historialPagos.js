angular
    .module('softvApp')
    .controller('HistorialPagosCtrl', function($uibModal, $uibModalInstance) {
        var vm = this;
        var vm = this;
	    vm.cancel = cancel;

	    function cancel(){
		    $uibModalInstance.dismiss('cancel');
	    }
    });
