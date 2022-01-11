var altura = 0;
var alturaMts = 0;

function pedirAltura() {
    altura = $("#altura").val();
    alturaMts = (altura / 100);
    console.log("su altura es: " + altura + "CM" + " (" + alturaMts + ") Mts");
    return alturaMts;
}

var peso = 0;
function pedirPeso() {
    peso = $("#peso").val();
    console.log("su peso es: " + peso + "KG");
    return peso;
}

class Imc {
    constructor(alturaMts, peso) {
        this.alturaMts = parseFloat(alturaMts);
        this.peso = parseFloat(peso);
        this.respuestaFinal = [];
    }
    calculoFinal() {
        var respuesta = parseFloat(this.peso / (this.alturaMts * this.alturaMts));
        this.respuestaFinal.push(respuesta.toFixed(2));
        console.log("Tu IMC es: " + this.respuestaFinal);
        return respuesta;
    }
}

const arrayResumen = [];

function calculo() {
    let nombre = $("#nombre").val();
    console.log("Su Nombre y Apellido es: " + nombre);

    pedirAltura();
    pedirPeso();
if (alturaMts, peso, nombre != "") {

    const calculo1 = new Imc(alturaMts, peso, Imc.respuestaFinal);
    calculo1.calculoFinal();
    arrayResumen.push(calculo1);
    const guardarSesion = (clave,valor) => {localStorage.setItem(clave,valor)};
    guardarSesion ("historialImc", JSON.stringify(arrayResumen));

    let contenedor = "";

    for (let Imc of arrayResumen) {
        contenedor = `
            <h2>********************************</h2>
            <h2> ${nombre.toUpperCase()} </h2>
            <h4>Altura: ${Imc.alturaMts} Mts</h4>
            <h4>Peso: ${Imc.peso} Kg</h4>
            <h3>IMC: ${Imc.respuestaFinal} </h3>
            `;   
    }
    $("#resultado").html(contenedor);

} else {
    alert ("Debes Completar Todos los Campos");
    return;
}
}

$(function(){
    const almacenados = JSON.parse(localStorage.getItem("historialImc"));
    let historial = "";
    for (let almacenado of almacenados) {
        historial = `
            <h2>----------------------------</h2>
            <h4>Altura: ${almacenado.alturaMts} Mts</h4>
            <h4>Peso: ${almacenado.peso} Kg</h4>
            <h3>IMC: ${almacenado.respuestaFinal} </h3>
            `;   
    }
    $("#imcAnteriores").html(historial);
})

var diagonostico = "";

$("#calcular").click(function(){
    calculo();
    var indiceFinal = 0;
    let diagFinal = "";
    indiceFinal = parseFloat(arrayResumen[0].respuestaFinal);
    $.ajax({ //Traigo los datos de las tasas de cambio desde el JSON al iniciar el doc. 
        method: "GET",
        url: "diagnosticos.json",
        success: function (data){
            if (indiceFinal <= 19){
                diagnostico = data.diagnosticos[0].diag1;
                diagFinal = "Diagnóstico: " + diagnostico + " "; 
                $("#resultado").append(diagFinal);
            } 
            else if ((indiceFinal >= 20) && (indiceFinal < 25)){
                diagnostico = data.diagnosticos[0].diag2;
                diagFinal = "Diagnóstico: " + diagnostico + " "; 
                $("#resultado").append(diagFinal);
            }
            else if ((indiceFinal >= 25) && (indiceFinal < 30)){
                diagnostico = data.diagnosticos[0].diag3;
                diagFinal = "Diagnóstico: " + diagnostico + " "; 
                $("#resultado").append(diagFinal);
            }
            else if ((indiceFinal >= 30) && (indiceFinal < 35)){
                diagnostico = data.diagnosticos[0].diag4;
                diagFinal = "Diagnóstico: " + diagnostico + " "; 
                $("#resultado").append(diagFinal);
            }
            else if ((indiceFinal >= 35) && (indiceFinal < 40)){
                diagnostico = data.diagnosticos[0].diag5;
                diagFinal = "Diagnóstico: " + diagnostico + " "; 
                $("#resultado").append(diagFinal);
            }
            else if (indiceFinal >= 40) {
                diagnostico = data.diagnosticos[0].diag6;
                diagFinal = "Diagnóstico: " + diagnostico + " "; 
                $("#resultado").append(diagFinal);
            }            
        },
        error: function (data){
            console.log ("datos no leidos")
        }
    }) 
})

$("#otroCalculo").click(function(){
    $("#formulario")[0].reset();
});

