'use strict';
angular.module('softvApp').controller('nuevaNotaCreditoCtrl', nuevaNotaCreditoCtrl);

function nuevaNotaCreditoCtrl($uibModal, $state, $rootScope, ngNotify) {


  function abrirContratos() {

    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/corporativa/ModalBuscaContratoMaestro.html',
      controller: 'ModalBusquedaCMCtrl',
      controllerAs: '$ctrl',
      backdrop: 'static',
      keyboard: false,
      size: "lg",
      resolve: {}
    });
  }

  $rootScope.$on('contrato_nota', function (e, contrato) {
    console.log(contrato);
    vm.DetalleContrato=contrato;
    vm.Contrato = contrato.IdContratoMaestro;
  });


  var vm = this;
  vm.abrirContratos = abrirContratos;
}
