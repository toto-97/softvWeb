'use strict';
angular
  .module('softvApp')
  .factory('atencionFactory', function($http, $q, globalService, $localStorage) {
    var paths = {
      plazas: '/Muestra_Compania_RelUsuario/GetMuestra_Compania_RelUsuarioList',
      servicios: '/MuestraTipSerPrincipal/GetMuestraTipSerPrincipalList',
      usuarios: '/MUESTRAUSUARIOS/GetMUESTRAUSUARIOSList',
      buscarAtencion: '/uspBuscaLLamadasDeInternet/GetuspBuscaLLamadasDeInternetList',
      colonias: '/uspConsultaColonias/GetuspConsultaColoniasList',
      serviciosNuevo: '/MuestraTipSerPrincipal2/GetMuestraTipSerPrincipal2List',
      buscarCliente: '/uspBuscaContratoSeparado2/GetuspBuscaContratoSeparado2List'
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

    factory.getServicios = function() {
      var deferred = $q.defer();
      var Parametros = {};
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.servicios, JSON.stringify(Parametros), config).then(function(response) {
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

    factory.buscarAtencion = function(objAte) {
      var deferred = $q.defer();
      var Parametros = {
        'TipSer': objAte.servicio,
        'NumReporte': objAte.reporte,
        'ContratoCom': objAte.contrato,
        'Nombre': objAte.nombre,
        'AP': objAte.paterno,
        'AM': objAte.materno,
        'Calle': objAte.calle,
        'Numero': objAte.numero,
        'clvColonia': objAte.colonia,
        'SetUpBox': objAte.setupbox,
        'IdUsuario': usuarioAtencion,
        'Op': objAte.op,
        'Id_Compania': objAte.compania,
        'ClvUsuario': objAte.clvUsuario
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.buscarAtencion, JSON.stringify(Parametros), config).then(function(response) {
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

    factory.serviciosNuevo = function() {
      var deferred = $q.defer();
      var Parametros = {};
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.serviciosNuevo, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    factory.buscarCliente = function(obje) {
      var deferred = $q.defer();
      var Parametros = {
        'ContratoCom': obje.contrato,
        'Nombre': obje.nombre,
        'Apellido_Paterno': obje.paterno,
        'Apellido_Materno': obje.materno,
        'CALLE': obje.calle,
        'NUMERO': obje.numero,
        'ClvColonia': obje.colonia,
        'SetupBox': obje.setupbox,
        'IdUsuario': obje.usuario,
        'TipoSer': obje.servicio,
        'Op': obje.op

      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.buscarCliente, JSON.stringify(Parametros), config).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(response) {
        deferred.reject(response.data);
      });

      return deferred.promise;
    };

    return factory;
  });
