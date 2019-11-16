'use strict';
angular.module('softvApp').controller('BitacoraCtrl', BitacoraCtrl);

function BitacoraCtrl($uibModal, ContratoMaestroFactory, moment) {
  var vm = this;
  vm.BuscarResultados = BuscarResultados;

  /// Obtiene la bitacora de las facturas maestro
  this.$onInit = function () {
    ContratoMaestroFactory.GetBuscaBitacoraMaestro('', '', '', 0, '01/01/1900').then(function (data) {
      vm.Resultados = data.GetBuscaBitacoraMaestroResult;
    });
  }

  /// Agrega en la ventana la informacion d ela bitacora
  function BuscarResultados(Op) {
    var Clv_Usuario = '';
    var Modulo = '';
    var Descripcion = '';
    var Fecha = '01/01/1900'
    if (Op == 1) {
      Clv_Usuario = vm.Usuario;
    }
    else if (Op == 2) {
      Modulo = vm.Modulo;
    }
    else if (Op == 3) {
      Descripcion = vm.Descripcion;
    }
    else if (Op == 4) {
      Fecha = vm.Fecha;
    }
    ContratoMaestroFactory.GetBuscaBitacoraMaestro(Clv_Usuario, Modulo, Descripcion, Op, Fecha).then(function (data) {
      vm.Resultados = data.GetBuscaBitacoraMaestroResult;
    });
  }

}
