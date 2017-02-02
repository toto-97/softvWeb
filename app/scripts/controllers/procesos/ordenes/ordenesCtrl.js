'use strict';
angular
	.module('softvApp')
	.controller('OrdenesServicioCtrl', function($state, ngNotify, $location) {
		var vm = this;
		vm.showdatosPlaza = false;
		vm.seleccionar = seleccionar;
		vm.Validate = Validate;

		function seleccionar(id, selec) {
			$state.go('home.procesos.ordenNueva', {
				experience: id,
				context: selec
			});
		}

		function Validate(form) {
			if (form.validate()) {
				// Form is valid!
			}
		}

		vm.validationOptions = {
			rules: {
				orden: {
					required: true,
				},
				contrato: {
					required: true,
					minlength: 6
				}
			},
			messages: {
				orden: {
					required: "Campo requerido",

				},
				contrato: {
					required: "campo requrido",
					minlength: "maximo de digitos es 6"
				}
			}
		}

	});
