angular
  .module("softvApp")
  .controller("reporteDetallePagoCtrl", reporteDetallePagoCtrl);

function reporteDetallePagoCtrl(
  ContratoMaestroFactory,
  $filter,
  $sce,
  globalService,
  ngNotify,
  $window
) {
  this.$onInit = function() {
    ContratoMaestroFactory.GetDistribuidores().then(function(result) {
      console.log(result);
      vm.options = {
        filterPlaceHolder: "filtrar distribuidor",
        labelAll: "Todos los distribuidores",
        labelSelected: "Distribuidores seleccionados",
        labelShow: "Nombre",
        orderProperty: "Nombre",
        items: result.GetDistribuidoresResult,
        selectedItems: []
      };
    });

    var guardar = function() {
      var dis = [];
      if (
        $filter("date")(vm.fechafin, "yyyy/MM/dd") <
        $filter("date")(vm.fechainicio, "yyyy/MM/dd")
      ) {
        ngNotify.set("El rango de fechas no es válido");
        return;
      }
      var fechainicio = $filter("date")(vm.fechainicio, "yyyy/MM/dd");
      var fechafin = $filter("date")(vm.fechafin, "yyyy/MM/dd");
      var dolares = vm.dolares == true ? 1 : 0;
      vm.options.selectedItems.forEach(function(item) {
        dis.push(item.Clv_Plaza);
      });

      ContratoMaestroFactory.GetDetallePagos(dis, fechainicio, fechafin).then(
        function(result) {
           
          console.log(globalService.getUrlReportes()+"/Reportes/"+result.GetDetallePagosResult);
          $window.open(globalService.getUrlReportes()+"/Reportes/"+result.GetDetallePagosResult, '_self');
        }
      );
    };

    var vm = this;
    vm.guardar = guardar;
  };
}
