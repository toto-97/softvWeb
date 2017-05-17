(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('ticketsCorporativaCtrl', ticketsCtrl);

  ticketsCtrl.inject = ['ContratoMaestroFactory'];

  function ticketsCtrl() {

    function Buscar(opc) {

      var parametros = {};

      if (opc == 1) {
        parametros = {
          'Fecha': vm.fecha,
          'Ticket': '',
          'ContratoMaestro': '',
          'Cliente': '',
          'Op': 1,
          'Saldada': 0
        };

      } else if (opc == 2) {
        parametros = {
          'Fecha': '',
          'Ticket': vm.folio,
          'ContratoMaestro': '',
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
        console.log(data);
      });
    }


    var vm = this;
    vm.Buscar = Buscar;

  }
})();
