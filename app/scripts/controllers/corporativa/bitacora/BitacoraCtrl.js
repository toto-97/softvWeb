'use strict';
angular.module('softvApp').controller('BitacoraCtrl', BitacoraCtrl);

function BitacoraCtrl($uibModal, ContratoMaestroFactory, moment) {
  var vm = this;
  vm.BuscarResultados = BuscarResultados;
  this.$onInit = function () {
    ContratoMaestroFactory.GetBuscaBitacoraMaestro('', '', '', 0).then(function (data) {
      vm.Resultados = data.GetBuscaBitacoraMaestroResult;
    });  
  }

  function BuscarResultados(Op){
    var Clv_Usuario = '';
    var Modulo = '';
    var Descripcion = '';
    if(Op == 1){
        Clv_Usuario = vm.Usuario;
    }
    else if(Op == 2){
        Modulo = vm.Modulo;
    }
    else if(Op == 3){
        Descripcion = vm.Descripcion;
    }
    ContratoMaestroFactory.GetBuscaBitacoraMaestro(Clv_Usuario, Modulo, Descripcion, 0).then(function (data) {
        vm.Resultados = data.GetBuscaBitacoraMaestroResult;
      });
  }

}
