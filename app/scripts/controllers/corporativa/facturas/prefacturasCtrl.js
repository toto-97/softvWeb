'use strict';
angular.module('softvApp').controller('prefacturasCtrl', prefacturasCtrl);

function prefacturasCtrl($state, ContratoMaestroFactory, ngNotify, $filter, $uibModal, $scope, $rootScope) {

  /// Busca las prefacturas
  function Init() {
    buscar(1);
  }

  /// Busca los datos de un prefactura
  var buscar = function (op) {
    var parametros = {
      'Factura': (op === 2 && (vm.factura !== null || vm.factura !== undefined)) ? vm.factura : 0,
      'Fecha': (op === 3 && (vm.fecha !== null || vm.fecha !== undefined)) ? $filter('date')(vm.fecha, 'dd/MM/yyyy') : '',
      'Todas': (op === 1 && vm.todas === true) ? 1 : 0,
      'ContratoMaestro': (op === 4 && (vm.contrato !== null || vm.contrato !== undefined)) ? vm.contrato : 0,
      'Opcion': op
    };
    ContratoMaestroFactory.BuscaFacturasFisca(parametros)
      .then(function (data) {

        vm.facturas = data.GetBuscaFacturasFiscaListResult;
      });

  };
  
  /// Abre la ventana para editar una prefactura
  var Conceptos = function (clave, status) {
    var obj = {};
    obj.clave = clave;
    obj.status = status;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/corporativa/ModalEditaFacpreeliminar.html',
      controller: 'ModalEditaFacpreeliminarCtrl',
      controllerAs: '$ctrl',
      backdrop: 'static',
      keyboard: false,
      size: "lg",
      resolve: {
        obj: function () {
          return obj;
        }
      }
    });
  };

  /// Cancela una factura preliminar
  var CancelarFacturaPreliminar = function (FacturaMaestro) {
    var ticket = {};
    ticket.Clv_FacturaMaestro = FacturaMaestro.Clv_FacturaMaestro;
    ticket.Ticket = FacturaMaestro.Ticket;
    ticket.op = 'CAN';
    ticket.tipo = 'M';
    ticket.Modulo = 'Preliminar';
    ticket.ContratoMaestro = FacturaMaestro.ContratoMaestro;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/facturacion/modalCancelarTicket.html',
      controller: 'modalCancelaTicketCtrl',
      controllerAs: '$ctrl',
      backdrop: 'static',
      keyboard: false,
      class: 'modal-backdrop fade',
      size: 'md',
      resolve: {
        ticket: function () {
          return ticket;
        }
      }
    });
  }

  ///Ver detalles de los contratos de una factura preliminar
  var DetalleContratos = function (FacturaMaestro) {
    var ticket = {};
    ticket.Clv_FacturaMaestro = FacturaMaestro.Clv_FacturaMaestro;
    ticket.Ticket = FacturaMaestro.Ticket;
    ticket.op = 'CAN';
    ticket.tipo = 'M';
    ticket.ContratoMaestro = FacturaMaestro.ContratoMaestro;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/corporativa/ModalDetalleContratosPrefacturas.html',
      controller: 'ModalDetalleContratosPrefacturasCtrl',
      controllerAs: '$ctrl',
      backdrop: 'static',
      keyboard: false,
      class: 'modal-backdrop fade',
      size: 'lg',
      resolve: {
        ticket: function () {
          return ticket;
        }
      }
    });
  }

  /// Abre una ventana para agregar contratos
  function AgregarContratos(FacturaMaestro) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/corporativa/ModalAgregarContratos.html',
      controller: 'ModalAgregarContratosCtrl',
      controllerAs: '$ctrl',
      backdrop: 'static',
      keyboard: false,
      class: 'modal-backdrop fade',
      size: 'lg',
      resolve: {
        FacturaMaestro: function () {
          return FacturaMaestro;
        }
      }
    });
    modalInstance.result.then(function () {
      buscar(1);
      //alert('si');
    }, function () {
      //alert('Modal dismissed');
    });
  }

  $rootScope.$on('actualizar_listado', function (e, clave) {
    buscar(1);
  });

  $rootScope.$on('reload_tabla', function () {
    buscar(1);
  });


  var vm = this;
  Init();
  vm.buscar = buscar;
  vm.Conceptos = Conceptos;
  vm.CancelarFacturaPreliminar = CancelarFacturaPreliminar;
  vm.DetalleContratos = DetalleContratos;
  vm.AgregarContratos = AgregarContratos;
}
