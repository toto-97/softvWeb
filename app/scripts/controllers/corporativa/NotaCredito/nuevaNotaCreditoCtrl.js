'use strict';
angular.module('softvApp').controller('nuevaNotaCreditoCtrl', nuevaNotaCreditoCtrl);

function nuevaNotaCreditoCtrl($uibModal, $state, $rootScope, ngNotify, ContratoMaestroFactory, $localStorage, $filter) {

  function Init() {
    ContratoMaestroFactory.StatusNotadeCredito().then(function (data) {
      vm.StatusList = data.GetStatusNotadeCreditoListResult;
    });

  }

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
    vm.DetalleContrato = contrato;
    vm.Contrato = contrato.IdContratoMaestro;
    vm.MuestraDet = true;
    vm.DetalleNota = [];
    vm.Caja = '';
    vm.NSucursal = '';
    vm.Cajero = [];
    vm.usuario = $localStorage.currentUser.usuario
    facturas(vm.Contrato);
  });

  function facturas(contrato) {
    ContratoMaestroFactory.DAME_FACTURASDECLIENTE(contrato).then(function (data) {
      vm.facturas = data.GetDAME_FACTURASDECLIENTEListResult;

    });
  }

  function enter(keyEvent) {
    if (keyEvent.which === 13) {
      if (vm.Contrato > 0) {
        var parametros = {
          'RazonSocial': '',
          'NombreComercial': '',
          'ClvCiudad': vm.Contrato,
          'Op': 4
        };
        ContratoMaestroFactory.BuscarContratos(parametros).then(function (data) {
          console.log(data);
          if (data.GetBusquedaContratoMaestroFacResult.length > 0) {
            vm.DetalleContrato = data.GetBusquedaContratoMaestroFacResult[0];
            vm.Contrato = data.GetBusquedaContratoMaestroFacResult[0].IdContratoMaestro;
            vm.MuestraDet = true;
            vm.DetalleNota = [];
            vm.Caja = '';
            vm.NSucursal = '';
            vm.Cajero = [];
            vm.usuario = $localStorage.currentUser.usuario
            facturas(vm.Contrato);
          } else {
            ngNotify.set('No se encontró un contrato  con la clave proporcionada', 'error');
          }
        });
      } else {
        ngNotify.set('Ingresa un contrato válido', 'error');
      }
    }

  }


  function cambioFactura() {
    ContratoMaestroFactory.GetObtieneDatosTicketList(vm.factura.CLV_FACTURA).then(function (data) {
      console.log(data);
      vm.Caja = data.GetObtieneDatosTicketListResult.Caja[0].NOMBRE;
      vm.clvcaja = data.GetObtieneDatosTicketListResult.Caja[0].CLV_USUARIO
      console.log(vm.Caja);
      vm.Sucursal = data.GetObtieneDatosTicketListResult.Sucursal[0];
      vm.NSucursal = data.GetObtieneDatosTicketListResult.Sucursal[0].NOMBRE;
      vm.Cajero = data.GetObtieneDatosTicketListResult.Cajero;
      vm.usuario = $localStorage.currentUser.usuario

      ContratoMaestroFactory.GetDetalle_NotasdeCreditoList(vm.factura.CLV_FACTURA).then(function (data) {
        console.log(data);
        vm.DetalleNota = data.GetDetalle_NotasdeCreditoListResult;

        ContratoMaestroFactory.GetCalcula_monto(vm.factura.CLV_FACTURA).then(function (data) {
          console.log(data);
          vm.Monto = data.GetCalcula_montoResult.Monto;
        });


      });

    });

  }

  function guardar() {
    //$localStorage.currentUser.idUsuario
    var obj = {
      'ContratoMaestro': vm.Contrato,
      'Factura': vm.factura.CLV_FACTURA,
      'Fecha_deGeneracion': vm.FechaG,
      'Usuario_Captura': $localStorage.currentUser.usuario,
      'Usuario_Autorizo': '',
      'Fecha_Caducidad': vm.FechaC,
      'Monto': vm.sumatotal,
      'Status': "A",
      'Observaciones': vm.Observaciones,
      'Clv_Sucursal': $localStorage.currentUser.sucursal,
      'Clv_suc_aplica': $localStorage.currentUser.sucursal,
      'Tipo': 0,
      'Caja': vm.clvcaja,
      'Contrato_Aplicar': 0,
    }

    ContratoMaestroFactory.GetAddNotaCredito(obj).then(function (data) {
      console.log(data);
      vm.Clv_NotadeCredito=data.GetAddNotaCreditoResult[0].Clv_NotadeCredito;
    ContratoMaestroFactory.GetGuarda_DetalleNota(vm.factura.CLV_FACTURA,vm.Clv_NotadeCredito).then(function(data){
      ngNotify.set('La nota de crédito se ha guardado correctamente', 'success');
    });

      /*ContratoMaestroFactory.AddMovSist(vm.Contrato, vm.sumatotal).then(function (data) {
        console.log(data);
       // DeleteNotasDeCredito_ContraMaeFac
      });*/

    });

  }

  function calcular() {
    vm.sumatotal = 0;
    vm.DetalleNota.forEach(function (element) {
      console.log(element.cantidad);
      vm.sumatotal += (element.cantidad == undefined) ? 0 : element.cantidad


    });



  }

  var vm = this;
  vm.abrirContratos = abrirContratos;
  vm.cambioFactura = cambioFactura;
  vm.MuestraDet = false;
  vm.enter = enter;
  vm.bloquear = false;
  vm.date = new Date();
  vm.FechaG = $filter('date')(vm.date, 'dd/MM/yyyy');
  vm.FechaC = $filter('date')(vm.date, 'dd/MM/yyyy');
  vm.calcular = calcular
  vm.guardar = guardar;
  vm.sumatotal = 0;
  Init()
}
