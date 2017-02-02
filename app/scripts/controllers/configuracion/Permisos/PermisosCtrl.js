'use strict';
angular
	.module('softvApp')
	.controller('PermisosCtrl', function($state, rolFactory, permisosFactory, globalService, $uibModal) {


		function GetRolList() {
			rolFactory.GetRolList().then(function(data) {
				vm.Roles = data.GetRolListResult;
				GetModuleList(vm.Roles[0]);
			});
		}

		function GetModuleList(obj) {
			permisosFactory.GetModuleList().then(function(data) {
				var modulos = data.GetModuleListResult;
				permisosFactory.GetPermisoList(obj).then(function(data) {
					var permisos = data.GetPermisoistResult;
					vm.Modules = MergePermisos(modulos, permisos);
				});
			});
		}

		function MergePermisos(modulos, permisos) {
			for (var a = 0; a < modulos.length; a++) {
				for (var b = 0; b < permisos.length; b++) {
					if (modulos[a].IdModule == permisos[b].IdModule) {
						modulos[a].OptAdd = permisos[b].OptAdd;
						modulos[a].OptDelete = permisos[b].OptDelete;
						modulos[a].OptUpdate = permisos[b].OptUpdate;
						modulos[a].OptSelect = permisos[b].OptSelect;

					}
				}

			}
			return modulos;
		}

		function GuardaPermisos() {

		}

		function ObtenPermisos() {
			GetModuleList(vm.Rol);
		}


		var vm = this;
		vm.sinDatos = false;
		vm.showPaginator = false;
		GetRolList();
		vm.GuardaPermisos = GuardaPermisos;
		vm.ObtenPermisos = ObtenPermisos;
	});
