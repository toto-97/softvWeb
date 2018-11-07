'use strict';
angular.module('softvApp').controller('CantidadPagoRecepcionCtrl', CantidadPagoRecepcionCtrl);

function CantidadPagoRecepcionCtrl($uibModal, inMenu, $uibModalInstance, items, $localStorage, elem1, x, pagosMaestrosFactory, ngNotify, metodo) {
  function init() {
    //console.log('items',items);
    //console.log('elem1',elem1);
    //console.log('x',x);
    vm.MonedaFacturaOriginal = x.Moneda;
    //console.log('x',x);
    //console.log('elem1',elem1);
    if (x.PagoInicial == null || x.PagoInicial == undefined) {
      x.PagoInicial = 0;
    }
    //console.log('x.Importe',x.Importe);
    //console.log('x.PagoInicial',x.PagoInicial);
    //vm.monto = (x.Importe - x.PagoInicial) / 1;
    vm.monto = x.Importe - (x.TotalAbonado + x.TotalNotas);
    //console.log('vm.monto',vm.monto);
    if (elem1 < vm.monto) {
      vm.monto = elem1
    }
    if (items.Modo == 'f') {
      vm.minimo = true;
    }
    else {
      vm.minimo = false;
    }
  }

  function CambioMoneda() {
    if (vm.MonedaFacturaOriginal == 'USD' && items.Modo == 'vT') {
      if (vm.Moneda.IdMoneda == 'USD') {
        vm.abono = vm.monto;
      }
      else if (vm.Moneda.IdMoneda == 'MXN' && vm.TipoCambio != undefined) {
        vm.abono = parseFloat(parseFloat(vm.monto * vm.TipoCambio).toFixed(4));
        abonoTotal();
      }
    }
  }

  function abonoTotal() {
    if (vm.abono != undefined && vm.abono != undefined) {
      if (vm.MonedaFacturaOriginal == 'USD' && vm.Moneda.IdMoneda == 'MXN') {
        if (vm.MonedaCapturada == 'USD') { //Importe capturado de la misma moneda de la factura
          //alert('Importe capturado de la misma moneda de la factura');
          var pagar = parseFloat(x.Importe - (x.TotalAbonado + x.TotalNotas)).toFixed(4);
          var monto = parseFloat(vm.monto).toFixed(4);
          vm.abonoConversion = vm.abono * vm.TipoCambio;
          vm.abonoConversion = parseFloat(parseFloat(vm.abonoConversion).toFixed(4));
          if (vm.minimo !== true) {
            if (vm.abono > pagar) {
              vm.abono = parseFloat(pagar);
            }
          } else {
            if (vm.abono > monto) {
              vm.abono = parseFloat(monto);
            }
          }
        }
        else {//Importe capturado diferente moneda de la factura 
          //alert('Importe capturado diferente moneda de la factura');
          var pagar = parseFloat(x.Importe - (x.TotalAbonado + x.TotalNotas)).toFixed(4);
          var pagarConversion = parseFloat((pagar * vm.TipoCambio).toFixed(4));
          var monto = parseFloat(vm.monto).toFixed(4);
          vm.abonoConversion = vm.abono / vm.TipoCambio;
          vm.abonoConversion = parseFloat(parseFloat(vm.abonoConversion).toFixed(4));
          if (vm.minimo !== true) {
            if (vm.abonoConversion > pagar) {
              vm.abono = parseFloat(pagarConversion);
            }
          } else {
            if (vm.abonoConversion > monto) {
              vm.abono = parseFloat(monto);
            }
          }
        }
      }
      else {
        var pagar = parseFloat(x.Importe - (x.TotalAbonado + x.TotalNotas)).toFixed(4);
        var monto = parseFloat(vm.monto).toFixed(4);
        if (vm.minimo !== true) {
          if (vm.abono > pagar) {
            vm.abono = parseFloat(pagar);
          }
        } else {
          if (vm.abono > monto) {
            vm.abono = parseFloat(monto);
          }
        }
      }
    }
  }

  function ok() {

    if (vm.abono === undefined || vm.abono === null || vm.abono === 0 || vm.abono < 0) {
      ngNotify.set('Capture el abono para continuar', 'error');
    } else if (items.Modo == 'v') {
      $uibModalInstance.dismiss('cancel');
      var elem = {
        PagoInicial: vm.abono,
        ClvFacturaMaestro: x.Clv_FacturaMaestro,
        Credito: 1,
        NoPago: 0
      };
      if (vm.MonedaFacturaOriginal == 'USD' && vm.Moneda.IdMoneda == 'MXN') {
        x.MonedaP = vm.Moneda.IdMoneda;
        x.TipoCambioDR = vm.TipoCambio;
        x.PagoMonedaP = vm.abonoConversion;
      }
      else {
        x.MonedaP = vm.MonedaFacturaOriginal;
        x.TipoCambioDR = 0;
        x.PagoMonedaP = 0;
      }
      console.log('x', x);
      vm.animationsEnabled = true;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/corporativa/FormaPagoRecepcion.html',
        controller: 'FormaPagoRecepcionCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        keyboard: false,
        size: 'md',
        resolve: {
          x: function () {
            return x;
          },
          elem: function () {
            return elem;
          }
        }
      });
    }
    else if (items.Modo == 'vT') {
      $uibModalInstance.dismiss('cancel');
      var elem = {
        PagoInicial: vm.abono,
        ClvFacturaMaestro: x.Clv_FacturaMaestro,
        Credito: 0,
        NoPago: 0
      };
      if (vm.MonedaFacturaOriginal == 'USD' && vm.Moneda.IdMoneda == 'MXN') {
        x.MonedaP = vm.Moneda.IdMoneda;
        x.TipoCambioDR = vm.TipoCambio;
        x.PagoMonedaP = vm.abonoConversion;
      }
      else {
        x.MonedaP = vm.MonedaFacturaOriginal;
        x.TipoCambioDR = 0;
        x.PagoMonedaP = 0;
      }
      console.log('x', x);
      vm.animationsEnabled = true;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/corporativa/FormaPagoRecepcion.html',
        controller: 'FormaPagoRecepcionCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        keyboard: false,
        size: 'md',
        resolve: {
          x: function () {
            return x;
          },
          elem: function () {
            return elem;
          }
        }
      });

    } else if (items.Modo == 'f') {
      if (vm.abono < vm.monto) {
        ngNotify.set('El abono no debe ser menor a la mensualidad.', 'error');
      } else {
        $uibModalInstance.dismiss('cancel');
        var elem = {
          PagoInicial: vm.abono,
          ClvFacturaMaestro: x.Clv_FacturaMaestro,
          Credito: metodo,
          NoPago: 0
        };
        vm.animationsEnabled = true;
        var modalInstance = $uibModal.open({
          animation: vm.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'views/corporativa/FormaPagoRecepcion.html',
          controller: 'FormaPagoRecepcionCtrl',
          controllerAs: '$ctrl',
          backdrop: 'static',
          keyboard: false,
          size: 'md',
          resolve: {
            x: function () {
              return x;
            },
            elem: function () {
              return elem;
            }
          }
        });
      }
    }
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }

  function CambiaMonedaCapturar() {
    if (vm.MonedaCapturada == 'USD') {
      vm.MonedaCapturada = 'MXN';
      vm.MonedaConvertir = 'USD';
    }
    else {
      vm.MonedaCapturada = 'USD';
      vm.MonedaConvertir = 'MXN';
    }
    if (vm.abono != undefined) {
      abonoTotal();
    }
  }

  var vm = this;
  vm.ok = ok;
  vm.abonoTotal = abonoTotal;
  vm.cancel = cancel;
  vm.factura = x.Ticket;
  init();
  vm.Monedas = [{
    IdMoneda: 'MXN',
    Moneda: 'MXN'
  }, {
    IdMoneda: 'USD',
    Moneda: 'USD'
  }];
  vm.MonedaCapturada = 'MXN';
  vm.MonedaConvertir = 'USD';
  vm.CambiaMonedaCapturar = CambiaMonedaCapturar;
  vm.CambioMoneda = CambioMoneda;
}