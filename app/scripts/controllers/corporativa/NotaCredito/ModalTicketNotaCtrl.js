(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ModalTicketNotaCtrl', ModalTicketNotaCtrl);

  ModalTicketNotaCtrl.inject = ['$uibModalInstance', '$uibModal', '$rootScope', 'ngNotify', 'ContratoMaestroFactory', 'factura'];
  function ModalTicketNotaCtrl($uibModalInstance, $uibModal, $rootScope, ngNotify, ContratoMaestroFactory, factura) {
    var vm = this;
    vm.cancel = cancel;
    vm.printDiv = printDiv;

    this.$onInit = function () {
      ContratoMaestroFactory.GetCrearNotaCreditoCM(factura).then(function (response) {
        vm.det = response.GetCrearNotaCreditoCMResult[0];
        ContratoMaestroFactory.ConceptosTicketNotasCredito(factura).then(function (data) {
          vm.conceptos = data.GetConceptosTicketNotasCreditoCMResult;
        });
      });
    }

    function printDiv(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var popupWin = window.open('', '_blank', 'width=1000,height=700');
      popupWin.document.open();
      popupWin.document.write('<html><head><link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
      popupWin.document.close();
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

  }
})();