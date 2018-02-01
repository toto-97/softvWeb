'use strict';
angular
  .module('softvApp')
  .controller('modalPagosFacturasCtrl', function (pagosMaestrosFactory,$uibModalInstance, $uibModal, ContratoMaestroFactory, ngNotify, $rootScope, factura) {
    this.$onInit = function () {
      console.log(factura);

      pagosMaestrosFactory.obtenFacturas(factura.Clv_FacturaMaestro).then(function (data) {

        vm.historialPagos = data.GetObtieneHistorialPagosFacturaMaestroListResult;
        for (var a = 0; a < vm.historialPagos.length; a++) {
          vm.historialPagos[a].Clv_FacturaMaestro = factura.Clv_FacturaMaestro;
        }
      });
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

  

    function ImprimeFacturaFiscalpago(item){
     
        ContratoMaestroFactory.GetImprimeFacturaFiscalpago(item.Clv_Pago).then(function (result) {
            if (result.GetImprimeFacturaFiscalpagoResult.IdResult === 0) {
              ngNotify.set(result.GetImprimeFacturaFiscalpagoResult.Message, 'error');
              return;
            }
    
            var url = result.GetImprimeFacturaFiscalpagoResult.urlReporte;
            vm.animationsEnabled = true;
            var modalInstance = $uibModal.open({
              animation: vm.animationsEnabled,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'views/corporativa/ModalDetalleFactura.html',
              controller: 'ModalDetalleFacturaCtrl',
              controllerAs: '$ctrl',
              backdrop: 'static',
              keyboard: false,
              size: 'lg',
              resolve: {
                url: function () {
                  return url;
                }
              }
            });
          });
    }

    function EnviaFacturaFiscalpago(item){
        ContratoMaestroFactory.GetImprimeFacturaFiscalpago(item.Clv_Pago).then(function (result) {
            if (result.GetImprimeFacturaFiscalpagoResult.IdResult === 0) {
              ngNotify.set(result.GetImprimeFacturaFiscalpagoResult.Message, 'error');
              return;
            } else {
              ngNotify.set('Factura se envió correctamente', 'success');
            }
    
          });
    }
    var vm = this;
    vm.cancel = cancel;   
    vm.titulo = 'Pagos referenciados a factura ' + factura.Ticket;
    vm.ImprimeFacturaFiscalpago=ImprimeFacturaFiscalpago;
    vm.EnviaFacturaFiscalpago=EnviaFacturaFiscalpago;
  });
