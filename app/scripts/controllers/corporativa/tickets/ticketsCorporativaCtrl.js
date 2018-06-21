(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ticketsCorporativaCtrl', ticketsCtrl);

  ticketsCtrl.inject = [''];

  function ticketsCtrl(ContratoMaestroFactory, $filter, $uibModal, ngNotify, $rootScope, pagosMaestrosFactory) {

/* 
    function GetEnviaFacturaFiscal(item) {


      ContratoMaestroFactory.GetEnviaFacturaFiscal(item.Clv_FacturaMaestro).then(function (result) {
        if (result.GetEnviaFacturaFiscalResult.IdResult === 0) {
          ngNotify.set(result.GetEnviaFacturaFiscalResult.Message, 'error');
          return;
        } else {
          ngNotify.set('Factura se envió correctamente', 'success');
        }

      });
    }
 */

    function opcionTicket(opc, ticket) {
      ticket.tipo='M';
      ticket.Modulo = 'Facturas';
      console.log( ticket.tipo);
      if (opc == 1) {
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

        ContratoMaestroFactory.GetEnviaFacturaFiscal(ticket.Clv_FacturaMaestro).then(function (result) {
          if (result.GetEnviaFacturaFiscalResult.IdResult === 0) {
            ngNotify.set(result.GetEnviaFacturaFiscalResult.Message, 'error');
            return;
          } else {
            ngNotify.set('Factura se envió correctamente', 'success');
          }
  
        }); 


      } else {

        ticket.op = 'CAN';
        var modalInstance = $uibModal.open({
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
        });


      }


    }




    function historial(x) {    

      vm.animationsEnabled = true;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/corporativa/modalPagosFacturas.html',
        controller: 'modalPagosFacturasCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        keyboard: false,
        size: 'lg',
        resolve: {
          factura: function () {
            return x;
          }
        }
      });


    }


  /*   function GetImprimeFacturaFiscal(item) {

      ContratoMaestroFactory.GetImprimeFacturaFiscal(item.Clv_FacturaMaestro).then(function (result) {
        if (result.GetImprimeFacturaFiscalResult.IdResult === 0) {
          ngNotify.set(result.GetImprimeFacturaFiscalResult.Message, 'error');
          return;
        }

        var url = result.GetImprimeFacturaFiscalResult.urlReporte;
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
 */
/* 
    function  GetCancelacion_Factura_CFDMaestro(item){

      ContratoMaestroFactory.GetCancelacion_Factura_CFDMaestro(item.Clv_FacturaMaestro,'M').then(function(result){
       console.log(result);
      });
    } */


    function Buscar(opc) {

      var parametros = {};

      if (opc == 1) {
        parametros = {
          'Fecha': $filter('date')(vm.fecha, 'dd/MM/yyyy'),
          'Ticket': '',
          'ContratoMaestro': 0,
          'Cliente': '',
          'Op': 1,
          'Saldada': 0
        };

      } else if (opc == 2) {
        parametros = {
          'Fecha': '',
          'Ticket': vm.folio,
          'ContratoMaestro': 0,
          'Cliente': '',
          'Op': 2,
          'Saldada': 0
        };


      } else if (opc == 3) {

        parametros = {
          'Fecha': '',
          'Ticket': '',
          'ContratoMaestro': vm.contrato,
          'Cliente': '',
          'Op': 3,
          'Saldada': 0
        };

      } else if (opc == 4) {

        parametros = {
          'Fecha': '',
          'Ticket': '',
          'ContratoMaestro': 0,
          'Cliente': vm.cliente,
          'Op': 4,
          'Saldada': 0
        };

      } else {

        parametros = {
          'Fecha': '',
          'Ticket': '',
          'ContratoMaestro': 0,
          'Cliente': '',
          'Op': 0,
          'Saldada': 0
        };
      }

      ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
        vm.Tickets = data.GetBuscaFacturasMaestroListResult;
      });
    }   

    var vm = this;
    vm.Buscar = Buscar;
    Buscar(0);
    vm.historial = historial;
    vm.opcionTicket=opcionTicket;
   // vm.GetEnviaFacturaFiscal = GetEnviaFacturaFiscal;
    //vm.GetImprimeFacturaFiscal = GetImprimeFacturaFiscal;
    //vm.GetCancelacion_Factura_CFDMaestro=GetCancelacion_Factura_CFDMaestro;
  }
})();
