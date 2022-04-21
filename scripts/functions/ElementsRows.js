function createExpenses(elementParent){
	const TEXTS = ['Renta','6.000','0%','5.500','0%','basicos','ahorros','lujos'];
	const FRAGMENT = new DocumentFragment();

	// contenedor con la fila y boton para eliminar fila
	const ROW_EXPENSES = document.createElement('DIV');
	ROW_EXPENSES.classList.add('row-expenses')

	const CONTAINER_ROW = document.createElement('DIV');
	CONTAINER_ROW.classList.add('container-row-expenses');

	// bucle para crear las celdas de la fila
	for(let i = 0; i < 5; i++){
		const CELL_ROW = document.createElement('DIV');
		CELL_ROW.classList.add('container-row-expenses__cell');

		const PARAGRAPH = document.createElement('P');

		const INPUT = document.createElement('INPUT');
		INPUT.classList.add('inputs-fila-egresos');
		INPUT.setAttribute('type','text');

		// creacion de los elementos par alos tags

		const CONTAINER_TAG = document.createElement('DIV');
		CONTAINER_TAG.classList.add('select-categoies-container__box');

		const CONTAINER_OPTIONS = document.createElement('DIV');
		CONTAINER_OPTIONS.classList.add('options-categories');

		const I_lABEL = document.createElement('I');
		I_lABEL.classList.add('ri-price-tag-3-fill');
		I_lABEL.classList.add('tag-basic');

		switch(i){
			case 0:
				CELL_ROW.classList.add('select-categoies-container');

				PARAGRAPH.setAttribute('contenteditable','true');
				PARAGRAPH.textContent = TEXTS[0];

				for(let i = 1; i < 4; i++){
					const P_OPTION = document.createElement('P');
					P_OPTION.textContent = TEXTS[i + 4];

					const OPTION = document.createElement('DIV');
					OPTION.classList.add('options-categories__value');
					OPTION.appendChild(P_OPTION);
					CONTAINER_OPTIONS.appendChild(OPTION);
				}

				CONTAINER_TAG.appendChild(I_lABEL);
				CONTAINER_TAG.appendChild(CONTAINER_OPTIONS);
				CELL_ROW.appendChild(PARAGRAPH);
				CELL_ROW.appendChild(CONTAINER_TAG);
				break;
			case 1:
				INPUT.setAttribute('placeholder',`${TEXTS[1]}`);
				INPUT.setAttribute('oninput', 'calculateExpensesPorcentaje()')
				INPUT.classList.add('egresos-calculo');

				CELL_ROW.appendChild(INPUT);
				break;
			case 2:
				CELL_ROW.classList.add('container-fila-egresos__celda--porcentaje')
				PARAGRAPH.textContent = TEXTS[2];
				CELL_ROW.appendChild(PARAGRAPH);
				break;
			case 3:
				INPUT.setAttribute('placeholder',`${TEXTS[3]}`);
				INPUT.classList.add('egresos-calculo-ajustado');
				INPUT.setAttribute('oninput','claculateExpensesPorcentajeTight()')
				CELL_ROW.appendChild(INPUT)
				break;
			case 4:
				CELL_ROW.classList.add('container-fila-egresos__celda--porcentaje')
				PARAGRAPH.textContent = TEXTS[4];
				CELL_ROW.appendChild(PARAGRAPH);
				break;
		}
		CONTAINER_ROW.appendChild(CELL_ROW);
	}

	const BUTTON_DELET = document.createElement('BUTTON');
	BUTTON_DELET.classList.add('row-expenses__button-delet');

	const ICON = document.createElement('I');
	ICON.classList.add('ri-delete-bin-5-fill');
	BUTTON_DELET.appendChild(ICON)

	ROW_EXPENSES.appendChild(CONTAINER_ROW);
	ROW_EXPENSES.appendChild(BUTTON_DELET);

	FRAGMENT.appendChild(ROW_EXPENSES);
	elementParent.appendChild(ROW_EXPENSES);
	return ROW_EXPENSES;
}

// elementos de la fila

function createIncomes(elementParent){
	const TEXTS = ['Nombre Sueldo','900.000']
	const FRAGMENT = document.createDocumentFragment();

	// contenedor de la fila
	let containerRow = document.createElement('DIV');
	containerRow.classList.add('container-row-aggregate');

	// fila
	let row = document.createElement('DIV');
	row.classList.add('row')

	for(let i = 0; i < 2; i++){
		let cell = document.createElement('DIV');
		cell.classList.add('row__cell');

		switch (i) {
			case 0:
				let paragraph = document.createElement('P');
				paragraph.textContent = TEXTS[0];
				paragraph.setAttribute('contenteditable','true');
				paragraph.classList.add('paragraph-edit');

				cell.appendChild(paragraph);
				break;
			case 1:
				let input = document.createElement('INPUT');
				input.classList.add('incomes-inputs');
				input.setAttribute('placeholder',TEXTS[1]);
				input.setAttribute('type','text');

				input.setAttribute('oninput','printFormulasResult()')

				cell.appendChild(input);
				break;
		}
		row.appendChild(cell);
	}

	let buttonDeletRow = document.createElement('BUTTON');
	buttonDeletRow.classList.add('button-delet-row');

	let inconDelet = document.createElement('I');
	inconDelet.classList.add('ri-delete-bin-5-fill');

	buttonDeletRow.appendChild(inconDelet);

	containerRow.appendChild(row);
	containerRow.appendChild(buttonDeletRow);

	FRAGMENT.appendChild(containerRow);
	elementParent.appendChild(FRAGMENT);
	return containerRow;
}