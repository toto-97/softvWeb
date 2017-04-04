'use strict';

function RecepcionPagoCtrl($uibModal, $rootScope, corporativoFactory, $filter, ngNotify, $state, ContratoMaestroFactory) {
  this.$onInit = function () {
    ContratoMaestroFactory.GetMuestraFacturasMaestroList().then(function (data) {
      console.log(data);
      vm.pagos = data.GetMuestraFacturasMaestroListResult;

    });
  }

  function buscaContrato(opcion) {
    var parametros;
    if (opcion == 2) {
      parametros = {
        'Fecha': '',
        'Ticket': vm.Ticket,
        'ContratoMaestro': 0,
        'Cliente': '',
        'Op': opcion
      };
    } else if (opcion == 3) {
      parametros = {
        'Fecha': '',
        'Ticket': '',
        'ContratoMaestro': (vm.ContratoMaestro == null) ? 0 : vm.ContratoMaestro,
        'Cliente': '',
        'Op': opcion
      };
    } else {
      parametros = {
        'Fecha': '',
        'Ticket': '',
        'ContratoMaestro': 0,
        'Cliente': vm.Cliente,
        'Op': opcion
      };
    }
    ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
      vm.pagos = data.GetBuscaFacturasMaestroListResult;

    });
  }

  function PagarCredito(x) {
    console.log(x);
    var items = {
        Contrato: vm.Contratos.IdContratoMaestro,
        Compania: vm.saldo.IdCompania,
        Distribuidor: vm.saldo.IdDistribuidor,
        Session: vm.saldo.ClvSession,
        SessionPadre: vm.saldo.ClvSessionPadre,
        Monto: data.GetDeepSumaTotalDetalleResult.Monto
    };
    vm.animationsEnabled = true;
    var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/corporativa/abrirPago.html',
        controller: 'AbrirPagoCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        keyboard: false,
        size: 'sm',
        resolve: {
            items: function () {
                return items;
            }
        }
    });
  }

  var vm = this;
  vm.buscaContrato = buscaContrato;
  vm.PagarCredito = PagarCredito;
}
angular.module('softvApp').controller('RecepcionPagoCtrl', RecepcionPagoCtrl);
