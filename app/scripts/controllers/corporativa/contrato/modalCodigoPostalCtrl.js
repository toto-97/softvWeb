'use strict';
angular
	.module('softvApp')
	.controller('modalCodigoPostalCtrl', function($uibModalInstance,globalService, ContratoMaestroFactory) {

        /// Busca un codigo postal
		this.$onInit = function() {
            searchCode('1');
		}

        /// Cacela la operacion
		function cancel() {
			$uibModalInstance.dismiss('cancel');		
        }
        
        /// Busca un codigo postal en mizar
        function searchCode(query){
            ContratoMaestroFactory.GetCodigosPostalesMizar(query).then(function(result){
              vm.codigos= result.GetCodigosPostalesMizarResult;
             });
        }

        /// Pasa el codigo postal a la siguiente ventana
        function ok(){
            $uibModalInstance.dismiss('cancel');		
        }

        /// Verifica el codigo postal seleccionado
        function seleccionar(item){
            $uibModalInstance.close(item);
        }

		var vm = this;
		vm.cancel = cancel;
        vm.ok=ok;
        vm.searchCode=searchCode;
        vm.seleccionar=seleccionar;
	});
