var botonAdicionar = document.querySelector("#adicionar-paciente");

botonAdicionar.addEventListener("click",function(event){
    
    event.preventDefault();

    var form = document.querySelector("#form-adicionar");
    var paciente = capturarDatosPaciente(form);
    var tabla = document.querySelector("#tabla-pacientes");
    var pacienteTr = construirTr(paciente);

    var errores = validarPaciente(paciente);
    if(errores.length >0){
        exibirMsjErrores(errores);
        return;
    }

    //ASIGNANDO EL HIJO (TD) A LA TABLA
    tabla.appendChild(pacienteTr);

    form.reset();

});


function capturarDatosPaciente(form){  ////CAPTURANDO ELEMENTOS DE LA TABLA
    
    var paciente = {

        nombre: form.nombre.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc:  calcularIMC(form.peso.value, form.altura.value)
    }
    
    return paciente;
}

function construirTr(paciente){

    //CREANDO ELEMENTOS DE TABLA (un tr y los td)
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add('paciente');     
    

    //ASISGANDO HIJOS TD AL TR
    pacienteTr.appendChild(construirTd(paciente.nombre, "info-nombre"));
    pacienteTr.appendChild(construirTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(construirTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(construirTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(construirTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function construirTd(dato, clase){

    var td = document.createElement('td');
    td.classList.add(clase);
    td.textContent = dato;

    return td;
}

function validarPaciente(paciente){
    var errores = [];

    if (!validarPeso(paciente.peso)){
        errores.push("Peso del Paciente Incorrecto");
    }
    if (!validarAltura(paciente.altura)){
        errores.push("Altura del Paciente Incorrecto");
    }

    return errores;
}

function exibirMsjErrores(errores){

    var ul = document.querySelector("#mensajes-errores");

    errores.forEach(function(error){

        var li = document.createElement("li");
        li.textContent= error;
        ul.appendChild(li);
    });
}
