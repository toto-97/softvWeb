'use strict';
angular
  .module('softvApp')
  .controller('ModalTicketNotaCtrl', function ($uibModalInstance, $uibModal, $rootScope, ngNotify, ContratoMaestroFactory) {
    this.$onInit = function () {

      ContratoMaestroFactory.GetCrearNotaCreditoCM(5).then(function (response) {
          console.log(response);
        vm.det=response.GetCrearNotaCreditoCMResult[0];
        ContratoMaestroFactory.ConceptosTicketNotasCredito(5).then(function (data) {
            vm.conceptos=data.GetConceptosTicketNotasCreditoCMResult;
          console.log(data);
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

    var vm = this;
    vm.cancel = cancel;
    vm.printDiv=printDiv;

  });
