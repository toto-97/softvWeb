'use strict';

function ContratosLigadosCtrl($uibModalInstance, $uibModal, $rootScope, corporativoFactory, detalle, $state, ngNotify, ContratoMaestroFactory) {

  function Init() {
    vm.Distribuidor = detalle.Distribuidor;

    if (detalle.Action == "EDIT") {
      vm.showokbtn = false;
      vm.showeditbtn = true;

    }
    if (detalle.Action == "ADD") {
      vm.showokbtn = true;
      vm.showeditbtn = false;
    }
    for (var a = 0; a < detalle.ContratosSoftv.length; a++) {
      var contrato = {};
      contrato.CONTRATO = detalle.ContratosSoftv[a].ContratoCom;
      contrato.Nombre = detalle.ContratosSoftv[a].NombreCli;
      contrato.Apellido_Materno = '';
      contrato.Apellido_Paterno = '';
      contrato.ContratoBueno = detalle.ContratosSoftv[a].ContratoReal;
      vm.contratos.push(contrato);
    }
  }

  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }




  $rootScope.$on('contrato_proporcional', function (e, contrato) {
    console.log(contrato);
    vm.contratos.push(contrato);
  });

  $rootScope.$on('agregar_contrato', function (e, contrato) {
    var aux = 0;
    vm.contratos.forEach(function (item) {
      if (contrato.CONTRATO == item.CONTRATO) {
        aux += 1;
      }
    });
    if (aux == 0) {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/corporativa/ModalProporcional.html',
        controller: 'ModalProporcionalCtrl',
        controllerAs: '$ctrl',
        backdrop: 'static',
        //windowClass: 'app-modal-window',
        keyboard: false,
        size: "sm",
        resolve: {
          contrato: function () {
            return contrato;
          }
        }

      });

    }else{
      ngNotify.set('El contrato ya se encuentra asignado al contrato maestro', 'error');
    }
  });

  function clientesModal() {
    var detalle = {};
    detalle.contratos = vm.contratos;
    detalle.Distribuidor = vm.Distribuidor;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/corporativa/buscaContrato.html',
      controller: 'BuscaContratoLCtrl',
      controllerAs: '$ctrl',
      backdrop: 'static',
      windowClass: 'app-modal-window',
      keyboard: false,
      size: "lg",
      resolve: {
        contratos: function () {
          return detalle;
        }
      }
    });
  }

  function ok() {
    if (vm.contratos.length > 0) {
      var contratos = [];
      vm.contratos.forEach(function (item,index) {
        contratos.push({
          Contrato: item.ContratoBueno,          
          Prioridad:index,
          Proporcional:item.Proporcional
        });
      });
      corporativoFactory.ligarContratos(detalle.IdContratoMaestro, contratos).then(function (data) {
        ngNotify.set('Los Contratos fueron ligados correctamente al contrato maestro.', 'success');
        $state.go('home.corporativa.maestro');
        $uibModalInstance.dismiss('cancel');
      });
    } else {
      ngNotify.set('Introduce al menos un contrato.', 'error');
    }

  }

  function edit() {
    if (vm.contratos.length > 0) {
      var contratos = [];
      vm.contratos.forEach(function (item,index) {
        console.log(item);
        contratos.push({
          Contrato: item.CONTRATO,
          Prioridad:index,
          Proporcional:item.Proporcional

        });
      });
      console.log(contratos);
      
      corporativoFactory.UpdateRelContrato(detalle.IdContratoMaestro, contratos, vm.Distribuidor.Clv_Plaza).then(function (data) {
        console.log(data);
        ngNotify.set('Los Contratos fueron ligados correctamente al contrato maestro.', 'success');
        $state.go('home.corporativa.maestro');
        $uibModalInstance.dismiss('cancel');
      });
    } else {
      ngNotify.set('Introduce al menos un contrato.', 'error');
    }

  }

  function eliminarContrato(index) {
    vm.contratos.splice(index, 1);
  }

  function ValidaArchivo() {
    var files = $("#inputFile2").get(0).files;
   if(files.length==0){
ngNotify.set('Se necesita seleccionar un archivo válido', 'error');
     return;
   }

    ContratoMaestroFactory.UpdateFile(files, detalle.IdContratoMaestro, vm.Distribuidor.Clv_Plaza).then(function (data) {
      console.log(data);
       

      if (data.ContratosValidos.length > 0) {
        ngNotify.set('Se encontraron ' + data.ContratosValidos.length + ' contratos válidos', 'grimace');
        vm.contratos = [];
        for (var i = 0; i < data.ContratosValidos.length; i++) {
          var contrato = {};
          contrato.CONTRATO = data.ContratosValidos[i].ContratoCom;
          contrato.Nombre = data.ContratosValidos[i].Nombre;
          contrato.Apellido_Materno = '';
          contrato.Apellido_Paterno = '';
          contrato.ContratoBueno = data.ContratosValidos[i].ContratoReal;
          vm.contratos.push(contrato);
        }
      }
      else if(data.ContratosValidos===null ){
 ngNotify.set('No se encontraron contratos válidos en el archivo', 'error');
      }     
      else{
        ngNotify.set('No se encontraron contratos válidos en el archivo', 'error');
      }


    });
  }

  var vm = this;
  vm.cancel = cancel;
  vm.ok = ok;
  vm.clientesModal = clientesModal;
  vm.eliminarContrato = eliminarContrato;
  vm.contratos = [];
  Init();
  vm.edit = edit;
  vm.ValidaArchivo = ValidaArchivo;







}
angular.module('softvApp').controller('ContratosLigadosCtrl', ContratosLigadosCtrl);
