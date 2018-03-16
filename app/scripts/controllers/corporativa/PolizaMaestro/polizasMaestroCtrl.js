'use strict';
angular.module('softvApp').controller('polizaMaestroCtrl', polizaMaestroCtrl);

function polizaMaestroCtrl($uibModal, ContratoMaestroFactory,ngNotify, corporativoFactory, $filter, globalService) {
  var vm = this;
  vm.BuscaPoliza = BuscaPoliza;
  vm.EliminaPoliza = EliminaPoliza;
  vm.Detalle = 0;
  vm.SelectedPoliza = {};
  vm.VerDetalles = VerDetalles;
  vm.QuitarDetalles = QuitarDetalles;
  vm.NuevaPoliza = NuevaPoliza;
  vm.Exportar = Exportar;
  vm.DolaresCheck = 0;
  vm.Dolares = 0;
  vm.CambiaDolares = CambiaDolares;

  this.$onInit = function () {
    var params = {};
    params.filtros = {
      'Op': 0,
      'Clv_Plaza': 0,
      'FechaPoliza': '19000101',
      'Clv_Poliza':0,
      'Dolares': vm.Dolares
    };
    corporativoFactory.GetObtienePolizasMaestro(params).then(function (data) {
      //console.log(data);
      vm.Polizas = data.GetObtienePolizasMaestroResult;
      ContratoMaestroFactory.GetDistribuidores().then(function (data) {
        vm.Distribuidores = data.GetDistribuidoresResult;
      });
    });
  }

  function BuscaPoliza(op){
    var params = {};
    if (op === 2)
    {
      params.filtros = {
        'Op': op,
        'Clv_Plaza': vm.Distribuidor.Clv_Plaza,
        'FechaPoliza': '19000101',
        'Clv_Poliza':0,
        'Dolares': vm.Dolares
      };
    }
    else{
      var fechaAux = $filter('date')(vm.Fecha, 'yyyyMMdd');

      params.filtros = {
        'Op': op,
        'Clv_Plaza': 0,
        'FechaPoliza': fechaAux,
        'Clv_Poliza':0,
        'Dolares': vm.Dolares
      };
    }
    console.log(vm.Dolares);
    vm.Detalle=0;
    corporativoFactory.GetObtienePolizasMaestro(params).then(function (data) {
      vm.Polizas = data.GetObtienePolizasMaestroResult;
    });
  }

  function EliminaPoliza(Clv_Poliza){
    //Eliminamos la póliza seleccionada
    var params = {};
    params.filtros = {
      'Op': 0,
      'Clv_Plaza': 0,
      'FechaPoliza': '19000101',
      'Clv_Poliza': Clv_Poliza,
      'Dolares': vm.Dolares
    };
    corporativoFactory.EliminaPoliza(params).then(function (data) {
      //Volvemos a llenar las pólizas desde el inicio
      params.filtros = {
        'Op': 0,
        'Clv_Plaza': 0,
        'FechaPoliza': '19000101',
        'Clv_Poliza':0,
        'Dolares': vm.Dolares
      };
      corporativoFactory.GetObtienePolizasMaestro(params).then(function (data) {
        vm.Polizas = data.GetObtienePolizasMaestroResult;
        ngNotify.set('La póliza se ha eliminado correctamente','success');
        location.reload();
      });
    });
  }

  function VerDetalles(Poliza){
    var params = {};
    params.filtros = {
      'Op': 0,
      'Clv_Plaza': 0,
      'FechaPoliza': '19000101',
      'Clv_Poliza': Poliza.Clv_Poliza,
      'Dolares': vm.Dolares
    };
    vm.Detalle=1;
    vm.SelectedPoliza = Poliza;
    corporativoFactory.GetDetallesPolizaMaestro(params).then(function (data) {
      vm.DetallePoliza = data.GetDetallesPolizaMaestroResult;
      console.log(vm.DetallePoliza);
    });
  }

  function QuitarDetalles(){
    vm.Detalle=0;
  }

  function NuevaPoliza(object) {
    vm.animationsEnabled = true;
    vm.modalInstanceNuevoPoliza = $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/corporativa/modalNuevoPolizaMaestro.html',
      controller: 'modalNuevoPolizaMaestroCtrl',
      controllerAs: '$ctrl',
      backdrop: 'static',
      keyboard: false,
      size: 'md',
      resolve: {
        plazas: function () {
          return vm.Distribuidores;
        }
      }
    });
    vm.modalInstanceNuevoPoliza.result.then(function (poliza) {
      var params = {};
      params.filtros = {
        'Op': 0,
        'Clv_Plaza': 0,
        'FechaPoliza': '19000101',
        'Clv_Poliza': poliza.Clv_Poliza,
        'Dolares': vm.Dolares
      };
      vm.Detalle=1;
      vm.SelectedPoliza = poliza;
      corporativoFactory.GetDetallesPolizaMaestro(params).then(function (data) {
        vm.DetallePoliza = data.GetDetallesPolizaMaestroResult;
      });
    }, function () {
        //alert('Modal dismissed');
    });
  }

  function Exportar(Clv_Poliza){
    var params = {};
    params.filtros = {
      'Op': 0,
      'Clv_Plaza': 0,
      'FechaPoliza': '19000101',
      'Clv_Poliza': Clv_Poliza,
      'Dolares': vm.Dolares
    };
    vm.url = '';
    corporativoFactory.GetPolizaTxt(params).then(function (data) {
      vm.url = globalService.getUrlReportes() + '/' + data.GetPolizaTxtResult;
      //$window.open(vm.url, '_self');

      var isChrome = !!window.chrome && !!window.chrome.webstore;
      var isIE = /*@cc_on!@*/ false || !!document.documentMode;
      var isEdge = !isIE && !!window.StyleMedia;


      if (isChrome) {
        var url = window.URL || window.webkitURL;

        var downloadLink = angular.element('<a></a>');
        downloadLink.attr('href', vm.url);
        downloadLink.attr('target', '_self');
        downloadLink.attr('download', 'invoice.pdf');
        downloadLink[0].click();
      } else if (isEdge || isIE) {
        window.navigator.msSaveOrOpenBlob(vm.url, 'invoice.txt');

      } else {
        var fileURL = vm.url;
        window.open(fileURL);
      }
    });
  }

  function CambiaDolares(){
    if (vm.DolaresCheck === true){
      vm.Dolares = 1;
    }
    else if (vm.DolaresCheck === false){
      vm.Dolares=0;
    }
  }
}
