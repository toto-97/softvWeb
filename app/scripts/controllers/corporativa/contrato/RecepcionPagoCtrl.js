'use strict';

function RecepcionPagoCtrl($uibModal, $rootScope, corporativoFactory, $filter, ngNotify, $state,ContratoMaestroFactory) {
	this.$onInit = function() {
    ContratoMaestroFactory.GetMuestraFacturasMaestroList().then(function(data){
        console.log(data);
        vm.pagos=data.GetMuestraFacturasMaestroListResult;

    });
    }

    function buscaContrato(opcion){
        var parametros;
    if(opcion==2){
parametros = {
				'Fecha': '',
				'Ticket': vm.Ticket,
				'ContratoMaestro': 0,
				'Cliente':'',
				'Op': opcion
			};
    }else if(opcion==3){
parametros = {
				'Fecha': '',
				'Ticket': '',
				'ContratoMaestro': vm.ContratoMaestro,
				'Cliente':'',
				'Op': opcion
			};
    }
    else{
parametros = {
				'Fecha': '',
				'Ticket': '',
				'ContratoMaestro': 0,
				'Cliente':vm.Cliente,
				'Op': opcion
			};
    }


    ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function(data){
    vm.pagos=data.GetBuscaFacturasMaestroListResult;

    });
}
	var vm = this;
	vm.buscaContrato=buscaContrato;
}
angular.module('softvApp').controller('RecepcionPagoCtrl', RecepcionPagoCtrl);


