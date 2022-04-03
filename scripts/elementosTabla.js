let agegarTablaIngresos = (ingreso)=>{
	let fragmento = document.createDocumentFragment();

	let contenedorSubtabla = document.createElement('DIV');
	contenedorSubtabla.classList.add('contenedor-subtabla');

	let subTabla = document.createElement('DIV');
	subTabla.classList.add('subtabla')

	let inconoDelet = document.createElement('I');
	inconoDelet.classList.add('bx');
	inconoDelet.classList.add('bxs-trash');

	let botonDeletTabla = document.createElement('BUTTON');
	botonDeletTabla.classList.add('contenedor-subtabla__delet');

	contenedorSubtabla.appendChild(subTabla);
	contenedorSubtabla.appendChild(botonDeletTabla);
	botonDeletTabla.appendChild(inconoDelet);

	if(ingreso === false){
		for(let i = 0; i < 2; i++){
			let subTablaCelda = document.createElement('DIV');
			subTablaCelda.classList.add('subtabla__celda');

			if(i === 0){
				let pSubTabla = document.createElement('P');
				pSubTabla.textContent = 'vivienda';

				pSubTabla.setAttribute('contenteditable','true');
				pSubTabla.classList.add('p-editable-right');

				subTablaCelda.appendChild(pSubTabla);
				subTabla.appendChild(subTablaCelda);
			}else{
				let input = document.createElement('INPUT');
				input.classList.add('egresos-inputs');

				input.setAttribute('placeholder','1000');
				input.setAttribute('type','number');
				input.setAttribute('oninput','calculoFinanciero()')

				subTablaCelda.appendChild(input);
				subTabla.appendChild(subTablaCelda);
			}
		}
		botonDeletTabla.classList.add('contenedor-subtabla__delet--egresos')

		fragmento.appendChild(contenedorSubtabla);
		contenedorTablasEgresos.appendChild(fragmento);

		egresos = document.querySelectorAll('.egresos-inputs');

	}else if(ingreso === true){
		for(let i = 0; i < 2; i++){
			let subTablaCelda = document.createElement('DIV');
			subTablaCelda.classList.add('subtabla__celda');

			if(i === 0){
				let pSubTabla = document.createElement('P');
				pSubTabla.textContent = 'Sueldo';

				pSubTabla.setAttribute('contenteditable','true');
				pSubTabla.classList.add('p-editable-right');

				subTablaCelda.appendChild(pSubTabla);
				subTabla.appendChild(subTablaCelda);
			}else{
				let input = document.createElement('INPUT');
				input.classList.add('ingresos-inputs');

				input.setAttribute('placeholder','2000');
				input.setAttribute('type','number');
				input.setAttribute('oninput','calculoFinanciero()')

				subTablaCelda.appendChild(input);
				subTabla.appendChild(subTablaCelda);
			}
		}

		fragmento.appendChild(contenedorSubtabla);
		contenedorTablasIngresos.appendChild(fragmento);

		ingresos = document.querySelectorAll('.ingresos-inputs');

		botonDeletTabla.classList.add('contenedor-subtabla__delet--ingresos');
	}

	// logica para editar nombres de el lado izquierdo de la tabla

	let parrafosEditables = document.querySelectorAll('.p-editable-right');

	let botonesDeletTablaIngresos = document.querySelectorAll('.contenedor-subtabla__delet--ingresos');

	let botonesDeletTablaEgresos = document.querySelectorAll('.contenedor-subtabla__delet--egresos');

	elementosEscuchas({
		botonesDeletTablaIngresos,
		botonesDeletTablaEgresos,
		parrafosEditables

	})
}

let elementoEliminadoIngreso;
let elementoEliminadoEgreso;
let padreTablaIngresos = document.body.children[1].children[0].children[0].children[1]
let padreTablaEgresos = document.body.children[1].children[0].children[1].children[1]

function elementosEscuchas (objeto){
	let textoEditable = objeto.parrafosEditables;
	let botonesDeletTabla = objeto.botonesDeletTablaIngresos;
	let botonesDeletTablaEgresos = objeto.botonesDeletTablaEgresos;

	textoEditable.forEach(e=>{
		e.addEventListener('keydown',()=>{
			let textoElemento = e.textContent;
			if(textoElemento.length > 12){
				e.setAttribute('contenteditable','false');
				e.textContent = textoElemento.slice(0, 12)
			}
			e.setAttribute('contenteditable','true')
		})
	})

	botonesDeletTabla.forEach(e=>{
		e.addEventListener('click',()=>{
			let elementoAEliminar = e.parentNode;
			elementoEliminadoIngreso = elementoAEliminar;
			if(padreTablaIngresos.contains(elementoEliminadoIngreso)){
				padreTablaIngresos.removeChild(elementoAEliminar);
			}
			ingresos = document.querySelectorAll('.ingresos-inputs');
			calculoFinanciero();
		})
	})

	botonesDeletTablaEgresos.forEach(e=>{
		e.addEventListener('click',()=>{
			let elementoAEliminar = e.parentNode;
			elementoEliminadoEgreso = elementoAEliminar;
			if(padreTablaEgresos.contains(elementoEliminadoEgreso)){
				padreTablaEgresos.removeChild(elementoAEliminar);
			}
			egresos = document.querySelectorAll('.egresos-inputs');
			calculoFinanciero();
		})
	})
}
