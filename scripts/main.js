const contenedorTablasIngresos = document.getElementById('contenedor-tablas-ingresos');
let contenedorTablasEgresos = document.getElementById('contenedor-tablas-egresos');
let parrafosEditables;
let egresos;
let ingresos;
let botonesDeletTabla;

const contenedorImprimirIngreso = document.getElementById('imprimir-resultado-ingresos');
const contenedorImprimirGastos = document.getElementById('imprimir-resultado-egresos');

const contenedorPorcentajeGasto = document.getElementById('porcentaje-gasto');
const contenedorPorcentajeLibre = document.getElementById('porcentaje-libre');

function calcularIngresos (){
	if(ingresos !== undefined){
		let sumaIngresos = 0;
		if(ingresos.length > 1){
			let arrayIngresos = [];
			for(ingreso of ingresos){
				numeroIngreso = parseFloat(ingreso.value)
				arrayIngresos.push(numeroIngreso);
			}
			sumaIngresos = arrayIngresos.reduce((valorPrevio,valorActual)=> valorPrevio + valorActual);
		}else if(ingresos.length === 0){
			sumaIngresos = 0
		}else{
			sumaIngresos = parseFloat(ingresos[0].value);
		}
		return sumaIngresos
	}else{
		return 0;
	}
}

function calcularEgresos (){
	let sumaEgresos = 0;
	if(egresos !== undefined){
		if(egresos.length > 1){
			let arrayEgresos = [];
			for(egreso of egresos){
				numeroEgresos = parseFloat(egreso.value)
				arrayEgresos.push(numeroEgresos);
			}
			sumaEgresos = arrayEgresos.reduce((valorPrevio,valorActual)=> valorPrevio + valorActual);
		}else if(egresos.length === 0){
			sumaEgresos = 0;
		}else{
			sumaEgresos = parseFloat(egresos[0].value);
		}
			return sumaEgresos
	}else{
		return 0;
	}
}

let x;

function calculoFinanciero (){
	let ingresoNeto = calcularIngresos();
	let gastosMensuales = calcularEgresos();


	let porcentajeGasto = (gastosMensuales / ingresoNeto) * 100;
	porcentajeGasto = porcentajeGasto.toFixed(2);
	let porcentajeLibre = ((gastosMensuales / ingresoNeto) - 1) * 100;
	porcentajeLibre = Math.abs(porcentajeLibre).toFixed(2);

	contenedorImprimirIngreso.textContent = ingresoNeto;
	contenedorImprimirGastos.textContent = gastosMensuales;

	if(isNaN(porcentajeLibre) || isNaN(porcentajeGasto) ||
	porcentajeGasto === 'Infinity' || porcentajeLibre === 'Infinity'){
		contenedorPorcentajeGasto.textContent = `0%`;
		contenedorPorcentajeLibre.textContent = `0%`;
	}else{
		contenedorPorcentajeGasto.textContent = `${porcentajeGasto}%`;
		contenedorPorcentajeLibre.textContent = `${porcentajeLibre}%`;
	}
}
