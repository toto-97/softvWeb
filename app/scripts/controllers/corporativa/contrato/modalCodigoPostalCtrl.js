'use strict';
angular
	.module('softvApp')
	.controller('modalCodigoPostalCtrl', function($uibModalInstance,globalService, ContratoMaestroFactory) {
		this.$onInit = function() {
            searchCode('1');
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');		
        }
        
        function searchCode(query){
            ContratoMaestroFactory.GetCodigosPostalesMizar(query).then(function(result){
              vm.codigos= result.GetCodigosPostalesMizarResult;
             });
        }

        function ok(){
            $uibModalInstance.dismiss('cancel');		
        }

        function seleccionar(item){
            $uibModalInstance.close(item);
        }

		var vm = this;
		vm.cancel = cancel;
        vm.ok=ok;
        vm.searchCode=searchCode;
        vm.seleccionar=seleccionar;
	});
