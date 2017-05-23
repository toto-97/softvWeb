(function () {
  'use strict';

  angular
    .module('softvApp')
    .controller('nuevaNotaCreditoCtrl', nuevaNotaCreditoCtrl);

  nuevaNotaCreditoCtrl.inject = ['$uibModal', '$state', '$rootScope', 'ngNotify', 'ContratoMaestroFactory', '$localStorage', '$filter'];

  function nuevaNotaCreditoCtrl($uibModal, $state, $rootScope, ngNotify, ContratoMaestroFactory, $localStorage, $filter) {
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
    vm.abrirTicket = abrirTicket;
    vm.mostrarbtn = true;
    vm.clvnota = 0;
    vm.revertir = false;
    vm.Detallefactura = Detallefactura;

    this.$onInit = function () {
      ContratoMaestroFactory.StatusNotadeCredito().then(function (data) {
        vm.StatusList = data.GetStatusNotadeCreditoListResult;
        vm.StatusList.Clv_Status = "A";
      });
    }

    function abrirTicket(factura) {

      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/corporativa/ModalTicketNota.html',
        controller: 'ModalTicketNotaCtrl',
        controllerAs: 'ctrl',
        backdrop: 'static',
        keyboard: false,
        size: "sm",
        resolve: {
          factura: function () {
            return factura;
          }
        }
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

     $rootScope.$on('actualiza_detalle', function (e, obj) {       
     
          ContratoMaestroFactory.GetDetalle_NotasdeCreditoList( obj.clv_session).then(function (data) {
            vm.DetalleNota = data.GetDetalle_NotasdeCreditoListResult;
            calcular();
          });
          ContratoMaestroFactory.GetCalcula_monto(vm.factura.CLV_FACTURA).then(function (data) {
            vm.Monto = data.GetCalcula_montoResult.Monto;
            
          });
     
    });


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


    function Detallefactura(obj) {
      var options = {};
      options.clv_session = vm.clv_session;
      options.Clv_FacturaCli = obj.Clv_FacturaCli;
      options.contratocom = obj.ContratoCompuesto;
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/corporativa/ModalDetalleFacCli.html',
        controller: 'ModalDetalleFacCliCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        keyboard: false,
        size: "lg",
        resolve: {
          options: function () {
            return options;
          }
        }
      });
    }


    function cambioFactura() {
      ContratoMaestroFactory.GetObtieneDatosTicketList(vm.factura.CLV_FACTURA).then(function (data) {
        vm.Caja = data.GetObtieneDatosTicketListResult.Caja[0].NOMBRE;
        vm.clvcaja = data.GetObtieneDatosTicketListResult.Caja[0].CLV_USUARIO
        vm.Sucursal = data.GetObtieneDatosTicketListResult.Sucursal[0];
        vm.NSucursal = data.GetObtieneDatosTicketListResult.Sucursal[0].NOMBRE;
        vm.Cajero = data.GetObtieneDatosTicketListResult.Cajero;
        vm.usuario = $localStorage.currentUser.usuario


        ContratoMaestroFactory.DetalleContratosFM(vm.factura.CLV_FACTURA).then(function (result) {
          console.log(result);
          vm.clv_session = result.GetDetalleContratosFMListResult.ListaDos[0].Clv_Session;
          vm.contratos = result.GetDetalleContratosFMListResult.ListaUno;
          ContratoMaestroFactory.GetDetalle_NotasdeCreditoList(vm.clv_session).then(function (data) {
            vm.DetalleNota = data.GetDetalle_NotasdeCreditoListResult;
            calcular();
          });
          ContratoMaestroFactory.GetCalcula_monto(vm.factura.CLV_FACTURA).then(function (data) {
            console.log(datas);
            vm.Monto = data.GetCalcula_montoResult.Monto;
            
          });
          
        });





      });

    }

    function guardar() {
      var obj = {
        'ContratoMaestro': vm.Contrato,
        'Factura': vm.factura.CLV_FACTURA,
        'Fecha_deGeneracion': vm.FechaG,
        'Usuario_Captura': $localStorage.currentUser.usuario,
        'Usuario_Autorizo': $localStorage.currentUser.idUsuario,
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
        vm.Clv_NotadeCredito = data.GetAddNotaCreditoResult[0].Clv_NotadeCredito;
        ContratoMaestroFactory.GetGuarda_DetalleNota(vm.clv_session, vm.Clv_NotadeCredito).then(function (data) {
          ngNotify.set('La nota de crédito se ha guardado correctamente', 'success');
          if (vm.revertir == true) {
            ContratoMaestroFactory.GetProcedimientoCancelar(vm.factura.CLV_FACTURA).then(function (data) {
              ngNotify.set(data.GetProcedimientoCancelarResult[0].Msg, 'success');
            })
          }
          ContratoMaestroFactory.AddMovSist(vm.Contrato, vm.sumatotal).then(function (data) {
            ContratoMaestroFactory.DeleteNotasDeCredito_ContraMaeFac(vm.factura.CLV_FACTURA, vm.Clv_NotadeCredito)
              .then(function (data) {});
          });
        });
        vm.mostrarbtn = false;
        vm.clvnota = vm.Clv_NotadeCredito;
        abrirTicket(vm.Clv_NotadeCredito);
      });

    }

    function calcular() {
      vm.sumatotal = 0;
      vm.DetalleNota.forEach(function (element) {
        console.log(element);
        vm.sumatotal += (element.importe == undefined) ? 0 : element.importe
      });
    }

  }
})();
