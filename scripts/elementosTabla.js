
let agegarTablaIngresos = (ingreso = true)=>{
	let fragmento = document.createDocumentFragment();

	let contenedorSubtabla = document.createElement('DIV');
	contenedorSubtabla.classList.add('contenedor-subtabla');

	let subTabla = document.createElement('DIV');
	subTabla.classList.add('subtabla')

	let inconoDelet = document.createElement('I');
	inconoDelet.classList.add('bx');
	inconoDelet.classList.add('bx-x');

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
				pSubTabla.textContent = 'xxx';

				pSubTabla.setAttribute('contenteditable','true');
				pSubTabla.classList.add('p-editable-right');

				subTablaCelda.appendChild(pSubTabla);
				subTabla.appendChild(subTablaCelda);
			}else{
				let input = document.createElement('INPUT');
				input.classList.add('egresos-inputs');

				input.setAttribute('placeholder','xxxx');
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
		botonesDeletTablaEgresos = document.querySelectorAll('.contenedor-subtabla__delet--egresos');

		// logica para elimnar tabla (falta por mejorar!!!!)
		botonesDeletTablaEgresos.forEach(e=>{
			e.addEventListener('click',()=>{
				try {
					let elementoAEliminar = e.parentNode;
					let padre = elementoAEliminar.parentNode;
					padre.removeChild(elementoAEliminar);
					egresos = document.querySelectorAll('.egresos-inputs');
					calculoFinanciero();
				} catch (error) {
				}
			})
		})
	}else{
		for(let i = 0; i < 2; i++){
			let subTablaCelda = document.createElement('DIV');
			subTablaCelda.classList.add('subtabla__celda');

			if(i === 0){
				let pSubTabla = document.createElement('P');
				pSubTabla.textContent = 'xxx';

				pSubTabla.setAttribute('contenteditable','true');
				pSubTabla.classList.add('p-editable-right');

				subTablaCelda.appendChild(pSubTabla);
				subTabla.appendChild(subTablaCelda);
			}else{
				let input = document.createElement('INPUT');
				input.classList.add('ingresos-inputs');

				input.setAttribute('placeholder','xxxx');
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
		botonesDeletTablaIngresos = document.querySelectorAll('.contenedor-subtabla__delet--ingresos');

		// logica para elimnar tabla (falta por mejorar!!!!)
		botonesDeletTablaIngresos.forEach(e=>{
			e.addEventListener('click',()=>{
				try {
					let elementoAEliminar = e.parentNode;
					let padre = elementoAEliminar.parentNode;
					padre.removeChild(elementoAEliminar);
					ingresos = document.querySelectorAll('.ingresos-inputs');
					calculoFinanciero();
				} catch (error) {
				}
			})
		})
	}

	// logica para editar nombres de el lado izquierdo de la tabla

	parrafosEditables = document.querySelectorAll('.p-editable-right');

	parrafosEditables.forEach(e=>{
		e.addEventListener('keydown',()=>{
			let textoElemento = e.textContent;
			if(textoElemento.length > 12){
				e.setAttribute('contenteditable','false');
				e.textContent = textoElemento.slice(0, 12)
			}
			e.setAttribute('contenteditable','true')
		})
	})
}