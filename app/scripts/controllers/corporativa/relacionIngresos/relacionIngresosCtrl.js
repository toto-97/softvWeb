angular
  .module('softvApp')
  .controller('relacionIngresosCtrl', relacionIngresosCtrl);

function relacionIngresosCtrl(ContratoMaestroFactory, relacionIngresosFactory,$filter, $sce,globalService,ngNotify) {

  /// Relaciona los ingresos
  this.$onInit = function () {
    /*ContratoMaestroFactory.GetDistribuidores().then(function (result) {
      console.log(result);
      vm.options = {
        filterPlaceHolder: 'filtrar distribuidor',
        labelAll: 'Todos los distribuidores',
        labelSelected: 'Distribuidores seleccionados',
        labelShow: 'Nombre',
        orderProperty: 'Nombre',
        items: result.GetDistribuidoresResult,
        selectedItems: []
      }
    });*/


    /// Valida la fecha para el pago
    var guardar = function () {
        var dis=[];
        if($filter('date')(vm.fechafin, 'yyyy/MM/dd') < $filter('date')(vm.fechainicio, 'yyyy/MM/dd')){
          ngNotify.set('El rango de fechas no es válido');
          return;
        }

        
        var fechainicio=$filter('date')(vm.fechainicio, 'yyyy/MM/dd');
        var fechafin=$filter('date')(vm.fechafin, 'yyyy/MM/dd');
        var dolares=(vm.dolares==true)?1:0;
        
        //vm.options.selectedItems.forEach(function(item){ dis.push(item.Clv_Plaza)});       
        //dis.push(item.Clv_Plaza);

        relacionIngresosFactory.GetRelacionIngresosMaestro(dis,fechainicio,fechafin,dolares,vm.exentoIVA).then(function (result) { 
        console.log(result);
        console.log(globalService.getUrlReportes()+"/Reportes/"+result.GetRelacionIngresosMaestroResult)
        vm.url = $sce.trustAsResourceUrl(globalService.getUrlReportes()+"/Reportes/"+result.GetRelacionIngresosMaestroResult);
      });
    }

    var vm = this;
    vm.guardar = guardar;
    vm.exentoIVA = false;

  }
}
