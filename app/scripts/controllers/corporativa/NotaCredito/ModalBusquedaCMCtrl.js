(function () {
  'use strict';

  angular 
    .module('softvApp')
    .controller('ModalBusquedaCMCtrl', ModalBusquedaCMCtrl);

  ModalBusquedaCMCtrl.inject = ['$uibModalInstance', '$uibModal', '$rootScope', 'ngNotify', 'ContratoMaestroFactory'];
  function ModalBusquedaCMCtrl($uibModalInstance, $uibModal, $rootScope, ngNotify, ContratoMaestroFactory) {
    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    vm.BuscarCiudad = BuscarCiudad;
    vm.BuscarRazonS = BuscarRazonS;
    vm.BuscarNombrec = BuscarNombrec;
    vm.Buscarporcontrato = Buscarporcontrato;

    /// Obtiene los contratos maestros
    this.$onInit = function () {
      ContratoMaestroFactory.GetContratoList().then(function (data) {
        vm.Contratos = data.GetContratos_CSResult;
        ContratoMaestroFactory.GetDistribuidores().then(function (data) {
          vm.Distribuidores = data.GetDistribuidoresResult;
          ContratoMaestroFactory.GetCiudadList(vm.Distribuidores[0].Clv_Plaza).then(function (data) {
            vm.Ciudades = data.GetListaCiudadesPorPlazaResult;
          });
        });
      });
    }

    /// Busca el contrato mestro
    function Buscarporcontrato() {
      if (vm.contratobusqueda == null) {
        return;
      }
      var obj = {
        'RazonSocial': '',
        'NombreComercial': '',
        'ClvCiudad': vm.contratobusqueda,
        "Op": 4
      };
      ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
        vm.Contratos = data.GetBusquedaContratoMaestroFacResult;
      });
    }

    /// Busca un contrato maestro por nombre
    function BuscarNombrec() {
      var obj = {
        'RazonSocial': '',
        'NombreComercial': vm.NombreComer,
        'ClvCiudad': 0,
        "Op": 2
      };

      ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
        vm.Contratos = data.GetBusquedaContratoMaestroFacResult;
      });
    }

    /// Busca un contrato maestro por razon social
    function BuscarRazonS() {
      var obj = {
        'RazonSocial': vm.RazonS,
        'NombreComercial': '',
        'ClvCiudad': 0,
        "Op": 1
      };
      ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
        vm.Contratos = data.GetBusquedaContratoMaestroFacResult;
      });
    }

    /// Busca un contrato maestro por ciudad
    function BuscarCiudad() {
      if (vm.Ciudad.Clv_Ciudad == null) {
        return;
      }
      var obj = {
        'RazonSocial': '',
        'NombreComercial': '',
        'ClvCiudad': vm.Ciudad.Clv_Ciudad,
        "Op": 3
      };
      ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
        vm.Contratos = data.GetBusquedaContratoMaestroFacResult;
      });
    }

    /// Cancela la operacion
    function cancel() {
      $uibModalInstance.dismiss('cancel');

    }

    /// Busca el contrato con los parametros puestos
    function ok(contrato) {
      $rootScope.$emit('contrato_nota', contrato);
      $uibModalInstance.dismiss('cancel');
    }

  }
})();