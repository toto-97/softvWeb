'use strict';
angular
  .module('softvApp')
  .controller('modalPagosFacturasCtrl', function (pagosMaestrosFactory, $uibModalInstance, $uibModal, ContratoMaestroFactory, ngNotify, $rootScope, factura, globalService, ticketsFactory) {
    
    /// Muestra las facturas a pagar
    this.$onInit = function () {
      console.log(factura);

      pagosMaestrosFactory.obtenFacturas(factura.Clv_FacturaMaestro).then(function (data) {

        vm.historialPagos = data.GetObtieneHistorialPagosFacturaMaestroListResult;
        for (var a = 0; a < vm.historialPagos.length; a++) {
          vm.historialPagos[a].Clv_FacturaMaestro = factura.Clv_FacturaMaestro;
        }
        //Vamos a quitar manualmente los pagos que sean de notas de crédito, para modificar los servicios
        var historialPagosAux = [];
        vm.historialPagos.forEach(function (item, index) {
          if (item.MedioPago != 'Nota de Crédito') {
            historialPagosAux.push(item);
          }
        });
        vm.historialPagos = historialPagosAux;
        //console.log('vm.historialPagos', vm.historialPagos);
      });
    }

    /// cancela la operacion
    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    /// Muetsra la ventana para describir las razaones de la cancelacion
    function opcionTicket(opc, ticket) {
      console.log('ticket', ticket);
      ticket.tipo = 'P';
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
            options.pregunta = '¿ Estás seguro de cancelar la factura #' + ticket.Clv_Pago + ' ?';
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

    /// Descarga un reporte en XML
    function DescargarXML(Pago) {
      var params = {
        'Tipo': 'P',
        'Clave': Pago.Clv_Pago
      };
      vm.url = '';
      ticketsFactory.GetFacturaXML(params).then(function (data) {
        console.log(data);
        vm.url = globalService.getUrlReportes() + '/Reportes/' + data.GetFacturaXMLResult.Archivo;
        //$window.open(vm.url, '_self');

        var isChrome = !!window.chrome && !!window.chrome.webstore;
        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
        var isEdge = !isIE && !!window.StyleMedia;


        if (isChrome) {
          var url = window.URL || window.webkitURL;

          var downloadLink = angular.element('<a></a>');
          downloadLink.attr('href', vm.url);
          downloadLink.attr('target', '_self');
          downloadLink.attr('download', 'Pago ' + ticket.Factura + '.xml');
          downloadLink[0].click();
        } else if (isEdge || isIE) {
          window.navigator.msSaveOrOpenBlob(vm.url, 'Pago ' + ticket.Factura + '.xml');

        } else {
          var fileURL = vm.url;
          window.open(fileURL);
        }
      });
    }

    /// Descarga un reporte en PDF
    function DescargarPDF(Pago) {
      ContratoMaestroFactory.GetImprimeFacturaFiscalpago(Pago.Clv_Pago).then(function (result) {
        if (result.GetImprimeFacturaFiscalpagoResult.IdResult === 0) {
          ngNotify.set(result.GetImprimeFacturaFiscalpagoResult.Message, 'error');
          return;
        }

        vm.url = globalService.getReporteUrlMizar() + '/Reportes/' + result.GetImprimeFacturaFiscalpagoResult.urlReporte;
        var isChrome = !!window.chrome && !!window.chrome.webstore;
        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
        var isEdge = !isIE && !!window.StyleMedia;


        if (isChrome) {
          var url = window.URL || window.webkitURL;

          var downloadLink = angular.element('<a></a>');
          downloadLink.attr('href', vm.url);
          downloadLink.attr('target', '_self');
          downloadLink.attr('download', 'Pago ' + ticket.Factura + '.pdf');
          downloadLink[0].click();
        } else if (isEdge || isIE) {
          window.navigator.msSaveOrOpenBlob(vm.url, 'Pago ' + ticket.Factura + '.pdf');

        } else {
          var fileURL = vm.url;
          window.open(fileURL);
        }
      });
    }

    var vm = this;
    vm.cancel = cancel;
    vm.titulo = 'Pagos referenciados a ticket ' + factura.Ticket;
    vm.opcionTicket = opcionTicket;
    vm.DescargarPDF = DescargarPDF;
    vm.DescargarXML = DescargarXML;
    /*    vm.ImprimeFacturaFiscalpago = ImprimeFacturaFiscalpago;
       vm.EnviaFacturaFiscalpago = EnviaFacturaFiscalpago; */
  });
