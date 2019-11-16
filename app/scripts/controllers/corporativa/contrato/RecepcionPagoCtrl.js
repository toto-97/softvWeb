'use strict';

function RecepcionPagoCtrl($uibModal, $rootScope, corporativoFactory, $filter, ngNotify, $state, ContratoMaestroFactory, pagosMaestrosFactory) {
  
  /// Muestra las facturas maestras
  this.$onInit = function () {
    ContratoMaestroFactory.GetMuestraFacturasMaestroList().then(function (data) {
      vm.pagos = data.GetMuestraFacturasMaestroListResult;

    });
  }

  /// Muestra las facturas maestras
  function saldadas() {
    var parametros;
    if (vm.pendientes == 1) {
      ContratoMaestroFactory.GetMuestraFacturasMaestroList().then(function (data) {
        vm.pagos = data.GetMuestraFacturasMaestroListResult;
      });
      vm.pagar = false;
    } else if (vm.pendientes == 2) {
      parametros = {
        'Fecha': '',
        'Ticket': '',
        'ContratoMaestro': 0,
        'Cliente': '',
        'Op': 5,
        'Saldada': 1
      };
      ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
        vm.pagos = data.GetBuscaFacturasMaestroListResult;
      });
      vm.pagar = true;
    } else if (vm.pendientes == 3) {
      parametros = {
        'Fecha': '',
        'Ticket': '',
        'ContratoMaestro': 0,
        'Cliente': '',
        'Op': 5,
        'Saldada': 0
      };
      ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
        vm.pagos = data.GetBuscaFacturasMaestroListResult;
      });
      vm.pagar = false;
    }
  }

  /// Busca una factura port un contrato
  function buscaContrato(opcion) {
    var parametros;
    if (opcion == 2) {
      if (vm.Ticket == undefined || vm.Ticket == '') {
        ngNotify.set('Seleccione un ticket.', 'error');
      } else {
        parametros = {
          'Fecha': '',
          'Ticket': vm.Ticket,
          'ContratoMaestro': 0,
          'Cliente': '',
          'Op': opcion,
          'Saldada': 1
        };
        ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
          vm.pagos = data.GetBuscaFacturasMaestroListResult;
        });
      }
    } else if (opcion == 3) {
      if (vm.ContratoMaestro == undefined || vm.ContratoMaestro == '') {
        ngNotify.set('Seleccione un contrato.', 'error');
      } else {
        parametros = {
          'Fecha': '',
          'Ticket': '',
          'ContratoMaestro': (vm.ContratoMaestro == null) ? 0 : vm.ContratoMaestro,
          'Cliente': '',
          'Op': opcion,
          'Saldada': 0
        };
        ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
          vm.pagos = data.GetBuscaFacturasMaestroListResult;
        });
      }
    } else if (opcion == 4) {
      if (vm.Cliente == undefined || vm.Cliente == '') {
        ngNotify.set('Seleccione un cliente.', 'error');
      } else {
        parametros = {
          'Fecha': '',
          'Ticket': '',
          'ContratoMaestro': 0,
          'Cliente': vm.Cliente,
          'Op': opcion,
          'Saldada': 0
        };
        ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
          vm.pagos = data.GetBuscaFacturasMaestroListResult;
        });
      }
    } else if (opcion == 1) {
      if (vm.Fecha == undefined || vm.Fecha == '') {
        ngNotify.set('Seleccione una fecha.', 'error');
      } else {
        vm.auxFechaInicio = $filter('date')(vm.Fecha, 'dd/MM/yyyy');
        parametros = {
          'Fecha': vm.auxFechaInicio,
          'Ticket': '',
          'ContratoMaestro': 0,
          'Cliente': '',
          'Op': opcion,
          'Saldada': 0
        };
        ContratoMaestroFactory.BuscaFacturasMaestro(parametros).then(function (data) {
          vm.pagos = data.GetBuscaFacturasMaestroListResult;
        });
      }
    }
    vm.Ticket = '';
    vm.ContratoMaestro = '';
    vm.Cliente = '';
    $('.buscarContrato').collapse('hide');
  }

  $rootScope.$on('realoadBrowse', function () {
    reloadTables();
  });

  /// Carga los datos de las facturas en una tabla
  function reloadTables() {
    ContratoMaestroFactory.GetMuestraFacturasMaestroList().then(function (data) {
      vm.pagos = data.GetMuestraFacturasMaestroListResult;
    });
  }

  /// Valida y realiza los pagos con credito
  function PagarCredito(x) {
 
    ContratoMaestroFactory.GetValidaSipuedohacerPagoc(x.ContratoMaestro, x.Clv_FacturaMaestro).then(function (response) {
  
      if (x.Importe <= (x.TotalAbonado + x.TotalNotas)) {
        ngNotify.set('Ya se saldo el adeudo.', 'error');
        return;
      }


      vm.Bnd = response.GetValidaSipuedohacerPagocResult.Bnd;
      if (x.Status == "Activa") {
        /* if (x.Importe <= x.TotalAbonado) {
           ngNotify.set('Ya se saldo el adeudo.', 'error');
         } else {*/
      
        if (vm.Bnd == 1) {
          ngNotify.set('No se puede ingresar el pago sin haber saldado la factura anterior.', 'error');
          return;
        }
        else if (vm.Bnd === 2){
          ngNotify.set('No es posible ingresar un pago. No tiene folio Fiscal', 'error');
          return;
        }
        console.log('sd');
        if (x.ACuantosPagos === 'N/A') {
          var items = {
            Modo: 'n'
          };
          vm.animationsEnabled = true;
          var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/corporativa/TipoPagoRecepcion.html',
            controller: 'TipoPagoRecepcionCtrl',
            controllerAs: '$ctrl',
            backdrop: 'static',
            keyboard: false,
            size: 'sm',
            resolve: {
              items: function () {
                return items;
              },
              elem1: function () {
                return x.Importe;
              },
              x: function () {
                return x;
              },
              proceso: function () {
                return 'RP';
              }
            }
          });
        } else if (x.ACuantosPagos == 'Variables') {
          var monto = (x.Importe - x.PagoInicial) / x.ACuantosPagos;
          var restante = (x.Importe - (x.TotalAbonado + x.TotalNotas));
          if (restante < monto) {
            monto = restante;
          }
          var items = {
            Modo: 'v'
          };
          vm.animationsEnabled = true;
          var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/corporativa/CantidadPagoRecepcion.html',
            controller: 'CantidadPagoRecepcionCtrl',
            controllerAs: '$ctrl',
            backdrop: 'static',
            keyboard: false,
            size: 'md',
            resolve: {
              items: function () {
                return items;
              },
              elem1: function () {
                return monto;
              },
              x: function () {
                return x;
              },
              proceso: function () {
                return 'RP';
              },
              metodo: function() {
                return '';
              }
            }
          });
        } else {
          var monto = (x.Importe - x.PagoInicial) / x.ACuantosPagos;
          var restante = (x.Importe - (x.TotalAbonado + x.TotalNotas));
          if (restante < monto) {
            monto = restante;
          }
          var items = {
            Modo: 'f'
          };
          vm.animationsEnabled = true;
          var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/corporativa/CantidadPagoRecepcion.html',
            controller: 'CantidadPagoRecepcionCtrl',
            controllerAs: '$ctrl',
            backdrop: 'static',
            keyboard: false,
            size: 'md',
            resolve: {
              items: function () {
                return items;
              },
              elem1: function () {
                return monto;
              },
              x: function () {
                return x;
              },
              proceso: function () {
                return 'RP';
              }
            }
          });
        }

      } else {
        ngNotify.set('La factura ya ha sido cancelada.', 'error');
      }
    });
  }

  /// Obtiene el historial de las fucturas
  function historial(x) {

    pagosMaestrosFactory.obtenFacturas(x.Clv_FacturaMaestro).then(function (data) {

      vm.historialPagos = data.GetObtieneHistorialPagosFacturaMaestroListResult;
      for (var a = 0; a < vm.historialPagos.length; a++) {
        vm.historialPagos[a].Clv_FacturaMaestro = x.Clv_FacturaMaestro;
      }
    });
  }

  /// Muestra los datos de una factura para pagar
  function verFactura(clvPago, Medio) {
    var MedioAux = '';
    if(Medio == 'Nota de Crédito'){
      MedioAux = 'Nota';
    }
    else{
      MedioAux = 'Pago';
    }
    pagosMaestrosFactory.verFacturas(clvPago, MedioAux).then(function (data) {
      console.log('data',data);
      vm.facturas = data.GetFacturasPorCliDePagoResult;
    });
  }

  /// Muestra los detalles de los pagos
  function detalle(x) {
    vm.animationsEnabled = true;
    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/corporativa/detalle.html',
      controller: 'DetalleCtrl',
      controllerAs: '$ctrl',
      backdrop: 'static',
      keyboard: false,
      size: 'md',
      resolve: {
        x: function () {
          return x;
        }
      }
    });
  }

  /// Busca un contrato en especial
  function enterContrato(event, opcion) {
    if (event.which === 13) {
      buscaContrato(opcion);
    }
  }

  $rootScope.$on('reload', function (e, Clv_FacturaMaestro) {
    pagosMaestrosFactory.obtenFacturas(Clv_FacturaMaestro).then(function (data) {

      vm.historialPagos = data.GetObtieneHistorialPagosFacturaMaestroListResult;
      for (var a = 0; a < vm.historialPagos.length; a++) {
        vm.historialPagos[a].Clv_FacturaMaestro = x.Clv_FacturaMaestro;
      }
    });
  });

  /// Abre una ventana par ala cancelacion de la factura
  function cancelarfactura(object) {

    ContratoMaestroFactory.GetValidaSipuedoCancelarPago(object.Clv_Pago).then(function (data) {
    
      if (data.GetValidaSipuedoCancelarPagoResult.Msg != '') {
        ngNotify.set(data.GetValidaSipuedoCancelarPagoResult.Msg, 'warn')
      } else {
        var options = {};
        options.Clv_Pago = object.Clv_Pago;
        options.contrato = object.Clv_FacturaMaestro;
        options.pregunta = '¿ Estas seguro de cancelar la factura #' + object.Clv_Pago + ' ?';
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/corporativa/ModalHazPregunta.html',
          controller: 'ModalCancelaFacturaCtrl',
          controllerAs: '$ctrl',
          backdrop: 'static',
          keyboard: false,
          class: 'modal-backdrop fade',
          size: 'md',
          resolve: {
            options: function () {
              return options;
            }
          }
        });

      }

    });



  }

  var vm = this;
  vm.saldadas = saldadas;
  vm.buscaContrato = buscaContrato;
  vm.PagarCredito = PagarCredito;
  vm.historial = historial;
  vm.verFactura = verFactura;
  vm.detalle = detalle;
  vm.enterContrato = enterContrato;
  vm.cancelarfactura = cancelarfactura;
}
angular.module('softvApp').controller('RecepcionPagoCtrl', RecepcionPagoCtrl);
