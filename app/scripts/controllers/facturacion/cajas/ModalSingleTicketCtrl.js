'use strict';
angular
	.module('softvApp')
	.controller('ModalSingleTicketCtrl', function($uibModalInstance, cajasFactory, factura) {

		function initialData() {
			cajasFactory.dameTicket(factura).then(function(data) {
				vm.datosTicket = data.GetCrearTicketTableListResult[0];
			});
			cajasFactory.dameDatosPago(factura).then(function(data) {
				console.log(data);
				vm.datosPago = data.GetConceptosTicketPagosListResult;
			});
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		function printDiv(divName) {
			var printContents = document.getElementById(divName).innerHTML;
			var popupWin = window.open('', '_blank', 'width=1000,height=700');
			popupWin.document.open();
			popupWin.document.write('<html><head><link type="text/css" rel="stylesheet" href="assets/css/theme-default/bootstrap.css?1422792965" /><link type="text/css" rel="stylesheet" href="assets/css/theme-default/materialadmin.css?1425466319" /><link type="text/css" rel="stylesheet" href="assets/css/theme-default/font-awesome.min.css?1422529194" /><link type="text/css" rel="stylesheet" href="assets/css/theme-default/material-design-iconic-font.min.css?1421434286" /><link type="text/css" rel="stylesheet" href="assets/css/theme-default/libs/rickshaw/rickshaw.css?1422792967" /><link type="text/css" rel="stylesheet" href="assets/css/theme-default/libs/morris/morris.core.css?1420463396" /></head><body onload="window.print()">' + printContents + '</body></html>');
			popupWin.document.close();
		}

		var vm = this;
		vm.cancel = cancel;
		vm.printDiv = printDiv;
		initialData();
	});
