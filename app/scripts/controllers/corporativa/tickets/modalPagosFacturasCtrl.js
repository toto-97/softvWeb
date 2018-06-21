'use strict';
angular
  .module('softvApp')
  .controller('modalPagosFacturasCtrl', function (pagosMaestrosFactory, $uibModalInstance, $uibModal, ContratoMaestroFactory, ngNotify, $rootScope, factura) {
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




    function opcionTicket(opc, ticket) {
      console.log('ticket',ticket);
      ticket.tipo='P';
      if (opc === 1) {
        ticket.op = 'PRINT';
      
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/corporativa/modalMotivoCanMaestro.html',
          controller: 'modalMotivoCanMaestroCtrl',
          controllerAs: '$ctrl',
          backdrop: 'static',
          keyboard: false,
          class: 'modal-backdrop fade',
          size: 'md',
          resolve: {
            ticket: function () {
              return ticket;
            }
          }
        });

      } else if (opc == 3) {


        ContratoMaestroFactory.GetEnviaFacturaFiscalpago(ticket.Clv_Pago).then(function (result) {
          if (result.GetEnviaFacturaFiscalpagoResult.IdResult === 0) {
            ngNotify.set(result.GetEnviaFacturaFiscalpagoResult.Message, 'error');
            return;
          } else {
            ngNotify.set('Factura se envió correctamente', 'success');
          }
  
        });
       
      /*   ContratoMaestroFactory.GetEnviaFacturaFiscalpago(ticket.Clv_FacturaMaestro).then(function (result) {
          if (result.GetEnviaFacturaFiscalResult.IdResult === 0) {
            ngNotify.set(result.GetEnviaFacturaFiscalResult.Message, 'error');
            return;
          } else {
            ngNotify.set('Factura se envió correctamente', 'success');
          }

        }); */


      } else {

        ticket.op = 'CAN';


        ContratoMaestroFactory.GetValidaSipuedoCancelarPago(ticket.Clv_Pago).then(function (data) {
          
            if (data.GetValidaSipuedoCancelarPagoResult.Msg != '') {
              ngNotify.set(data.GetValidaSipuedoCancelarPagoResult.Msg, 'warn')
            } else {
              var options = {};
              options.Clv_Pago = ticket.Clv_Pago;
              options.contrato = ticket.Clv_FacturaMaestro;
              options.pregunta = '¿ Estas seguro de cancelar la factura #' + ticket.Clv_Pago + ' ?';
              var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/corporativa/ModalHazPregunta.html',
                controller: 'ModalCancelaFacturaCtrl',
                controllerAs: '$ctrl',
                backdrop: 'static',
                keyboard: false,
                class: 'modal-backdrop fade',
                size: 'md',
                resolve: {
                  options: function () {
                    return options;
                  }
                }
              });
      
            }
      
          });


      
   /*      var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/facturacion/modalCancelarTicket.html',
          controller: 'modalCancelaTicketCtrl',
          controllerAs: '$ctrl',
          backdrop: 'static',
          keyboard: false,
          class: 'modal-backdrop fade',
          size: 'md',
          resolve: {
            ticket: function () {
              return ticket;
            }
          }
        }); */

      }

    }



  /*   function ImprimeFacturaFiscalpago(item) {

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

    function EnviaFacturaFiscalpago(item) {
      ContratoMaestroFactory.GetImprimeFacturaFiscalpago(item.Clv_Pago).then(function (result) {
        if (result.GetImprimeFacturaFiscalpagoResult.IdResult === 0) {
          ngNotify.set(result.GetImprimeFacturaFiscalpagoResult.Message, 'error');
          return;
        } else {
          ngNotify.set('Factura se envió correctamente', 'success');
        }

      });
    } */



    var vm = this;
    vm.cancel = cancel;
    vm.titulo = 'Pagos referenciados a ticket ' + factura.Ticket;
    vm.opcionTicket=opcionTicket;
 /*    vm.ImprimeFacturaFiscalpago = ImprimeFacturaFiscalpago;
    vm.EnviaFacturaFiscalpago = EnviaFacturaFiscalpago; */
  });
