'use strict';
angular
  .module('softvApp')
  .factory('ordenesFactory', function($http, $q, globalService, $localStorage) {
    var paths = {
      plazas: '/Muestra_Compania_RelUsuario/GetMuestra_Compania_RelUsuarioList',
      usuarios: '/MUESTRAUSUARIOS/GetMUESTRAUSUARIOSList',
      colonias: '/uspConsultaColonias/GetuspConsultaColoniasList',
      buscarOrdenes: '/uspBuscaOrdSer_BuscaOrdSerSeparado2/GetuspBuscaOrdSer_BuscaOrdSerSeparado2List',
      buscarClientes: '/uspBuscaContratoSeparado2/GetuspBuscaContratoSeparado2List',
      buscarColonia: '/uspConsultaColoniasPorUsuario/GetuspConsultaColoniasPorUsuarioList',
      buscarCliPorContrato: '/BUSCLIPORCONTRATO_OrdSer/GetDeepBUSCLIPORCONTRATO_OrdSer',
      serviciosCliente: '/DameSerDelCliFac/GetDameSerDelCliFacList',
      dimeServicio: '/Dime_Que_servicio_Tiene_cliente/GetDime_Que_servicio_Tiene_clienteList',
      muestraTrabajo: '/MUESTRATRABAJOSPorTipoUsuario/GetMUESTRATRABAJOSPorTipoUsuarioList'
    };
    var factory = {};
    var usuarioAtencion = $localStorage.currentUser.idUsuario;
    factory.getPlazas = function() {
      var deferred = $q.defer();
      var user = $localStorage.currentUser.idUsuario;
      var Parametros = {
        'ClvUsuario': user,
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.plazas, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.getUsuarios = function() {
      var deferred = $q.defer();
      var Parametros = {
        'OP': 2
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.usuarios, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.buscarOrdenes = function(objOrd) {
      var deferred = $q.defer();
      var Parametros = {
        "Op": objOrd.op,
        "Clv_Orden": objOrd.orden,
        "Contrato": objOrd.contrato,
        "Nombre": objOrd.nombre,
        "Apellido_Paterno": objOrd.paterno,
        "Apellido_Materno": objOrd.materno,
        "CALLE": objOrd.calle,
        "NUMERO": objOrd.numero,
        "ClvColonia": objOrd.colonia,
        "IdCompania": objOrd.compania,
        "SetupBox": objOrd.setupbox,
        "ClvUsuario": usuarioAtencion,
        "STATUS": objOrd.status,
        "Auto": objOrd.auto
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.buscarOrdenes, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.getColonias = function(idcomp) {
      var deferred = $q.defer();
      var Parametros = {
        'idcompania': idcomp
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.colonias, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.getColoniasUser = function() {
      var deferred = $q.defer();
      var Parametros = {
        'IdUsuario': usuarioAtencion
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.buscarColonia, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.buscarClientes = function(obj) {
      var deferred = $q.defer();
      var Parametros = {
        'ContratoCom': obj.contrato,
        'Nombre': obj.nombre,
        'Apellido_Paterno': obj.paterno,
        'Apellido_Materno': obj.materno,
        'CALLE': obj.calle,
        'NUMERO': obj.numero,
        'ClvColonia': obj.colonia,
        'SetupBox': obj.setupbox,
        'IdUsuario': usuarioAtencion,
        'TipoSer': 0,
        'Op': obj.op

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.buscarClientes, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.buscarCliPorContrato = function(contrato) {
      var deferred = $q.defer();
      var Parametros = {
        'CONTRATO': contrato,
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.buscarCliPorContrato, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.serviciosCliente = function(contrato) {
      var deferred = $q.defer();
      var Parametros = {
        'Contrato': contrato,
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.serviciosCliente, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.dimeServicio = function(contrato) {
      var deferred = $q.defer();
      var Parametros = {
        'Contrato': contrato,
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.dimeServicio, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.muestraTrabajo = function(tipo) {
      var deferred = $q.defer();
      var user = $localStorage.currentUser.idUsuario;
      var Parametros = {
        'ClvTipSer': tipo,
        'TipoUser': user
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.muestraTrabajo, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    return factory;
  });
