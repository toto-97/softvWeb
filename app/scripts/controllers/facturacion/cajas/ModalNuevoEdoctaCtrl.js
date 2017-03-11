'use strict';
angular
	.module('softvApp')
	.controller('ModalNuevoEdoctaCtrl', function(globalService, $uibModalInstance, cajasFactory, options, $sce) {
		this.$onInit = function() {
			if (options.Tipo == 2) {
				cajasFactory.ReporteEstadoCuentaNuevo(options.Id, options.Contrato, options.IdEstadoCuenta).then(function(data) {
					var id = data.GetReporteEstadoCuentaNuevoListResult[0].lineaTR;
					vm.url = globalService.getUrlReportes() + '/Reportes/' + id;
					vm.urlReal = $sce.trustAsResourceUrl(vm.url);
				});
			}

		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
	});
