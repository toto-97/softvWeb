'use strict';
angular.module('softvApp').controller('ContratoMaestroCtrl', ContratoMaestroCtrl);

function ContratoMaestroCtrl($uibModal, ContratoMaestroFactory, moment) {
  var vm = this;
  vm.DetalleContrato = DetalleContrato;
  vm.BuscarNombrec = BuscarNombrec;
  vm.BuscarRazonS = BuscarRazonS;
  vm.BuscarCiudad = BuscarCiudad;
  vm.ObtenerCiudades = ObtenerCiudades;
  vm.Buscarporcontrato = Buscarporcontrato;
  vm.csvheader=['No.ContratoMaestro','Razon Social','Nombre Comercial','Distribuidor','RFC','Email','FechaVencimiento','Telefono','Calle','Entre Calles','NumExt','NumInt','Colonia','Codigo Postal','Localidad','Ciudad','Estado','Dias Credito','Dias Gracia','Facturacion Dolares','Fecha Facturacion','Limite Credito','Pago EdoCuetna','PagoFac','PostPago','Prepago']
  vm.csvorder=['IdContratoMaestro','RazonSocial','NombreComercial','DistribuidorDes','RFC','Email','FechaVencimiento','Tel','CalleDes','EntreCalles','NumExt','NumInt','ColoniaDes','CodigoPostal','LocalidadDes','CiudadDes','EstadoDes','DiasCredito','DiasGracia','FacturacionDolares','FechaFac','LimiteCredito','PagoEdoCuetna','PagoFac','PostPago','Prepago']
  this.$onInit = function () {
    ContratoMaestroFactory.GetContratoList().then(function (data) {
      vm.Contratos = data.GetContratos_CSResult;
      var today = moment().format('L');
      vm.Contratos.forEach(function (item) {
        var fechavencimiento = moment(item.FechaVencimiento, "DD/MM/YYYY");
        var days = moment(today).diff(fechavencimiento, "day");        
        if (days ===0 ) {
          item.status = 'V';//VENCIDO
        } else if (days > -90 ) {
          item.status = 'PV';//POR VENCER
        } else {
          item.status = 'N';//NORMAL
        }

      });
      console.log('contratos', vm.Contratos);
      ContratoMaestroFactory.GetDistribuidores().then(function (data) {
        vm.Distribuidores = data.GetDistribuidoresResult;
        ContratoMaestroFactory.GetCiudadList(vm.Distribuidores[0].Clv_Plaza).then(function (data) {
          vm.Ciudades = data.GetListaCiudadesPorPlazaResult;
        });
      });
    });
  }

  function ObtenerCiudades(x) {
    ContratoMaestroFactory.GetCiudadList(x.Clv_Plaza).then(function (data) {
      vm.Ciudades = data.GetListaCiudadesPorPlazaResult;
    });
  }

  function Buscarporcontrato() {
    if (vm.contratobusqueda == null) {
      return;
    }
    var obj = {
      'RazonSocial': '',
      'NombreComercial': '',
      'ClvCiudad': vm.contratobusqueda,
      "Op": 4
    };
    ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
      console.log(data);
      vm.Contratos = data.GetBusquedaContratoMaestroFacResult;
    });
  }


  function BuscarNombrec() {
    var obj = {
      'RazonSocial': '',
      'NombreComercial': vm.NombreComer,
      'ClvCiudad': 0,
      "Op": 2
    }

    ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
      vm.Contratos = data.GetBusquedaContratoMaestroFacResult;
    });
  }

  function BuscarRazonS() {
    var obj = {
      'RazonSocial': vm.RazonS,
      'NombreComercial': '',
      'ClvCiudad': 0,
      "Op": 1
    };
    ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
      vm.Contratos = data.GetBusquedaContratoMaestroFacResult;
    });
  }

  function BuscarCiudad() {
    if (vm.Ciudad.Clv_Ciudad == null) {
      return;
    }
    var obj = {
      'RazonSocial': '',
      'NombreComercial': '',
      'ClvCiudad': vm.Ciudad.Clv_Ciudad,
      "Op": 3
    };
    ContratoMaestroFactory.BuscarContratos(obj).then(function (data) {
      vm.Contratos = data.GetBusquedaContratoMaestroFacResult;
    });
  }

  function DetalleContrato(object) {
    vm.animationsEnabled = true;
    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/corporativa/DetalleContrato.html',
      controller: 'ModalDetalleContratoCtrl',
      controllerAs: 'ctrl',
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      resolve: {
        contrato: function () {
          return object;
        }
      }
    });
  }

}
