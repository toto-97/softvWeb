'use strict';
angular
	.module('softvApp')
	.controller('ModalClabeCtrl', function($uibModalInstance, cajasFactory, items, $filter) {

		function initialData() {
			vm.Clabe = items.clabe;
			cajasFactory.imprimirClabe(items.contrato).then(function(data) {
				vm.datosCalbe = data.GetBotonImprimeClabeResult[0];
			});
		}

		function printDiv() {
			vm.fecha = new Date();
			vm.fecha = $filter('date')(vm.fecha, 'dd/MM/yyyy');
			var printContents = '<table class="table" style="border:none;">' +
				'<tr>' +
				'<td class="text-center"><strong>Cuenta Clabe del Cliente</strong></td>' +
				'</tr>' +
				'<tr>' +
				'<td class="text-left">' + vm.fecha + '</td>' +
				'</tr>' +
				'<tr>' +
				'<td class="text-left"><strong>Contrato:' + vm.datosCalbe.ContratoC + '</strong></td>' +
				'</tr>' +
				'<tr>' +
				'<td class="text-left"><strong>Cliente:' + vm.datosCalbe.Nombre + '</strong></td>' +
				'</tr>' +
				'<tr>' +
				'<td class="text-center"><strong>Clabe</strong></td>' +
				'</tr>' +
				'<tr>' +
				'<td class="text-center"><strong>' + vm.datosCalbe.Clabe + '</strong></td>' +
				'</tr>' +
				'</table>';
			var popupWin = window.open('', '_blank', 'width=1000,height=700');
			popupWin.document.open();
			popupWin.document.write('<html><head><link type="text/css" rel="stylesheet" href="assets/css/theme-default/bootstrap.css?1422792965" /><link type="text/css" rel="stylesheet" href="assets/css/theme-default/materialadmin.css?1425466319" /><link type="text/css" rel="stylesheet" href="assets/css/theme-default/font-awesome.min.css?1422529194" /><link type="text/css" rel="stylesheet" href="assets/css/theme-default/material-design-iconic-font.min.css?1421434286" /><link type="text/css" rel="stylesheet" href="assets/css/theme-default/libs/rickshaw/rickshaw.css?1422792967" /><link type="text/css" rel="stylesheet" href="assets/css/theme-default/libs/morris/morris.core.css?1420463396" /></head><body onload="window.print()">' + printContents + '</body></html>');
			popupWin.document.close();
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel');
		}

		var vm = this;
		vm.cancel = cancel;
		vm.printDiv = printDiv;
		initialData();
	});
