'use strict';
angular.module('softvApp').controller('polizasMaestroCobrosCtrl', polizasMaestroCobrosCtrl);

function polizasMaestroCobrosCtrl($uibModal, ContratoMaestroFactory,ngNotify, corporativoFactory, $filter, globalService, $state) {
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
      'ContratoMaestro': 0
    };
    corporativoFactory.GetObtienePolizasMaestroCobros(params).then(function (data) {
      console.log(data);
      vm.Polizas = data.GetObtienePolizasMaestroCobrosResult;
      /*ContratoMaestroFactory.GetDistribuidores().then(function (data) {
        vm.Distribuidores = data.GetDistribuidoresResult;
      });*/
    });
  }

  function BuscaPoliza(op){
    var params = {};
    if (op === 2)
    {
      params.filtros = {
        'Op': op,
        'Clv_Plaza': 0,
        'FechaPoliza': '19000101',
        'Clv_Poliza':0,
        'ContratoMaestro': vm.ContratoMaestro
      };
    }
    else{
      var fechaAux = $filter('date')(vm.Fecha, 'yyyyMMdd');

      params.filtros = {
        'Op': op,
        'Clv_Plaza': 0,
        'FechaPoliza': fechaAux,
        'Clv_Poliza':0,
        'ContratoMaestro': 0
      };
    }
    console.log(vm.Dolares);
    vm.Detalle=0;
    corporativoFactory.GetObtienePolizasMaestroCobros(params).then(function (data) {
      vm.Polizas = data.GetObtienePolizasMaestroCobrosResult;
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
      corporativoFactory.GetObtienePolizasMaestroCobros(params).then(function (data) {
        vm.Polizas = data.GetObtienePolizasMaestroCobrosResult;
        ngNotify.set('La póliza se ha eliminado correctamente','success');
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
    corporativoFactory.GetDetallesPolizaMaestroCobros(params).then(function (data) {
      vm.DetallePoliza = data.GetDetallesPolizaMaestroCobrosResult;
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
      templateUrl: 'views/corporativa/modalNuevoPolizaMaestroCobro.html',
      controller: 'modalNuevoPolizaMaestroCobroCtrl',
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
      $state.go('home.corporativa.polizasPagosConsulta', {id: poliza.Clv_Poliza});
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
    corporativoFactory.GetPolizaTxtCobros(params).then(function (data) {
      vm.url = globalService.getUrlReportes() + '/' + data.GetPolizaTxtCobrosResult;
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
