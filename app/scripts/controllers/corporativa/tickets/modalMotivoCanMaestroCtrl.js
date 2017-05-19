(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('modalMotivoCanMaestroCtrl', modalMotivoCanMaestroCtrl);

  modalMotivoCanMaestroCtrl.inject = ['$uibModalInstance', '$uibModal', 'ContratoMaestroFactory', 'ngNotify', '$rootScope', 'ticket'];

  function modalMotivoCanMaestroCtrl($uibModalInstance, $uibModal, ContratoMaestroFactory, ngNotify, $rootScope, ticket) {
    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    vm.op = ticket.op;

    this.$onInit = function () {
      console.log(ticket);
      vm.ContratoMaestro = ticket.ContratoMaestro;
      vm.Clv_FacturaMaestro = ticket.ContratoMaestro;
      if (vm.op == 'CAN') {
        ContratoMaestroFactory.MUESTRAMOTIVOS(0).then(function (data) {
          vm.motivos = data.GetMUESTRAMOTIVOSListResult;
        });
      } else {
        ContratoMaestroFactory.MUESTRAMOTIVOS(1).then(function (data) {
          vm.motivos = data.GetMUESTRAMOTIVOSListResult;
        });
      }

    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function ok() {
      var opcion;
      if (vm.op == 'CAN') {
        opcion = 5;
      } else {
        opcion = 6;
      }
   
      console.log(vm.op);
      console.log(opcion);
      console.log(vm.motcan);

      ContratoMaestroFactory.GuardaMotivos(vm.Clv_FacturaMaestro, vm.motcan.Clv_Motivo).then(function (data) {
       
        ContratoMaestroFactory.AddBitacoraTickets(vm.Clv_FacturaMaestro, vm.ContratoMaestro, opcion).then(function (data) {
         
          if (vm.op == 'CAN') {
            ContratoMaestroFactory.TblFacturasOpcionesCM(vm.Clv_FacturaMaestro, 1, 0).then(function (data) {
               $uibModalInstance.dismiss('cancel');
               ngNotify.set("Se ha cancelado la factura correctamente")
            });
          } else {
            ContratoMaestroFactory.TblFacturasOpcionesCM(vm.Clv_FacturaMaestro, 0, 1).then(function (data) {
             $uibModalInstance.dismiss('cancel');
             ngNotify.set("Se ha reimpreso la factura correctamente")
            });

          }

        });
      });
    }
  }
})();
