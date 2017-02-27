'use strict';
angular.module('softvApp')
	.controller('ReportesVariosCtrl', function($state, ngNotify, reportesVariosFactory, globalService,$sce) // servicio
		{
            var vm = this;

			this.$onInit = function(){
                
				reportesVariosFactory.mostrarTipServ().then(function(data) {
                    vm.tipoServicios = data.GetTipServicioListResult;
					vm.ServicioDigitalInternet = data.GetTipServicioListResult[1];
				});
				//-----------------------------
				reportesVariosFactory.mostrarMotivoCan().then(function(data) {				
					//---- para cancelaciones
					vm.motivos1 = data.GetMotCancelacionListResult; //array
					vm.selectedMotcan1 = data.GetMotCancelacionListResult[0]; //model
					//---- para ciudad y resumen por colonia
					vm.motivos2 = data.GetMotCancelacionListResult; //array					
					vm.selectedMotcan2 = data.GetMotCancelacionListResult[0]; //model
				});
							
			vm.clv_usuario = 1
            vm.ordenRadio='1';
		
                ListaDistribuidores();                
			}

//------------------Distribuidores -------------------------------
vm.ExisteDistribuidor = ExisteDistribuidor;
function ExisteDistribuidor(id) {
	var result = $.grep(Distribuidores, function (obj) { return obj.Clv_Plaza == id; });
    if (result.length == 0) {
        return false;
    } else {
        return true;
        }
    }

vm.distribuidorPadre = distribuidorPadre;
function distribuidorPadre (){	    
//console.log('DistribuidoresTodos: ' + DistribuidoresTodos.length);
    if (banderas.banderaDistribuidor == 1) {

        banderas.banderaDistribuidor = 0;
        Distribuidores = []; //limpiar   

        for (var i = 0; i < vm.DistribuidoresTable.length; i++) //todos los distribuidores de la tabla
                { 
                    vm.DistribuidoresTable[i].selected = false;
                }
    }
    else if (banderas.banderaDistribuidor == 0) {
    	Distribuidores = [];//limpiar antes de llenar 
        reportesVariosFactory.mostrarDistribuidorByUsuario(vm.clv_usuario).then(function(data) {      
            DistribuidoresTodos = data.GetDistribuidorByUsuarioResult; //array 
            var i; 
            for (i = 0; i < DistribuidoresTodos.length; i++) //cuántos distribuidores existen
                {                    
                    vm.DistribuidoresTable[i].selected = true;          //de tabla
                    AddToArray(Distribuidores, DistribuidoresTodos[i]); //de array filtro
                }
        });       
        banderas.banderaDistribuidor = 1;    	  
    }
}

vm.distribuidorHijo = distribuidorHijo;
function distribuidorHijo(obj) {
  //  console.log('seleccionar todos los distribuidores');
    if (banderas.banderaDistribuidor == 1) //si es 1, está seleccionado, volver a NO SELECCIONADO
    {   
        vm.distriTodo = false;//checkbox padre
        // si la bandera es 1, y selecciona un hijo, eliminar a ese hijo
        if (ExisteDistribuidor(obj.Clv_Plaza)) {
            DeleteFromArray(Distribuidores, 'Clv_Plaza', obj.Clv_Plaza); //eliminar del arreglo    
        }                                  
        banderas.banderaDistribuidor = 0;   
    }
    else {
            AddDistribuidor(obj);
        }       //  console.log('restantes: '+Distribuidores.length);
    }

vm.AddDistribuidor = AddDistribuidor;
function AddDistribuidor (obj){ 
    if (ExisteDistribuidor(obj.Clv_Plaza)) {
        DeleteFromArray(Distribuidores, 'Clv_Plaza', obj.Clv_Plaza)      
        }
    else {
        AddToArray(Distribuidores, obj);
    }
}

var DistribuidoresTodos = [];

vm.ListaDistribuidores = ListaDistribuidores;
function ListaDistribuidores()
    {   
        reportesVariosFactory.mostrarDistribuidorByUsuario(clv_usuario).then(function(data) {
            vm.DistribuidoresTable = data.GetDistribuidorByUsuarioResult; //mostrar en tabla
            DistribuidoresTodos = data.GetDistribuidorByUsuarioResult; //array        
        });
    }

//------------------ Plazas -------------------------------

vm.ExistePlaza = ExistePlaza;
    function ExistePlaza(id) {
        var result = $.grep(Plazas, function (obj) { return obj.id_compania == id; });
        if (result.length == 0) {
            return false;
        } else {
            return true;
        }
    }

vm.plazaPadre = plazaPadre;
    function plazaPadre() {
        if (pla == 1) {
            pla = 0;
            Plazas = []; //limpiar   
            for (var i = 0; i < vm.PlazasTable.length; i++) //todos los distribuidores de la tabla
            { 
                vm.PlazasTable[i].selected = false;
            }      
        }
        else if (pla == 0) 
        {
            Plazas = [];//limpiar antes de llenar   
            reportesVariosFactory.mostrarPlazaByDistribuidor(vm.clv_usuario, Distribuidores).then(function(data) {         
                PlazasTodos = data.GetPlazasByDistribuidorResult; // array
        
                for (var i = 0; i < PlazasTodos.length; i++) //cuántos distribuidores existen
                {
                    vm.PlazasTable[i].selected = true;
                    AddToArray(Plazas, PlazasTodos[i]); //array, objeto
                }          
            });
            pla = 1;    
        }  //  console.log('las plazas elegidas: '+Plazas.length);
    }

vm.plazaHijo = plazaHijo;
    function plazaHijo(obj) {
        if (pla == 1) // si es 1, está seleccionado, volver a NO SELECCIONADO 
        { 
            vm.plazaTodo = false;
            if (ExistePlaza(obj.id_compania)) {
                DeleteFromArray(Plazas, 'id_compania', obj.id_compania);
            }
            pla = 0;
        }
        else {
            AddPlazas(obj);
        } //console.log('restantes: '+Plazas.length);
    }

vm.AddPlazas = AddPlazas;
    function AddPlazas(obj) //checkbox hijos
    {
        if (pla == 1) //todo está checked //Si selecciono un hijo, entra aquí
        {
            pla = 0;//quitar check al padre
            Plazas = []; //clear
            AddToArray(Plazas, obj);
        }
        else if (pla == 0) //no check todo
        {
            if (ExistePlaza(obj.id_compania)) {
                DeleteFromArray(Plazas, 'id_compania', obj.id_compania);
            }
            else {
                AddToArray(Plazas, obj);
            }
        }   //  console.log(Plazas.length);  

    }
//------------------Agrega Estado al array -------------------------------
	vm.ExisteEstado = ExisteEstado;
    function ExisteEstado(id) {
        var result = $.grep(Estados, function (obj) { return obj.Clv_Estado == id; });
        if (result.length == 0) {
            return false;
        } else {
            return true;
        }
    }

    vm.estadoPadre = estadoPadre;
	function estadoPadre () {   // console.log('EstadosTodos: ' + EstadosTodos.length);    
        if (est == 1) {
            est = 0;
            Estados = []; //limpiar
            for (var i = 0; i < vm.EstadosTable.length; i++) //todos los estados de la tabla
                { 
                    vm.EstadosTable[i].selected = false;
                }
        }
        else if (est == 0) {
            Estados = [];//limpiar antes de llenar     
                reportesVariosFactory.mostrarEstadoByPlaza(Plazas).then(function(data) {  
                    EstadosTodos = data.GetEstadosByplazaResult;    
                    for (var i = 0; i < EstadosTodos.length; i++) //cuántos estados existen
                    {
                        vm.EstadosTable[i].selected = true;
                        AddToArray(Estados, EstadosTodos[i]); //array, objeto
                    }
                });
            est = 1;
        } // console.log('las Estados elegidas: '+Estados.length);                
    }

	vm.estadoHijo = estadoHijo;
    function estadoHijo (obj)    {      
        if (est == 1) {            // si es 1, está seleccionado, volver a NO SELECCIONADO
             vm.estadoTodo = false;//checkbox padre    
            if (ExisteEstado(obj.Clv_Estado)) {
                DeleteFromArray(Estados, 'Clv_Estado', obj.Clv_Estado)
            }
            est = 0;
        }
        else {
            AddEstados(obj);
        }     // console.log('restantes: '+Estados.length);
    }

    vm.AddEstados = AddEstados;
    function AddEstados(obj) //checkbox hijos
    {
        if (est == 1) //todo está checked //Si selecciono un hijo, entra aquí
        {
            est = 0;//quitar check al padre

            Estados = []; //clear
            AddToArray(Estados, obj);
        }
        else if (est == 0) //no check todo
        {
            if (ExisteEstado(obj.Clv_Estado)) {
                DeleteFromArray(Estados, 'Clv_Estado', obj.Clv_Estado)
            }
            else {
                AddToArray(Estados, obj);
            }
        }
    }

//----------------- Ciudad
vm.ExisteCiudad = ExisteCiudad;
    function ExisteCiudad(id) {
        var result = $.grep(Ciudades, function (obj) { return obj.Clv_Ciudad == id; });
        if (result.length == 0) {
            return false;
        } else {
            return true;
        }
    }

vm.ciudadPadre = ciudadPadre;
function ciudadPadre () {
   // console.log('ciudadesTodos: ' + CiudadesTodos.length);
    if (banderas.banderaCiudad == 1) {
            banderas.banderaCiudad = 0;
            Ciudades = []; //limpiar

        for (var i = 0; i < vm.CiudadesTable.length; i++) //todos los distribuidores de la tabla
            { 
                vm.CiudadesTable[i].selected = false;
            }
    }
    else if (banderas.banderaCiudad == 0) {
        Ciudades = [];//limpiar antes de llenar       
            reportesVariosFactory.mostrarCiudad(Plazas, Estados).then(function(data) {     
                CiudadesTodos = data.GetCiudadesBy_PlazasEstadoResult; 
                for (var i = 0; i < CiudadesTodos.length; i++) //cuántos distribuidores existen
                {
                    vm.CiudadesTable[i].selected = true; 
                    AddToArray(Ciudades, CiudadesTodos[i]);
                }
            }); 
            banderas.banderaCiudad = 1;
        }
    }

vm.ciudadHijo = ciudadHijo;
	function ciudadHijo (obj) {       
        if (banderas.banderaCiudad == 1) 
        {           
             vm.ciudadTodo = false;
            if (ExisteCiudad(obj.Clv_Ciudad)) {
                DeleteFromArray(Ciudades, 'Clv_Ciudad', obj.Clv_Ciudad)
            }
            banderas.banderaCiudad = 0;
        }
        else {
            AddCiudades(obj);
        }  //   console.log('restantes: '+Ciudades.length);
    }


vm.AddCiudades = AddCiudades;
    function AddCiudades(obj) //checkbox hijos
    {
        if (banderas.banderaCiudad == 1) //todo está checked //Si selecciono un hijo, entra aquí
        {
            banderas.banderaCiudad = 0;//quitar check al padre
            Ciudades = []; //clear
            AddToArray(Ciudades, obj);
        }
        else if (banderas.banderaCiudad == 0) //no check todo
        {
            if (ExisteCiudad(obj.Clv_Ciudad)) {
                DeleteFromArray(Ciudades, 'Clv_Ciudad', obj.Clv_Ciudad)
            }
            else {
                AddToArray(Ciudades, obj);
            }
        }
    }

//----------------- Localidad
	vm.ExisteLocalidad = ExisteLocalidad;
    function ExisteLocalidad(id) {
        var result = $.grep(Localidades, function (obj) { return obj.Clv_Localidad == id; });
        if (result.length == 0) {
            return false;
        } else {
            return true;
        }
    }

vm.localidadPadre = localidadPadre;
function localidadPadre () {//    console.log('LocalidadesTodos: ' + LocalidadesTodos.length);
        if (banderas.banderaLocalidad == 1) {
            banderas.banderaLocalidad = 0;
            Localidades = []; //limpiar
            for (var i = 0; i < vm.LocalidadesTable.length; i++) //todos los distribuidores de la tabla
                { 
                    vm.LocalidadesTable[i].selected = false;
                }
        }
        else if (banderas.banderaLocalidad == 0) {
            Localidades = [];//limpiar antes de llenar  

            reportesVariosFactory.mostrarLocalidadByCiudad(clv_usuario, Ciudades).then(function(data) {
                LocalidadesTodos = data.GetLocalidadesbyCiudadResult;  
                for (var i = 0; i < LocalidadesTodos.length; i++) //cuántas localidades existen
                {
                    vm.LocalidadesTable[i].selected = true; 
                    AddToArray(Localidades, LocalidadesTodos[i]);
                } 
            });
            banderas.banderaLocalidad = 1;
        }
    }

vm.localidadHijo= localidadHijo;
    function localidadHijo (obj) {
 
        if (banderas.banderaLocalidad == 1) {
            // si es 1, está seleccionado, volver a NO SELECCIONADO
            vm.localidadTodo = false;
            if (ExisteLocalidad(obj.Clv_Localidad)) {
                DeleteFromArray(Localidades, 'Clv_Localidad', obj.Clv_Localidad)
            }
            banderas.banderaLocalidad = 0;
        }
        else {
            AddLocalidades(obj);
        } //  console.log('restantes: '+Localidades.length);
    }


vm.AddLocalidades = AddLocalidades;
    function AddLocalidades (obj) //checkbox hijos
    {
        if (banderas.banderaLocalidad == 1) //todo está checked //Si selecciono un hijo, entra aquí
        {
            banderas.banderaLocalidad = 0;//quitar check al padre
            Localidades = []; //clear
            AddToArray(Localidades, obj);
        }
        else if (banderas.banderaLocalidad == 0) //no check todo
        {
            if (ExisteLocalidad(obj.Clv_Localidad)) {
                DeleteFromArray(Localidades, 'Clv_Localidad', obj.Clv_Localidad);
            }
            else {
                AddToArray(Localidades, obj);
            }
        }
    }


//----------------- Colonia
vm.ExisteColonia = ExisteColonia;
    function ExisteColonia(id) {
        var result = $.grep(Colonias, function (obj) { return obj.CLV_COLONIA == id; });
        if (result.length == 0) {
            return false;
        } else {
            return true;
        }
    }

vm.coloniaPadre = coloniaPadre;
function coloniaPadre() {

        if (banderas.banderaColonia == 1) {
            banderas.banderaColonia = 0;
            Colonias = []; //limpiar
            for (var i = 0; i < vm.ColoniasTable.length; i++) //todos los distribuidores de la tabla
                    { 
                        vm.ColoniasTable[i].selected = false;
                    }
            }
        else if (banderas.banderaColonia == 0) {
            Colonias = [];//limpiar antes de llenar    
           
            reportesVariosFactory.mostrarColonia(clv_usuario, banderas.banderaLocalidad, Ciudades, Localidades).then(function(data) {
                ColoniasTodos = data.GetColoniasBy_Ciudad_LocalidadResult; 

                    for (var i = 0; i < ColoniasTodos.length; i++) //cuántos distribuidores existen
                    {
                        vm.ColoniasTable[i].selected = true;   
                        AddToArray(Colonias, ColoniasTodos[i]); //array, objeto
                    }
                });   
            banderas.banderaColonia = 1;
        }
    }


vm.coloniaHijo = coloniaHijo;
    function coloniaHijo(obj) {
      
        if (banderas.banderaColonia == 1) {
            // si es 1, está seleccionado, volver a NO SELECCIONADO
            vm.coloniaTodo = false;    
             if (ExisteColonia(obj.CLV_COLONIA)) {
                DeleteFromArray(Colonias, 'CLV_COLONIA', obj.CLV_COLONIA);
            }
            banderas.banderaColonia = 0;
        }
        else {
            AddColonias(obj);
        }
           // console.log('restantes: '+Colonias.length);
    }

vm.AddColonias = AddColonias;
function AddColonias (obj) //checkbox hijos
    {
        if (banderas.banderaColonia == 1) //todo está checked //Si selecciono un hijo, entra aquí
        {
            banderas.banderaColonia = 0;//quitar check al padre
            Colonias = []; //clear
            AddToArray(Colonias, obj);
        }
        else if (banderas.banderaColonia == 0) //no check todo
        {
            if (ExisteColonia(obj.CLV_COLONIA)) {
                DeleteFromArray(Colonias, 'CLV_COLONIA', obj.CLV_COLONIA)
            }
            else {
                AddToArray(Colonias, obj)
            }
        }
    }


//------------------- Serv Internet



vm.ExisteServicioInternet = ExisteServicioInternet;
    function ExisteServicioInternet(id) {
        var result = $.grep(ServiciosInternet, function (obj) { return obj.Clv_Servicio == id; });
        if (result.length == 0) {
            return false;
        } else {
            return true;
        }
    }


vm.serviciosInternetPadre = serviciosInternetPadre;
    function serviciosInternetPadre() {

        if (sinter == 1) {
            sinter = 0;
            ServiciosInternet = []; //limpiar
            for (var i = 0; i < vm.ServInternetTable.length; i++) //todos los distribuidores de la tabla
                { 
                    vm.ServInternetTable[i].selected = false;
                }
        }
        else if (sinter == 0) {
            ServiciosInternet = [];//limpiar antes de llenar     
         
            reportesVariosFactory.mostrarServInternet().then(function(data) {   
            

                ServiciosInternetTodos = data.GetServInternetListResult;                 
                for (var i = 0; i < ServiciosInternetTodos.length; i++) //cuántos tipoCli existen
                {
                    vm.ServInternetTable[i].selected = true; 
                    AddToArray(ServiciosInternet, ServiciosInternetTodos[i]); //array, objeto
                
                }

            });    
            sinter = 1;
        }
       
    }





vm.serviciosInternetHijo = serviciosInternetHijo;
   
    function serviciosInternetHijo(obj) {
        if (sinter == 1) {
            // si es 1, está seleccionado, volver a NO SELECCIONADO
            vm.serviciosInternetTodo = false;
            if (ExisteServicioInternet(obj.Clv_Servicio)) {
                DeleteFromArray(ServiciosInternet, 'Clv_Servicio', obj.Clv_Servicio)
            }
            sinter = 0;
        }
        else {
            AddServiciosInternet(obj);
        }
    }

vm.AddServiciosInternet = AddServiciosInternet;
    function AddServiciosInternet(obj) //checkbox hijos
    {
        if (sinter == 1) //todo está checked //Si selecciono un hijo, entra aquí
        {
            sinter = 0;//quitar check al padre
            ServiciosInternet = []; //clear
            AddToArray(ServiciosInternet, obj);
        }
        else if (sinter == 0) //no check todo
        {
            if (ExisteServicioInternet(obj.Clv_Servicio)) {
                DeleteFromArray(ServiciosInternet, 'Clv_Servicio', obj.Clv_Servicio)
            }
            else {
                AddToArray(ServiciosInternet, obj);
            }
        }
    }



//------------------- Serv Digital
vm.ExisteServicioDigital = ServiciosDigital;
    function ExisteServicioDigital(id) {
        var result = $.grep(ServiciosDigital, function (obj) { return obj.Clv_Servicio == id; });
        if (result.length == 0) {
            return false;
        } else {
            return true;
        }
    }

vm.serviciosDigitalPadre = serviciosDigitalPadre;
function serviciosDigitalPadre() {

    if (sdig == 1) {
        sdig = 0;
        ServiciosDigital = []; //limpiar
        for (var i = 0; i < vm.ServDigitalTable.length; i++) //todos los distribuidores de la tabla
                { 
                    vm.ServDigitalTable[i].selected = false;
                }
    }
    else if (sdig == 0) {
        ServiciosDigital = [];//limpiar antes de llenar     
        reportesVariosFactory.mostrarServDigital().then(function(data) {                         
            ServiciosDigitalTodos = data.GetServDigitalListResult;
            for (var i = 0; i < ServiciosDigitalTodos.length; i++) //cuántos distribuidores existen
            {
                vm.ServDigitalTable[i].selected = true;
                AddToArray(ServiciosDigital, ServiciosDigitalTodos[i]);
            }
        });            
        sdig = 1;
    }
}


vm.serviciosDigitalHijo = serviciosDigitalHijo;
    function serviciosDigitalHijo(obj) {
        if (sdig == 1) {
            // si es 1, está seleccionado, volver a NO SELECCIONADO
            vm.serviciosDigitalTodo = false;
            if (ExisteServicioDigital(obj.Clv_Servicio)) {
                DeleteFromArray(ServiciosDigital, 'Clv_Servicio', obj.Clv_Servicio);
            }
            sdig = 0;
        }
        else {
            AddServiciosDigital(obj);
        }
           // console.log('restantes: '+ServiciosDigital.length);
    }


vm.AddServiciosDigital = AddServiciosDigital;
    function AddServiciosDigital(obj) //checkbox hijos
    {
        if (sdig == 1) //todo está checked //Si selecciono un hijo, entra aquí
        {
            sdig = 0;//quitar check al padre
            ServiciosDigital = []; //clear
            AddToArray(ServiciosDigital, obj);
        }
        else if (sdig == 0) //no check todo
        {
            if (ExisteServicioDigital(obj.Clv_Servicio)) {
                DeleteFromArray(ServiciosDigital, 'Clv_Servicio', obj.Clv_Servicio);
            }
            else {
                AddToArray(ServiciosDigital, obj);
            }
        }
    }


//------------------- Tipo Clientes

vm.ExisteTipoClientes = ExisteTipoClientes;
    function ExisteTipoClientes(id) {
        var result = $.grep(TipoClientes, function (obj) { return obj.Clv_TipoCliente == id; });
        if (result.length == 0) {
            return false;
        } else {
            return true;
        }
    }
vm.tipoClientesPadre=tipoClientesPadre;
function tipoClientesPadre () {
        if (tipo == 1) {
            tipo = 0;
            TipoClientes = []; //limpiar

            for (var i = 0; i < vm.TipoClientesTable.length; i++) //todos los distribuidores de la tabla
            { 
                vm.TipoClientesTable[i].selected = false;
            }
        }
        else if (tipo == 0) {
            TipoClientes = [];//limpiar antes de llenar     
            reportesVariosFactory.mostrarTipoCliente().then(function(data) {
                TipoClientesTodos = data.GetTipoClienteListResult; //array 
                for (var i = 0; i < TipoClientesTodos.length; i++) //cuántos tipoCli existen
                {
                    vm.TipoClientesTable[i].selected = true;
                    AddToArray(TipoClientes, TipoClientesTodos[i]); //array, objeto
                }
            });
            tipo = 1;
        }
    }

vm.tipoClientesHijo = tipoClientesHijo;
function tipoClientesHijo(obj) {
       
    if (tipo == 1) {
        // si es 1, está seleccionado, volver a NO SELECCIONADO
        vm.tipoTodo = false;

        if (ExisteTipoClientes(obj.Clv_TipoCliente)) {
            DeleteFromArray(TipoClientes, 'Clv_TipoCliente', obj.Clv_TipoCliente)
        }
        tipo = 0;
    }
    else {
            AddTipoClientes(obj);
        }
      //  console.log('restantes: '+TipoClientes.length);
    }

vm.AddTipoClientes = AddTipoClientes;
function AddTipoClientes(obj) //checkbox hijos
    {
        if (tipo == 1) //todo está checked //Si selecciono un hijo, entra aquí
        {
            tipo = 0;//quitar check al padre
            TipoClientes = []; //clear
            AddToArray(TipoClientes, obj);
        }
        else if (tipo == 0) //no check todo
        {
            if (ExisteTipoClientes(obj.Clv_TipoCliente)) {
                DeleteFromArray(TipoClientes, 'Clv_TipoCliente', obj.Clv_TipoCliente)
            }
            else {
                AddToArray(TipoClientes, obj);
            }
        }
    }



//-------------------Periodo

vm.ExistePeriodo = ExistePeriodo;
    function ExistePeriodo(id) {
        var result = $.grep(Periodos, function (obj) { return obj.Clv_Periodo == id; });
        if (result.length == 0) {
            return false;
        } else {
            return true;
        }
    }

vm.periodoPadre = periodoPadre;
function periodoPadre () {
        if (peri == 1) {
            peri = 0;
            Periodos = []; //limpiar
            for (var i = 0; i < vm.PeriodosTable.length; i++) //todos los distribuidores de la tabla
                { 
                    vm.PeriodosTable[i].selected = false;
                }
        }
        else if (peri == 0) {
            Periodos = [];//limpiar antes de llenar    
            reportesVariosFactory.mostrarPeriodo().then(function(data) {
                PeriodosTodos = data.GetPeriodosRepVarListResult;   
                for (var i = 0; i < PeriodosTodos.length; i++) //cuántos distribuidores existen
                {
                    vm.PeriodosTable[i].selected = true;
                    AddToArray(Periodos, PeriodosTodos[i]); //array, objeto
                }       
            });
            peri = 1;
        }
    }

vm.periodoHijo = periodoHijo;
    function periodoHijo(obj) {

        if (peri == 1) {
            // si es 1, está seleccionado, volver a NO SELECCIONADO
            vm.periodoTodo = false;
            if (ExistePeriodo(obj.Clv_Periodo)) {
                DeleteFromArray(Periodos, 'Clv_Periodo', obj.Clv_Periodo)
            }
            peri = 0;     
        }
        else {
            AddPeriodos(obj);
        }
       // console.log('restantes: '+Periodos.length);    
    }

vm.AddPeriodos = AddPeriodos;
function AddPeriodos(obj) //checkbox hijos
    {
        if (peri == 1) //todo está checked //Si selecciono un hijo, entra aquí
        {
            peri = 0;//quitar check al padre
            Periodos = []; //clear
            AddToArray(Periodos, obj);
        }
        else if (peri == 0) //no check todo
        {
            if (ExistePeriodo(obj.Clv_Periodo)) {
                DeleteFromArray(Periodos, 'Clv_Periodo', obj.Clv_Periodo)
            }
            else {
                AddToArray(Periodos, obj);

            }
        }

    }



//-------------------Calle
vm.ExisteCalle = ExisteCalle;
    function ExisteCalle(id) {
        var result = $.grep(Calles, function (obj) { return obj.Clv_calle == id; });
        if (result.length == 0) {
            return false;
        } else {
            return true;
        }
    }


vm.callePadre = callePadre;
    function callePadre() {
  
    if (banderas.banderaCalle == 1) {
        banderas.banderaCalle = 0;
        Calles = []; //limpiar
        for (var i = 0; i < vm.CallesTable.length; i++) //todos los distribuidores de la tabla
                { 
                    vm.CallesTable[i].selected = false;
                }
        }
        else if (banderas.banderaCalle == 0) {
            Calles = [];//limpiar antes de llenar    
            reportesVariosFactory.mostrarCalle(clv_usuario, banderas.banderaLocalidad, banderas.banderaColonia, Distribuidores, Ciudades, Localidades, Colonias).then(function(data) {
                CallesTodos = data.GetCallesBy_Ciudad_Localidad_ColoniaResult; 
                
                for (var i = 0; i < CallesTodos.length; i++) //cuántos distribuidores existen
                    {
                        vm.CallesTable[i].selected = true;
                        AddToArray(Calles, CallesTodos[i]); //array, objeto
                    }
                });    
            banderas.banderaCalle = 1;
        }
    }


vm.calleHijo = calleHijo;
function calleHijo(obj) { 
    if (banderas.banderaCalle == 1) {
        // si es 1, está seleccionado, volver a NO SELECCIONADO
        vm.calleTodo = false;

        if (ExisteCalle(obj.Clv_calle)) {
            DeleteFromArray(Calles, 'Clv_calle', obj.Clv_calle)
        }
         banderas.banderaCalle = 0;    
    }
    else {   
        AddCalles(obj);          
        }
     //   console.log('restantes: '+Calles.length);
    }

vm.AddCalles = AddCalles;
    function AddCalles(obj) //checkbox hijos
    {
        if (banderas.banderaCalle == 1) //todo está checked //Si selecciono un hijo, entra aquí
        {
            banderas.banderaCalle = 0;//quitar check al padre
            Calles = []; //clear
            AddToArray(Calles, obj);
        }
        else if (banderas.banderaCalle == 0) //no check todo
        {
            if (ExisteCalle(obj.Clv_calle)) {
                DeleteFromArray(Calles, 'Clv_calle', obj.Clv_calle)
            }
            else {
                AddToArray(Calles, obj);
            }
        }
    }


//----------------- Motcan1

//--------------------- Motcan2








//----------------------------------------------------------------------------------

vm.AddToArray = AddToArray;
  function AddToArray(arr, value) {
        arr.push(value);
    }

vm.DeleteFromArray = DeleteFromArray;
function DeleteFromArray(arr, attr, value) {
var i = arr.length;
	while (i--) {
		if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {
            arr.splice(i, 1);
        }
    }
    return arr;
}
//----------------------------------------------------------

vm.seleccionarTodo = seleccionarTodo;
    function seleccionarTodo () {
        if (banderas.banderaTodoSeleccionado == 0) {
            banderas.banderaLocalidad = 2;
            banderas.banderaColonia = 2;
            banderas.banderaCalle = 2;
   
            banderas.banderaTodoSeleccionado = 1;
        } else if (banderas.banderaTodoSeleccionado == 1) {
            banderas.banderaLocalidad = 0;
            banderas.banderaColonia = 0;
            anderas.banderaCalle = 0;
          
            banderas.banderaTodoSeleccionado = 0;        
        }
    }

//---------------------------------------------------------------------
			
// inicializa botones del menú de Reportes

			vm.cleanArray = cleanArray;
			vm.showOpcion = showOpcion;
			vm.changeBgColor = changeBgColor;
			vm.soloInternet_esconde = true; //esconde div
            showOpcion();

			//Inicializa variables
			var pla = 0, est = 0, coloni = 0, sinter = 0, sdig = 0, tipo = 0, peri = 0;
			var servicioSeleccionado = 3;
			var reporteSeleccionado = 1; //value del reporte seleccionado
			var principales = false; //se muestra para digital

			var objPrincipal = {};
			var objRangoFechas = {};
			var estatusCliente = {};
			var objParametros = {};
			//$('#anioC').val(''); $('#anioC2').val(''); //revisar
        //---------------------------------------------
			var Distribuidores = [];
			var Plazas = [];
			var Estados = [];
			var Ciudades = [];
			var Localidades = [];
			var Colonias = [];
			var Calles = [];
			var Periodos = [];
			var ServiciosInternet = [];
			var ServiciosDigital = [];
			var TipoClientes = [];
			var Motcan = [];
			var Motcan2 = []; //Modal Seleccion de Status de cliente

		
			var PlazasTodos = [];
			var EstadosTodos = [];
			var CiudadesTodos = [];
			var LocalidadesTodos = [];
			var ColoniasTodos = [];
			var CallesTodos = [];
			var PeriodosTodos = [];
			var ServiciosInternetTodos = [];
			var ServiciosDigitalTodos = [];
			var TipoClientesTodos = [];

			var buscaOnovar = 0;
			vm.botonRegresar = true; //oculta
			vm.divMotivoCancelacion1 = true;

			var clv_usuario = 1; //siste, RECIBIR
			var banderas = {};
			banderas.clv_usuario = clv_usuario;
			banderas.banderaDistribuidor = 0;
			banderas.banderaCiudad = 0;
			banderas.banderaLocalidad = 0;
			banderas.banderaColonia = 0;
			banderas.banderaCalle = 0; // estado del checkbox
			banderas.banderaTodoSeleccionado = 0;

			

//----- Seleccione el servicio ---------------------------------------------------------------
	vm.cambiaServicio = function(tipServ) {
    	servicioSeleccionado = tipServ.Clv_TipSer; 
    	if (servicioSeleccionado == 3) //Digital, no muestra div
    	{
    		vm.soloInternet_esconde = true; //se oculta
    		vm.principales = false; // sí se muestra      //  muestra botón del reporte 'contrataciones principales' //NO BORRAR
    	} else if (servicioSeleccionado == 2) // Internet, muestra div
    	{
		vm.soloInternet_esconde = false; //se muestra
		vm.principales = true; // NO se muestra, esconde botón del reporte 'contrataciones principales'  // NO BORRAR
		}
        cleanArray();//el servicio debe cambiar antes de mostrar modal de servicios
        showOpcion();
	}

 //--------------------------------------------------------------------------

			vm.fechaInicial = new Date();
			vm.fechaFinal = new Date();

			vm.motcan1 = 0; // set selected value to a particular value
			vm.motcan2 = 0; // set selected value to a particular value

			//Valida input numérico
			vm.anioC = {
				value: 2010
			};
			vm.anioC2 = {
				value: 2010
			};

			vm.meses = [{name: 'Enero',	value: '1'},
				{	name: 'Febrero', value: '2'	},				
                {	name: 'Marzo',	value: '3'	},
				{	name: 'Abril',	value: '4'	},
				{	name: 'Mayo',	value: '5'	},
				{	name: 'Junio',	value: '6'	},
				{	name: 'Julio',	value: '7'	},
				{	name: 'Agosto',	value: '8'	},
				{	name: 'Septiembre',	value: '9'	},
				{	name: 'Octubre',	value: '10'	},
				{	name: 'Noviembre',	value: '11'	},
				{	name: 'Diciembre',	value: '12'	}
			];



            vm.ultimoMes = vm.meses[0]; //model         
            vm.mesQueAdeuda = vm.meses[0]; //model

			vm.menores = [{	name: 'Menor o igual',	value: '1'}, { name: 'Igual',	value: '2'	}];
			vm.menoresModel = vm.menores[0].value;
			vm.divMotivoCancelacion1 = true; //se oculta

			//inicializa botones del menú de Reportes
			vm.myButton1 = 'btn-info active';
			reporteSeleccionado = 1;
			vm.myButton2 = 'btn-default';
			vm.myButton3 = 'btn-default';
			vm.myButton4 = 'btn-default';
			vm.myButton5 = 'btn-default';
			vm.myButton6 = 'btn-default';
			vm.myButton7 = 'btn-default';
			vm.myButton8 = 'btn-default';
			vm.myButton9 = 'btn-default';
			vm.myButton10 = 'btn-default';
			vm.myButton11 = 'btn-default';
			vm.myButton12 = 'btn-default';
			vm.myButton13 = 'btn-default';
			vm.myButton14 = 'btn-default';

			//---------------------------------------------

	function cleanArray() {
    
	   objPrincipal = {};		objRangoFechas = {};
		estatusCliente = {};	objParametros = {};
		objParametros.conectado = 0, objParametros.Fuera = 0, objParametros.Susp = 0, objParametros.Insta = 0,
		objParametros.Desconect = 0, objParametros.DescTmp = 0, objParametros.baja = 0;
		vm.anioC = {value: 2010	};
		vm.anioC2 = {value: 2010 }; 

        for (var i = 0; i < vm.DistribuidoresTable.length; i++) //todos los distribuidores de la tabla
            { 
                 vm.DistribuidoresTable[i].selected = false;
            }     

        Distribuidores = [];    Plazas = [];    Estados = [];   Ciudades = [];
		Localidades = [];         Colonias = [];	Calles = [];Periodos = [];
		ServiciosInternet = [];	ServiciosDigital = [];	TipoClientes = [];		Motcan = [];
		Motcan2 = []; DistribuidoresTodos = [];	PlazasTodos = []; EstadosTodos = [];
		CiudadesTodos = [];	LocalidadesTodos = [];	ColoniasTodos = []; CallesTodos = [];
		PeriodosTodos = [];	ServiciosInternetTodos = []; ServiciosDigitalTodos = [];TipoClientesTodos = [];
		
        vm.botonRegresar = true; //oculta
		vm.divMotivoCancelacion1 = true; //se oculta
        vm.divMotivoCancelacion2 = true;

		clv_usuario = 1; //siste
		banderas = {};
		banderas.clv_usuario = clv_usuario;
		banderas.banderaDistribuidor = 0;
		banderas.banderaCiudad = 0;
		banderas.banderaLocalidad = 0;
		banderas.banderaColonia = 0;
		banderas.banderaCalle = 0; // estado del checkbox
		banderas.banderaTodoSeleccionado = 0;			

        vm.ultimoMes = vm.meses[0]; //model         
        vm.mesQueAdeuda = vm.meses[0]; //model
		vm.fechaInicial = new Date();
		vm.fechaFinal = new Date();
		vm.search = null;
		vm.inicializaCheckbox(); //INICIALIZAR TODOS LOS CHECKBOX
    }

    vm.inicializaCheckbox = inicializaCheckbox;

		function inicializaCheckbox() {

        vm.distriTodo = false;
        vm.todoTodoselected = false;
        vm.plazaTodo = false;
        vm.estadoTodo = false;
        vm.ciudadTodo = false;
        vm.localidadTodo = false;
        vm.coloniaTodo = false;
        vm.serviciosInternetTodo = false;
        vm.serviciosDigitalTodo = false;
        vm.tipoTodo = false;
        vm.periodoTodo = false;
        vm.calleTodo = false;

        pla = 0, est = 0, coloni = 0, sinter = 0, sdig = 0, tipo = 0, peri = 0;				
		//-------- status cliente
		vm.staC =  false;				
		vm.staF = false;
		vm.staS =  false;				
		vm.staI =  false;
		vm.staD =  false;
		vm.statN =  false;
		vm.statT =  false;
		//-------busca o no
		vm.buscaOno = false;
		buscaOnovar = 0;
	}


	vm.statusCancel = statusCancel;
    function statusCancel() {
        if (objParametros.baja == 1) //checked
			{
				vm.divMotivoCancelacion1 = true; //se oculta
				//---------------------------------------------------------------
				objParametros.baja = 0;		
             
			} else if (objParametros.baja == 0) // not checked
			{
				vm.divMotivoCancelacion1 = false; //se muestra
				//---------------------------------------------------------------
				objParametros.baja = 1;
			}           
		}


	function showOpcion() {
              
	vm.search = null; //limpia barra búsqueda
	vm.botonRegresar = true; //no muestra
    vm.pdistribuidores = true; //no mostrar
	vm.pplazas = true; //no mostrar
	vm.pestados = true;
	vm.pciudades = true;
	vm.plocalidades = true;
	vm.pcolonias = true;
	vm.pserviciosInternet = true;
	vm.pserviciosDigital = true;
	vm.ptipoclientes = true;
	vm.pperiodos = true;
	vm.prangosfecha = true;
	vm.pmesanio = true;
	vm.pcalles = true;
	vm.pstatus = true;
	vm.preporte = true;
	}


			vm.elMenu = elMenu

			function elMenu() {
				vm.myButton1 = 'btn-default';
				vm.myButton2 = 'btn-default';
				vm.myButton3 = 'btn-default';
				vm.myButton4 = 'btn-default';
				vm.myButton5 = 'btn-default';
				vm.myButton6 = 'btn-default';
				vm.myButton7 = 'btn-default';
				vm.myButton8 = 'btn-default';
				vm.myButton9 = 'btn-default';
				vm.myButton10 = 'btn-default';
				vm.myButton11 = 'btn-default';
				vm.myButton12 = 'btn-default';
				vm.myButton13 = 'btn-default';
				vm.myButton14 = 'btn-default';

			}

	function changeBgColor(valReporte) {
        vm.elMenu();
        switch (valReporte) {
			case 1:
				vm.myButton1 = "btn-info active";
		  	    break;
			case 2:
			     vm.myButton2 = "btn-info active";
				break;
			case 3:
				vm.myButton3 = "btn-info active";
				break;
			case 4:
				vm.myButton4 = "btn-info active";
				break;
			case 5:
				vm.myButton5 = "btn-info active";
				break;
			case 6:
				vm.myButton6 = "btn-info active";
				break;
			case 7:
				vm.myButton7 = "btn-info active";
				break;
			case 8:
				vm.myButton8 = "btn-info active";
				break;
			case 9:
				vm.myButton9 = "btn-info active";
				break;
			case 10:
			vm.myButton10 = "btn-info active";
				break;
			case 11:
				vm.myButton11 = "btn-info active";
				break;
			case 12:
				vm.myButton12 = "btn-info active";
				break;
			case 13:
				vm.myButton13 = "btn-info active";
				break;
			case 14:
				vm.myButton14 = "btn-info active";
				break;
				}

				reporteSeleccionado = valReporte;
				cleanArray();
				showOpcion();
				vm.pdistribuidores = false; //mostrar
			}



			// 1.- DISTRIBUIDORES
			vm.filtroDistribuidores = filtroDistribuidores;

			function filtroDistribuidores() {
				//Si el array Distribuidores está vacío, no pasar al siguiente modal
				if (Distribuidores.length == 0) {
					ngNotify.set('Seleccione al menos un distribuidor', {
						type: 'error'
					});
				} else //array no vacío
				{
					if (banderas.banderaTodoSeleccionado == 1) {
						showServiciosDI(); //va a servicios <--
					} else { // sigue orden normal
						showplazas(); //muestra siguiente modal
					}
				}

			}


			// 2.- PLAZAS
			vm.showplazas = showplazas;

			function showplazas() {

				vm.search = ""; //limpia barra búsqueda
				vm.pplazas = false; //show
				vm.pdistribuidores = true; //hide
				ListaPlazas();
			}


			// 3.- ESTADOS

			vm.showEstados = showEstados;

			function showEstados() {
			
				if (Plazas.length == 0) //Si el array Distribuidores está vacío, no pasar al siguiente modal
				{
					ngNotify.set('Seleccione al menos una plaza', {
						type: 'error'
					});
				} else {
					vm.search = null; //limpia barra búsqueda
					vm.pplazas = true;
					vm.pdistribuidores = true;
					vm.pestados = false; //show
					ListaEstados();
				}
			}

			// 4.- CIUDADES


			vm.showCiudades = showCiudades;

			function showCiudades() {
				//Si el array está vacío, no pasar al siguiente modal
				if (Estados.length == 0) {
					//alert('Seleccione al menos un estado');
					ngNotify.set('Seleccione al menos un estado', {
						type: 'error'
					});
				} else {
					vm.search = null; //limpia barra búsqueda
					vm.pplazas = true;
					vm.pestados = true;
					vm.pciudades = false;
					ListaCiudades();
				}
			}

			// 5.- LOCALIDADES


			vm.showLocalidades = showLocalidades;

			function showLocalidades() {
		
				//Si el array  está vacío, no pasar al siguiente modal
				if (Ciudades.length == 0) {
					//alert('Seleccione al menos una ciudad');
					ngNotify.set('Seleccione al menos una ciudad', {
						type: 'error'
					});
				} else {				
					vm.search = null; //limpia barra búsqueda
					vm.pplazas = true;
					vm.pestados = true;
					vm.pciudades = true;
					vm.plocalidades = false;
					ListaLocalidades();
				}
			}

			// 6.- COLONIAS
			vm.showColonias = showColonias;

			function showColonias() { //Si el array Distribuidores está vacío, no pasar al siguiente modal
			
				if (Localidades.length == 0) {
					//alert('Seleccione al menos una localidad');
					ngNotify.set('Seleccione al menos una localidad', {
						type: 'error'
					});
				} else {
					vm.search = null; //limpia barra búsqueda
					vm.pplazas = true;
					vm.pestados = true;
					vm.pciudades = true;
					vm.plocalidades = true;
					vm.pcolonias = false;
					ListaColonias();
				}
			}


			// 7.- SERVICIOS

			vm.showServiciosDI = showServiciosDI;

		function showServiciosDI() // muestra servicios digital o internet
		{
            
            //Si el array está vacío, no pasar al siguiente modal
            if ((Colonias.length == 0) && banderas.banderaTodoSeleccionado == 0) 
            {
                ngNotify.set('Seleccione al menos una colonia', { type: 'error' });
            } 
            else if ((Colonias.length > 0) || (banderas.banderaTodoSeleccionado == 1)) 
                //pasa al siguiente modal
                {
                    vm.search = null; //limpia barra búsqueda
                    vm.pdistribuidores = true;
                    vm.pplazas = true;
                    vm.pestados = true;
                    vm.pciudades = true;
                    vm.plocalidades = true;
                    vm.pcolonias = true;

                    if (servicioSeleccionado == 3) //Mostrar servicio Digital
                    {
                        vm.pserviciosDigital = false;
                        ListaServiciosDigital();
                    } else if (servicioSeleccionado == 2) //Mostrar servicio Internet
                    {
                        vm.pserviciosInternet = false;
                        ListaServiciosInternet();
                    }
                
            }      
        }


			// 8.- TIPO DE CLIENTES

			vm.showTipoClientes = showTipoClientes;
			function showTipoClientes() {
		
				if (reporteSeleccionado != 12) {
					//Si el array está vacío, no pasar al siguiente modal
					if (((servicioSeleccionado == 3) && (ServiciosDigital.length == 0)) || ((servicioSeleccionado == 2) && (ServiciosInternet.length == 0))) {
						//alert('Seleccione al menos un servicio');
						ngNotify.set('Seleccione al menos un servicio', {
							type: 'error'
						});
					} else {
						vm.search = null; //limpia barra búsqueda
						vm.pplazas = true;
						vm.pestados = true;
						vm.pciudades = true;
						vm.plocalidades = true;
						vm.pcolonias = true;
						vm.pserviciosInternet = true;
						vm.pserviciosDigital = true;
						vm.ptipoclientes = false; // sí se muestra tipo clientes
						ListaTipoClientes();
					}
				} else if (reporteSeleccionado == 12) //Si el reporte seleccionado es '12.- Paquetes de Cortesía'
				{
					vm.showPeriodos(); //no muestra 'tipoclientes' y muestra el siguiente
				}
			}





			// 9.- PERIODOS

			vm.showPeriodos = showPeriodos;

			function showPeriodos() {
				

				if (reporteSeleccionado != 12) //Filtro para los reportes que tienen tipo de clientes
				{
					if (TipoClientes.length == 0) {
						//alert('Seleccione al menos un tipo de cliente');
						ngNotify.set('Seleccione al menos un tipo de cliente', {
							type: 'error'
						});
					} else {
						vm.search = null; //limpia barra búsqueda
						vm.pplazas = true;
						vm.pestados = true;
						vm.pciudades = true;
						vm.plocalidades = true;
						vm.pcolonias = true;
						vm.pserviciosInternet = true;
						vm.pserviciosDigital = true;
						vm.ptipoclientes = true;
						vm.pperiodos = false; //muestra periodos
						ListaPeriodos();
					}
				} else if (reporteSeleccionado == 12) // Reporte no tiene tipos de clientes
				{
					vm.search = null; //limpia barra búsqueda
					vm.pplazas = true;
					vm.pestados = true;
					vm.pciudades = true;
					vm.plocalidades = true;
					vm.pcolonias = true;
					vm.pserviciosInternet = true;
					vm.pserviciosDigital = true;
					vm.ptipoclientes = true;
					vm.pperiodos = false; //muestra periodos
					ListaPeriodos();
				}
			}



			//10.- RANGOS DE FECHA
			vm.showRangosFecha = showRangosFecha;

			function showRangosFecha() {
			

				if (Periodos.length == 0) //Si el array Periodos está vacío, no pasar al siguiente modal
				{
					ngNotify.set('Seleccione al menos un periodo', {
						type: 'error'
					});
				} else {
					if ((reporteSeleccionado >= 1 && reporteSeleccionado <= 4) || (reporteSeleccionado == 10) || (reporteSeleccionado == 12)) {

						showReporte();
					} else if ((reporteSeleccionado == 5) || (reporteSeleccionado == 6) || (reporteSeleccionado == 8) || (reporteSeleccionado == 9) || (reporteSeleccionado == 11)) {
						if (reporteSeleccionado == 9) //Muestra div Motcan si es el reporte 9.-Cancelaciones
						{
							vm.MotcanDiv = false; //se muestra       //divT1 = document.getElementById("MotcanDiv");divT1.style.display = "";
						} else //No muestra el div Motcan
						{
							vm.MotcanDiv = true; //se oculta      //divT2 = document.getElementById("MotcanDiv");                    divT2.style.display = "none";
						}

						vm.search = null; //limpia barra búsqueda
						//rangosFecha existe
						vm.pplazas = true;
						vm.pestados = true;
						vm.pciudades = true;
						vm.plocalidades = true;
						vm.pcolonias = true;
						vm.pserviciosInternet = true;
						vm.pserviciosDigital = true;
						vm.ptipoclientes = true;
						vm.pperiodos = true;
						vm.prangosfecha = false;
						// ListaMotcan();  //ListaRangosFecha();

					} else //cualquier otro reporte
					{
						//rangosFecha no existe en estos reportes, pasa al siguiente modal,        no es necesario filtroRangosFecha
						vm.showMesAnio();
					}
				}
			}


			//11
			vm.showMesAnio = showMesAnio;
			function showMesAnio() {

				if ((reporteSeleccionado == 5) || (reporteSeleccionado == 6) 
                    || (reporteSeleccionado == 8) || (reporteSeleccionado == 9) || (reporteSeleccionado == 11)){

					var D1 = vm.fechaInicial; // no se usa porque tiene formato con zona horaria
					var month = D1.getUTCMonth() + 1; //months from 1-12
					var day = D1.getUTCDate();
					var year = D1.getUTCFullYear();
					var fechaInicialYMD = year + "/" + month + "/" + day;

					var D2 = vm.fechaFinal; // no se usa porque tiene formato con zona horaria
					var month = D2.getUTCMonth() + 1; //months from 1-12
					var day = D2.getUTCDate();
					var year = D2.getUTCFullYear();
					var fechaFinalYMD = year + "/" + month + "/" + day;

					objPrincipal.fecha_ini = fechaInicialYMD; 
					objPrincipal.fecha_fin = fechaFinalYMD; 

					if (reporteSeleccionado == 9) //9.-Cancelaciones
					{
						objRangoFechas.motcan = vm.selectedMotcan1.Clv_MOTCAN; //vm.motcan1; 
						objRangoFechas.motivo = 1; 
					} else //Como no muestra el div Motcan, todo en ceros
					{
						objRangoFechas.motcan = 0; //id opcion seleccionada
						objRangoFechas.motivo = 0; //lista no activa
					}
					//alert('motcan ' + objRangoFechas.motcan + ' ' + ' motivo ' + objRangoFechas.motivo + 'PASA AL FINAL');

					showReporte();
				} else {
					//objPrincipal.fecha_ini = "0000-00-00";
					objPrincipal.fecha_ini = String.Empty; //string null
					objPrincipal.fecha_fin = String.Empty; // string null "0000-00-00";
					//alert('objPrincipal.fecha_ini  ' + objPrincipal.fecha_ini + ' ' + ' objPrincipal.fecha_fin ' + objPrincipal.fecha_fin);

					if (reporteSeleccionado == 7) {
						vm.search = null; //limpia barra búsqueda
						//showMesAnio existe
						vm.pplazas = true;
						vm.pestados = true;
						vm.pciudades = true;
						vm.plocalidades = true;
						vm.pcolonias = true;
						vm.pserviciosInternet = true;
						vm.pserviciosDigital = true;
						vm.ptipoclientes = true;
						vm.pperiodos = true;
						vm.prangosfecha = true;
						vm.pmesanio = false;
						//ListaMesAnio();
					} else //cualquier otro reporte
					{
						vm.showCalles();
					}
				}
			}


			//12.- CALLES

			vm.showCalles = showCalles;

			function showCalles() {

				if ((reporteSeleccionado == 7)) {
                     
					if (vm.anioC.value == 0) {
						//alert("Escriba un año");
						ngNotify.set('Escriba un año', {
							type: 'error'
						});
					} else {
                        //mes anio					
                        estatusCliente.mes = vm.ultimoMes.value; 
						estatusCliente.anio = vm.anioC.value; //toma el año tecleado
						showReporte();
					}
				} else {
					if ((reporteSeleccionado == 13) || (reporteSeleccionado == 14)) //calles existe en estos reportes
					{
                        if (banderas.banderaTodoSeleccionado == 0) //SÍ muestra las calles 
                        {
						vm.search = null; //limpia barra búsqueda
						vm.pplazas = true;
						vm.pestados = true;
						vm.pciudades = true;
						vm.plocalidades = true;
						vm.pcolonias = true;
						vm.pserviciosInternet = true;
						vm.pserviciosDigital = true;
						vm.ptipoclientes = true;
						vm.pperiodos = true;
						vm.prangosfecha = true;
						vm.pmesanio = true;
						vm.pcalles = false;
						ListaCalles();
                        }
                        else if (banderas.banderaTodoSeleccionado == 1)//NO muestra las calles
                        {   
                            showStatus(); //pasa al siguiente 
                        }
					}
				}
			}



			//13.- Status del cliente
			vm.showStatus = showStatus;
			function showStatus() {

				if ((reporteSeleccionado == 13) || (reporteSeleccionado == 14)) { //Si el array Calles está vacío, no pasar al siguiente modal
					
                    if (banderas.banderaTodoSeleccionado == 0)
                    {
                        if (Calles.length == 0) {
                            ngNotify.set('Seleccione al menos una calle', { type: 'error' });                        
                        } 
                        else {
                            modalStatus();
                        }
                    } 
                    else if (banderas.banderaTodoSeleccionado == 1)
                    { 
                        modalStatus();
                    }                    
				}
			}


            vm.modalStatus = modalStatus;
            function modalStatus(){
                vm.search = null; //limpia barra búsqueda
                vm.pplazas = true;
                vm.pestados = true;
                vm.pciudades = true;
                vm.plocalidades = true;
                vm.pcolonias = true;
                vm.pserviciosInternet = true;
                vm.pserviciosDigital = true;
                vm.ptipoclientes = true;
                vm.pperiodos = true;
                vm.prangosfecha = true;
                vm.pmesanio = true;
                vm.pcalles = true;
                vm.pstatus = false; //muestra status de cliente
            }




			vm.divMotivoCancelacion2 = true; //se oculta

			vm.buscaOnoFunction = buscaOnoFunction;

			function buscaOnoFunction() {
				if (buscaOnovar == 1) //checked
				{
					vm.divMotivoCancelacion2 = true; //se oculta
					////---------------------------------------------------------------
					buscaOnovar = 0;  
				} else if (buscaOnovar == 0) // not checked
				{
					vm.divMotivoCancelacion2 = false; //se muestra
					////---------------------------------------------------------------
					buscaOnovar = 1;

				}
			}



			vm.filtroStatus = filtroStatus;
			function filtroStatus() {
			
				if ((objParametros.conectado == 0) && (objParametros.Insta == 0) && (objParametros.DescTmp == 0) && (objParametros.Fuera == 0) &&
					(objParametros.Desconect == 0) && (objParametros.Susp == 0) && (objParametros.conectado == 0) && (objParametros.baja == 0)) {
					//alert("Seleccione por lo menos un status");
					ngNotify.set('Seleccione al menos un status', {
						type: 'error'
					});
				} else if ((objParametros.conectado == 1) || (objParametros.Insta == 1) || (objParametros.DescTmp == 1) || (objParametros.Fuera == 1) ||
					(objParametros.Desconect == 1) || (objParametros.Susp == 1) || (objParametros.conectado == 1) || (objParametros.baja == 1)) {

					objRangoFechas.motcan = vm.selectedMotcan2.Clv_MOTCAN;
                    objRangoFechas.motivo = 0; 

					if (buscaOnovar == 1) //checked
					{
						if (vm.anioC2.value == 0) //en modal estatusCliente
						{
							//alert("Escriba un año");
							ngNotify.set('Escriba un año', {
								type: 'error'
							});
						} else {
                            // status
							estatusCliente.buscaOno = 1;
							estatusCliente.buscarPor = vm.menoresModel;
							estatusCliente.mes = vm.mesQueAdeuda.value; 
							estatusCliente.anio = vm.anioC2.value;
							 // $("#anioC2").val();
							//pasa al siguiente modal
							showReporte();
						}
					} else {
						estatusCliente.buscaOno = 0;
						estatusCliente.buscarPor = 0; //<= ó =
						estatusCliente.mes = 0;
						estatusCliente.anio = 0;
						//alert('PASA AL FINAL');
						showReporte();
					}
				}
			}






			//14
			vm.showReporte = showReporte;

			function showReporte() {
				vm.search = null; //limpia barra búsqueda
				vm.pplazas = true;
				vm.pestados = true;
				vm.pciudades = true;
				vm.plocalidades = true;
				vm.pcolonias = true;
				vm.pserviciosInternet = true;
				vm.pserviciosDigital = true;
				vm.ptipoclientes = true;
				vm.pperiodos = true;
				vm.prangosfecha = true;
				vm.pmesanio = true;
				vm.pcalles = true;
				vm.pstatus = true;
				vm.preporte = false;

				muestraDistribuidores(); //crea xml
            }

//-------------------------------------------------------------------------------------------


    vm.ListaPlazas = ListaPlazas;
    function ListaPlazas() {  
	   reportesVariosFactory.mostrarPlazaByDistribuidor(vm.clv_usuario, Distribuidores).then(function(data) {	
	       vm.PlazasTable = data.GetPlazasByDistribuidorResult; //mostrar en tabla
		   PlazasTodos = data.GetPlazasByDistribuidorResult; // array
		});
    }

    vm.ListaEstados = ListaEstados;
	function ListaEstados() {
		//enviar solo array Plazas
	   reportesVariosFactory.mostrarEstadoByPlaza(Plazas).then(function(data) {	
            vm.EstadosTable = data.GetEstadosByplazaResult; //las plazas que se eligen
	       //EstadosTodos = data.GetEstadosByplazaResult; // todas las plazas que se muestran		
		});
	}

	vm.ListaCiudades = ListaCiudades;
	function ListaCiudades(){
		//enviar array Plazas y Estados
		reportesVariosFactory.mostrarCiudad(Plazas, Estados).then(function(data) {
		  vm.CiudadesTable = data.GetCiudadesBy_PlazasEstadoResult;
	       //CiudadesTodos = data.GetCiudadesBy_PlazasEstadoResult;	
		});
	}

	vm.ListaLocalidades = ListaLocalidades;
	function ListaLocalidades(){
		reportesVariosFactory.mostrarLocalidadByCiudad(clv_usuario, Ciudades).then(function(data) {
	       vm.LocalidadesTable = data.GetLocalidadesbyCiudadResult;
	       //	LocalidadesTodos = data.GetLocalidadesbyCiudadResult;	
		});
	}
    vm.ListaColonias = ListaColonias;
    function ListaColonias (){
        reportesVariosFactory.mostrarColonia(clv_usuario, banderas.banderaLocalidad, Ciudades, Localidades).then(function(data) {
            vm.ColoniasTable = data.GetColoniasBy_Ciudad_LocalidadResult;
            //   ColoniasTodos = data.GetColoniasBy_Ciudad_LocalidadResult; 
        });
    }
    vm.ListaCalles = ListaCalles;
    function ListaCalles (){
        reportesVariosFactory.mostrarCalle(clv_usuario, banderas.banderaLocalidad, banderas.banderaColonia, Distribuidores, Ciudades, Localidades, Colonias).then(function(data) {
            vm.CallesTable = data.GetCallesBy_Ciudad_Localidad_ColoniaResult;
            //     CallesTodos = data.GetCallesBy_Ciudad_Localidad_ColoniaResult; 
        });
    }


    vm.ListaServiciosInternet = ListaServiciosInternet;
    function ListaServiciosInternet (){
        reportesVariosFactory.mostrarServInternet().then(function(data) {
            vm.ServInternetTable = data.GetServInternetListResult; //array   
            //  ServiciosInternetTodos = data.GetServInternetListResult;                 
        });
    }

    vm.ListaServiciosDigital = ListaServiciosDigital;
    function ListaServiciosDigital(){
        reportesVariosFactory.mostrarServDigital().then(function(data) { 
            vm.ServDigitalTable = data.GetServDigitalListResult; //array                        
            // ServiciosDigitalTodos = data.GetServDigitalListResult;
        });
    }

    vm.ListaTipoClientes = ListaTipoClientes;
    function ListaTipoClientes(){
        reportesVariosFactory.mostrarTipoCliente().then(function(data) {
            vm.TipoClientesTable = data.GetTipoClienteListResult; //array                        
        //  vm.x.checked = data.GetPeriodosRepVarListResult[0]; //model
        }); 
    }

    vm.ListaPeriodos = ListaPlazas;
    function ListaPeriodos() {
        reportesVariosFactory.mostrarPeriodo().then(function(data) {
            vm.PeriodosTable = data.GetPeriodosRepVarListResult; //array
            PeriodosTodos = data.GetPeriodosRepVarListResult;  
        });
    }
//------------------------------------------------------------------------------------------


vm.crearObjParametros = crearObjParametros;
function crearObjParametros() {
    //@clv_reporte=4 --Desconectados Temporales
    if ((reporteSeleccionado == 1) || (reporteSeleccionado == 4))//1 desconectados, 4  adelantados
    { 
        objPrincipal.clv_reporte = 3; 
    }
    else if ((reporteSeleccionado == 2) || (reporteSeleccionado == 10))//2 suspendidos, 10 por instalar
    {
            objPrincipal.clv_reporte = 2;
    } else if ((reporteSeleccionado == 3) || (reporteSeleccionado == 7))//3 al corriente, 7 por pagar,
    {
            objPrincipal.clv_reporte = 1;
    }
    else if (reporteSeleccionado == 5) {
            objPrincipal.clv_reporte = 4; //5 contrataciones principales --Clientes Principales con Status Contratado
            objParametros.conectado = 1;//valor predeterminado con este reporte, el resto en cero
        }
        else if (reporteSeleccionado == 8)          //8 instalaciones
        {
            objPrincipal.clv_reporte = 9;
            objParametros.Insta = 1;//valor predeterminado con este reporte, el resto en cero
        }
        else if (reporteSeleccionado == 9) {
            objPrincipal.clv_reporte = 10; //10 cancelaciones
            objParametros.baja = 1;//valor predeterminado con este reporte, el resto en cero
            objParametros.motcan 
            //SE USA EL MOTIVO DE CANCELACION
        }
        else if (reporteSeleccionado == 11) {
            objPrincipal.clv_reporte = 13; //13 fuera de área
            objParametros.Fuera = 1;//valor predeterminado con este reporte, el resto en cero
        }
        else if (reporteSeleccionado == 6) {
            objPrincipal.clv_reporte = 4; //6 contrataciones
            objParametros.conectado = 1;//valor predeterminado con este reporte, el resto en cero
        }
        else if (reporteSeleccionado == 12) {
            objPrincipal.fecha_ini = String.Empty;//string null 
            objPrincipal.fecha_fin = String.Empty; // string null "0000-00-00";
        }

        objPrincipal.OrdenEjecutada = 2;
        objParametros.habilita = 0;
        objPrincipal.op = servicioSeleccionado;       
        objPrincipal.Orden = vm.ordenRadio; 

        if (objPrincipal.op == 3) // digital
        {
            objPrincipal.soloInternet = 0;
        }else if (objPrincipal.op == 2) //internet 
        {
            if (vm.soloInter == true)
            { objPrincipal.soloInternet = 1;
            }
            else { 
                objPrincipal.soloInternet = 0;
            }
        }
    }


//-------------------

vm.status = status;
 function status(id) {
        if (id == 1) //conect
        {
            if (objParametros.conectado == 1) {
                objParametros.conectado = 0;
            } else { objParametros.conectado = 1; }
        }

        if (id == 2) //fuera
        {
            if (objParametros.Fuera == 1) {
                objParametros.Fuera = 0;
            } else { objParametros.Fuera = 1; }
            //alert('ahora es ' + objParametros.Fuera);
        }
        if (id == 3) //suspe
        {
            if (objParametros.Susp == 1) {
                objParametros.Susp = 0;
            } else { objParametros.Susp = 1; }
            //alert('ahora es ' + objParametros.Susp);
        }
        if (id == 4)// instalado
        {
            if (objParametros.Insta == 1) {
                objParametros.Insta = 0;
            } else { objParametros.Insta = 1; }
            //alert('ahora es ' + objParametros.Insta);
        }
        if (id == 5) //desconect
        {
            if (objParametros.Desconect == 1) {
                objParametros.Desconect = 0;
            } else { objParametros.Desconect = 1; }
        }
        if (id == 6) //tempo
        {
            if (objParametros.DescTmp == 1) {
                objParametros.DescTmp = 0;
            } else { objParametros.DescTmp = 1; }
        }
 
    }



//----------- REPORTES EN PDF

vm.muestraDistribuidores = muestraDistribuidores;

function muestraDistribuidores ()
{    
      var Servicios = [];
        crearObjParametros();

        if (servicioSeleccionado == 3) //Mostrar servicio Digital
        {
            Servicios = ServiciosDigital; //ServiciosInternet = [];
        } else if (servicioSeleccionado == 2) //Mostrar servicio Internet
        {
            Servicios = ServiciosInternet; // ServiciosDigital = [];
        }

        if (banderas.banderaLocalidad == 1) {  Localidades = []; }
        if (banderas.banderaColonia == 1) { Colonias = []; }
        //  banderas.banderaCalle = 1  //no checado: algunas ciudades  banderas.banderaCalle = 0; 
        if (banderas.banderaCalle == 1) { Calles = []; }

        
        crearXml(Servicios); 
}


    var OtrosFiltrosXml = "";    var distribuidoresXML= "";     var CompaniasXml= "";    var EstadosXml= ""; 
    var CiudadesXml= "";     var LocalidadesXml= "";     var ColoniaXml= "";    var ServiciosXml= ""; 
    var TipoClientesXml= "";    var PeriodosXml= "";    
    var CalleXml= "";     var localidadF= "";    var coloniaF= "";    var calleF= "";


vm.crearXml = crearXml;
    function crearXml(Servicios){     
       // console.log('Crear xml');
        reportesVariosFactory.getXml( objPrincipal, objParametros, objRangoFechas, estatusCliente, Distribuidores, Plazas, Estados,
        Ciudades,   Localidades, Colonias, Servicios, TipoClientes, Periodos, Calles).then(function(data) {    

        OtrosFiltrosXml = data.GetCreateXmlBeforeReportResult[0];// 
        distribuidoresXML = data.GetCreateXmlBeforeReportResult[1]; // 
        CompaniasXml = data.GetCreateXmlBeforeReportResult[2];//      
        EstadosXml = data.GetCreateXmlBeforeReportResult[3];//        
        CiudadesXml = data.GetCreateXmlBeforeReportResult[4];//        
        LocalidadesXml = data.GetCreateXmlBeforeReportResult[5];//       
        ColoniaXml = data.GetCreateXmlBeforeReportResult[6];//       
        ServiciosXml = data.GetCreateXmlBeforeReportResult[7];//       
        TipoClientesXml = data.GetCreateXmlBeforeReportResult[8];//       
        PeriodosXml = data.GetCreateXmlBeforeReportResult[9];//     
        CalleXml = data.GetCreateXmlBeforeReportResult[10];//       
        localidadF = data.GetCreateXmlBeforeReportResult[11];//     
        coloniaF = data.GetCreateXmlBeforeReportResult[12];//    
        calleF = data.GetCreateXmlBeforeReportResult[13];//   

        realizaReporte();

    });  
}



vm.realizaReporte = realizaReporte;
    function realizaReporte(){

        var elOrden = objPrincipal.Orden;
        var laBaja = objParametros.baja;
        var servSelec = servicioSeleccionado;   //  console.log('reporteSeleccionado '+reporteSeleccionado);
  
        reportesVariosFactory.creaReporte(reporteSeleccionado, servSelec, clv_usuario, elOrden, laBaja,
        OtrosFiltrosXml,  distribuidoresXML,  CompaniasXml,  CiudadesXml, CalleXml,
        LocalidadesXml,  ColoniaXml,  ServiciosXml,  PeriodosXml,  TipoClientesXml,  localidadF,  coloniaF, calleF ).then(function(data) { 
        
        var urlReporte ="";
        console.log('urlReporte '+urlReporte);
    
        if (reporteSeleccionado == 13)  // 13 ciudad
        {
            if (elOrden == 1) {
                if (laBaja == 0)//cualquiera SIN bajas
                {  
                    urlReporte = data.GetReporteDig_12Result; // url = "ReportesVarios/Reporte_Digital_12"; 
                }
                else if (laBaja == 1) //cualquiera CON bajas
                { urlReporte = data.GetReporteDig_13Result; // url = "ReportesVarios/Reporte_Digital_13"; 
                }
            }
            else if (elOrden == 2) {
                if (laBaja == 0)//cualquiera SIN bajas
                { 
                    urlReporte = data.GetReporteDig_15Result; // url = "ReportesVarios/Reporte_Digital_15";
                }
                if (laBaja == 1)  //cualquiera CON bajas
                { 
                    urlReporte = data.GetReporteDig_14Result; // url = "ReportesVarios/Reporte_Digital_14"; 
                }
            }
        }
        else if (reporteSeleccionado == 14) // 14 resumen por colonia y status
        {
           urlReporte = data.GetReporteDig_5Result;// url = "ReportesVarios/Reporte_Digital_5";
        }
        else if ((reporteSeleccionado != 13) && (reporteSeleccionado != 14)) 
        {
            if (servSelec == 3) // ---------------- S E R V I C I O   D I G I T A L
            {   //Contrato | Colonia y Calle; Orden = 1 | 2              
                if ((reporteSeleccionado == 1) || (reporteSeleccionado == 2) || (reporteSeleccionado == 7)) //1 desconectados, 2 suspendidos, 7 por pagar 
                { 
                    urlReporte = data.GetReporteDig_1Result;// url = "ReportesVarios/Reporte_Digital_1"; 
                }
                else if (reporteSeleccionado == 12)// 12 paquetes de cortesía
                {
                    urlReporte = data.GetReporteDig_4Result; //url = "ReportesVarios/Reporte_Digital_4";
                }
                if (elOrden == 1) //Contrato
                {
                    if ((reporteSeleccionado == 3) || (reporteSeleccionado == 10))//3 al corriente, 10 por instalar
                    {   urlReporte = data.GetReporteDig_2Result; //url = "ReportesVarios/Reporte_Digital_2"; 
                    }
                    else if (reporteSeleccionado == 4) // 4 adelantados
                    {    
                    urlReporte = data.GetReporteDig_3Result;//url = "ReportesVarios/Reporte_Digital_3"; 
                    }
                    
                    else if (reporteSeleccionado == 9) //9 cancelaciones
                    {    
                    
                        urlReporte = data.GetReporteDig_6Result; //url = "ReportesVarios/Reporte_Digital_6"; 
                    }
                    else if ((reporteSeleccionado == 5) ||(reporteSeleccionado == 8) || (reporteSeleccionado == 11))//5 contrataciones principales8 instalaciones, 11 fueras de área
                    {    
                       
                        urlReporte = data.GetReporteDig_16Result; //url = "ReportesVarios/Reporte_Digital_6"; 
                    }

                    else if (reporteSeleccionado == 6)// 6 contrataciones
                    {    urlReporte = data.GetReporteDig_7Result; //url = "ReportesVarios/Reporte_Digital_7"; 
                    }
                }
                else if (elOrden == 2) // Colonia y calle
                {
                    if ((reporteSeleccionado == 3) || (reporteSeleccionado == 10))//3 al corriente, 10 por instalar
                    {    urlReporte = data.GetReporteDig_8Result; //url = "ReportesVarios/Reporte_Digital_8"; 
                    }
                    else if (reporteSeleccionado == 4)// 4 adelantados
                    {   urlReporte = data.GetReporteDig_9Result; //url = "ReportesVarios/Reporte_Digital_9"; 
                    }
                    else if ((reporteSeleccionado == 5) || (reporteSeleccionado == 8) || (reporteSeleccionado == 9) || (reporteSeleccionado == 11))//5 contrataciones principales, 8 instalaciones, 9 cancelaciones, 11 fueras de área
                    {   urlReporte = data.GetReporteDig_11Result; //url = "ReportesVarios/Reporte_Digital_11"; 
                    }
                    else if (reporteSeleccionado == 6)// 6 contrataciones
                    {    urlReporte = data.GetReporteDig_10Result;//url = "ReportesVarios/Reporte_Digital_10"; 
                    }
                }
            }
            else if (servSelec == 2)// ---------------- S E R V I C I O   I N T E R N E T
            {
                //Contrato | Colonia y Calle; Orden = 1 | 2                   
                if ((reporteSeleccionado == 1) || (reporteSeleccionado == 2)) //1 desconectados, 2 suspendidos
                {    urlReporte = data.GetReporteInt_1Result;//url = "ReportesVarios/Reporte_Internet_1"; 
                }
                else if (reporteSeleccionado == 7)// 7 por pagar
                {    urlReporte = data.GetReporteInt_2Result; //url = "ReportesVarios/Reporte_Internet_2"; 
                }
                else if (reporteSeleccionado == 12)// 12 paquetes de cortesía
                {       urlReporte = data.GetReporteInt_7Result; //url = "ReportesVarios/Reporte_Internet_7"; 
                }
                if (elOrden == 1) //Contrato
                {
                    if ((reporteSeleccionado == 3) || (reporteSeleccionado == 4) || (reporteSeleccionado == 10))//3 al corriente, 4 adelantados, 10 por instalar
                    { urlReporte = data.GetReporteInt_3Result;//url = "ReportesVarios/Reporte_Internet_3"; 
                    }
                    else if ((reporteSeleccionado == 6) || (reporteSeleccionado == 8) || (reporteSeleccionado == 9) || (reporteSeleccionado == 11))//6 contrataciones, 8 instalaciones, 9 cancelaciones, 11 fueras de área
                    { urlReporte = data.GetReporteInt_5Result; //url = "ReportesVarios/Reporte_Internet_5"; 
                    }
                }
                else if (elOrden == 2) //Colonia y calle
                {
                    if ((reporteSeleccionado == 3) || (reporteSeleccionado == 4) || (reporteSeleccionado == 10))//3 al corriente, 4 adelantados, 10 por instalar
                    { urlReporte = data.GetReporteInt_4Result; //url = "ReportesVarios/Reporte_Internet_4"; 
                    }
                    else if ((reporteSeleccionado == 6) || (reporteSeleccionado == 8) || (reporteSeleccionado == 9) || (reporteSeleccionado == 11))//6 contrataciones, 8 instalaciones, 9 cancelaciones, 11 fueras de área
                    { urlReporte = data.GetReporteInt_6Result; //url = "ReportesVarios/Reporte_Internet_6"; 
                    }
                }
            }
        }
  
        vm.reporteUrl=$sce.trustAsResourceUrl(globalService.getUrlReportes()+'/reportes/'+ urlReporte);     
        });      
    }

});
