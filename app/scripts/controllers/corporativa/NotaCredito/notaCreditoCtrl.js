(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('notaCreditoCtrl', notaCreditoCtrl);

  notaCreditoCtrl.inject = ['$uibModal', '$state', '$rootScope', 'ngNotify', 'ContratoMaestroFactory', '$filter', 'globalService', 'ticketsFactory'];
  function notaCreditoCtrl($uibModal, $state, $rootScope, ngNotify, ContratoMaestroFactory, $filter, globalService, ticketsFactory) {
    var vm = this;
    vm.buscar = buscar;
    vm.DetalleNota = DetalleNota;
    vm.opcionesNota = opcionesNota;
    vm.DescargarPDF = DescargarPDF;
    vm.DescargarXML = DescargarXML;


    this.$onInit = function () {
      buscar(0);
      vm.csvheader = ['NotaCredito', 'Factura', 'ContratoMaestro', 'FechaGeneracion', 'Status', 'Ticket', 'Monto'];
      vm.csvorder = ['NotaCredito', 'FacturaMizar', 'ContratoMaestro', 'FechaGeneracion', 'Status', 'Ticket', 'Monto'];
    }

    function buscar(id) {

      if (id == 1) {
        var parametros = {
          'Op': 1,
          'Clv_NotadeCredito': vm.folio,
          'Fecha': '',
          'ContratoMaestro': 0
        }

      } else if (id == 2) {

        var parametros = {
          'Op': 3,
          'Clv_NotadeCredito': 0,
          'Fecha': '',
          'ContratoMaestro': vm.contrato
        }
      } else if (id == 3) {
        var parametros = {
          'Op': 2,
          'Clv_NotadeCredito': 0,
          'Fecha': vm.fecha = $filter('date')(vm.date, 'dd/MM/yyyy'),
          'ContratoMaestro': 0
        }


      } else {
        var parametros = {
          'Op': 0,
          'Clv_NotadeCredito': 0,
          'Fecha': '',
          'ContratoMaestro': 0
        }
      }

      ContratoMaestroFactory.FiltrosBusquedaNotasDeCredito(parametros).then(function (data) {
        vm.Notas = data.GetBusquedaNotasListResult;
        console.log(vm.Notas);
      });
    }

    function DetalleNota(nota) {

      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/corporativa/ModalDetalleNota.html',
        controller: 'ModalDetalleNotaCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        keyboard: false,
        size: "lg",
        resolve: {
          nota: function () {
            return nota;
          }
        }
      });
    }


    function DescargarXML(nota) {
      var params = {
        'Tipo': 'T',
        'Clave': nota.NotaCredito
      };
      vm.url = '';
      console.log(nota);
      ticketsFactory.GetFacturaXML(params).then(function (data) {
        console.log(data);
        vm.url = globalService.getUrlReportes() + '/Reportes/' + data.GetFacturaXMLResult.Archivo;
        //$window.open(vm.url, '_self');

        var isChrome = !!window.chrome && !!window.chrome.webstore;
        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
        var isEdge = !isIE && !!window.StyleMedia;

        var downloadLink = angular.element('<a></a>');
        downloadLink.attr('href', vm.url);
        downloadLink.attr('target', '_self');
        downloadLink.attr('download', 'NC ' + nota.FacturaMizar + '.xml');
        downloadLink[0].click();

      });
    }

    function DescargarPDF(nota) {
      ContratoMaestroFactory.GetImprimeFacturaFiscalNotaMaestro(nota.NotaCredito).then(function (result) {
        if (result.GetImprimeFacturaFiscalNotaMaestroResult.IdResult === 0) {
          ngNotify.set(result.GetImprimeFacturaFiscalNotaMaestroResult.Message, 'error');
          return;
        }

        vm.url = globalService.getReporteUrlMizar() + '/Reportes/' + result.GetImprimeFacturaFiscalNotaMaestroResult.urlReporte;
        var isChrome = !!window.chrome && !!window.chrome.webstore;
        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
        var isEdge = !isIE && !!window.StyleMedia;

        var downloadLink = angular.element('<a></a>');
        downloadLink.attr('href', vm.url);
        downloadLink.attr('target', '_self');
        downloadLink.attr('download', 'NC ' + nota.FacturaMizar + '.pdf');
        downloadLink[0].click();

        //$window.open(vm.url, '_self');

      });
    }



    function opcionesNota(opcion, nota) {
      if (opcion == 1) {
        ContratoMaestroFactory.TblNotasMaestraOpciones(nota, 0, 1, 0).then(function (data) {
          ngNotify.set('La nota se ha refacturado correctamente.', 'success');
        });

      } else if (opcion === 2) {


        ContratoMaestroFactory.GetImprimeFacturaFiscalNotaMaestro(nota).then(function (data) {
          console.log(data);
          if (data.GetImprimeFacturaFiscalNotaMaestroResult.IdResult === 0) {
            ngNotify.set(data.GetImprimeFacturaFiscalNotaMaestroResult.Message, 'error');
            return;
          }
          var url = data.GetImprimeFacturaFiscalNotaMaestroResult.urlReporte;
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


          ngNotify.set("Se ha reimpreso la factura correctamente");

        });

      }
    }

  }
})();