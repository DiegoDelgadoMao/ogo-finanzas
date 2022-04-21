function deletRows(classReference){
	classReference.rows.forEach(e=>{
		e.lastChild.addEventListener('click',()=> {
			classReference.removeRow(e.lastChild.parentElement)
			printFormulasResult()
			calculateExpensesPorcentaje()
		})
	})
}

function runEditParagraph(classReference,maxLetter = 18){
	classReference.rows.forEach(e=>{
		let elementLabel = e.firstChild.firstChild.firstChild;
		elementLabel.addEventListener('keydown',()=>{
			let textoElemento = elementLabel.textContent;
			if(textoElemento.length > maxLetter){
				elementLabel.setAttribute('contenteditable','false');
				elementLabel.textContent = textoElemento.slice(0, maxLetter)
			}
			elementLabel.setAttribute('contenteditable','true')
		})
	})
}

function runLabelsExpenses (){
	let labels = document.querySelectorAll('.ri-price-tag-3-fill');

	labels.forEach(e=>{
		e.addEventListener('click',()=>{
			let optionsTags =e.parentElement.lastElementChild;
			optionsTags.style.display = 'grid';

			let options = e.nextSibling.childNodes;

			options.forEach(option=>{
				option.addEventListener('click',()=>{
					let optionValue = option.firstChild.innerText;

					if(optionValue === 'basicos'){
						e.classList.add('tag-basic')

						e.classList.remove('tag-luxe')
						e.classList.remove('tag-saving');
					}else if(optionValue === 'ahorros'){
						e.classList.add('tag-saving');

						e.classList.remove('tag-basic')
						e.classList.remove('tag-luxe')
					}else if(optionValue === 'lujos'){
						e.classList.add('tag-luxe');

						e.classList.remove('tag-basic')
						e.classList.remove('tag-saving')
					}
					optionsTags.style.display = 'none';
				})
			})
		})
	})
}

function sumValues(ElementsListHtml,containerPrintValueHtml = false){
	let incomesList = document.querySelectorAll(`.${ElementsListHtml}`);

	let incomesValues = Array.from(incomesList,element=>{
		let validation = validationInput(element.value);
		if(validation){
			let numberIncome = stringToNumber(element.value);
			return numberIncome;
		}else{
			return 0
		}
	})

	let sum;
	if(incomesValues.length > 0){
		sum = incomesValues.reduce((previousValue,currentValue)=> previousValue + currentValue);
	}else{
		sum = 0;
	}

	let valueFinal = NumberToString(sum);

	if(containerPrintValueHtml !== false){
		let containerPrintValue = document.getElementById(`${containerPrintValueHtml}`);
		containerPrintValue.innerText = valueFinal;
	}

	return sum;
}

const NumberToString = (number)=>{
	let conversion = number.toString();
	let array = conversion.split('');

	if(conversion.length === 4){
		array.splice(1,0,'.');
	}
	else if(conversion.length === 5){
		array.splice(2,0,'.');
	}
	else if(conversion.length === 6){
		array.splice(3,0,'.');
	}
	else if(conversion.length === 7){
		array.splice(1,0,'.');
		array.splice(5,0,'.');
	}
	else if(conversion.length === 8){
		array.splice(2,0,'.');
		array.splice(6,0,'.');
	}
	else if(conversion.length === 9){
		array.splice(3,0,'.');
		array.splice(7,0,'.');
	}

	const valueFInal = array.toString().replaceAll(',','');
	return valueFInal;
}

const stringToNumber = (string)=>{
	let cantidadCeros = 0;
	let valor = string.split('')

	let arrayValor = valor.map(element => element);

	for(caracter of arrayValor){
		let indiceElemento = arrayValor.indexOf('0');
		if(indiceElemento !== -1){
			cantidadCeros++;
			arrayValor.splice(indiceElemento,1,'#')
		}

		if(caracter === '.'){
			let indiceElemento2 = arrayValor.indexOf('.');
			arrayValor.splice(indiceElemento2,1)
		}
	}

	let cadena = arrayValor.toString().replaceAll(',','');
	cadena = cadena.replaceAll('#','0')
	let numeros = Number(cadena);

	return numeros
}

function calculateExpensesPorcentaje (){
	let totalIncomes = sumValues('incomes-inputs');

	if(totalIncomes > 0){
		let inputsExpenses = document.querySelectorAll('.egresos-calculo');

		// porcentaje que ocupa ese gasto (una fila)
		for(let i = 0; i < inputsExpenses.length; i++){
			let valueInput = stringToNumber(inputsExpenses[i].value);

			let printPorcentajeExpenses  = inputsExpenses[i].parentElement.nextSibling.firstChild;

			let formulaCalculageExpense = (valueInput / totalIncomes) * 100;
			formulaCalculageExpense = formulaCalculageExpense.toFixed(1);

			printPorcentajeExpenses.innerText = `${formulaCalculageExpense}%`;
		}

		// calcular el porcentaje de los gastos basicos

		let ExpensesBasics = [];

		let expensesBasicsHtml = document.querySelectorAll('.tag-basic');
		for(elementBasic of expensesBasicsHtml){
			let valueExpenseBasic = elementBasic.parentElement.parentElement.nextSibling.firstChild.value;
			valueExpenseBasic = stringToNumber(valueExpenseBasic);
			ExpensesBasics.push(valueExpenseBasic);
		}

		let expenesesBasicsTotal;
		if(ExpensesBasics.length >= 2){
			expenesesBasicsTotal = ExpensesBasics.reduce((previousValue,currentValue)=> previousValue + currentValue);
		}else if(ExpensesBasics.length === 1){
			expenesesBasicsTotal = ExpensesBasics[0];
		}else{
			expenesesBasicsTotal = 0;
		}

		let calculateBasicPorcentaje = (expenesesBasicsTotal / totalIncomes) * 100;
		calculateBasicPorcentaje = Math.round(calculateBasicPorcentaje);

		if(calculateExpensesPorcentaje < 1){
			circleProgressMove('progress-circle-basic','value-circle-basic',0)
		}else{
			circleProgressMove('progress-circle-basic','value-circle-basic',calculateBasicPorcentaje)
		}

		// calcular porcentaje de los lujos

		let ExpensesLuxe = [];

		let expensesLuxesHtml = document.querySelectorAll('.tag-luxe');
		for(elementBasic of expensesLuxesHtml){
			let valueExpenseLuxe = elementBasic.parentElement.parentElement.nextSibling.firstChild.value;
			valueExpenseLuxe = stringToNumber(valueExpenseLuxe);
			ExpensesLuxe.push(valueExpenseLuxe);
		}

		let expenesesLuxesTotal;
		if(ExpensesLuxe.length >= 2){
			expenesesLuxesTotal = ExpensesLuxe.reduce((previousValue,currentValue)=> previousValue + currentValue);
		}else if(ExpensesLuxe.length === 1){
			expenesesLuxesTotal = ExpensesLuxe[0];
		}else{
			expenesesLuxesTotal = 0;
		}

		let calculateLuxePorcentaje = (expenesesLuxesTotal / totalIncomes) * 100;
		calculateLuxePorcentaje = Math.round(calculateLuxePorcentaje);

		if(calculateLuxePorcentaje < 1){
			circleProgressMove('progress-circle-luxe','value-circle-luxe',0)
		}else{
			circleProgressMove('progress-circle-luxe','value-circle-luxe',calculateLuxePorcentaje)
		}

		// calcular porcentaje de los ahorros

		let ExpensesSavings = [];

		let expensesSavingsHtml = document.querySelectorAll('.tag-saving');
		for(elementBasic of expensesSavingsHtml){
			let valueExpenseSavings = elementBasic.parentElement.parentElement.nextSibling.firstChild.value;
			valueExpenseSavings = stringToNumber(valueExpenseSavings);
			ExpensesSavings.push(valueExpenseSavings);
		}

		let expenesesSavingsTotal;
		if(ExpensesSavings.length >= 2){
			expenesesSavingsTotal = ExpensesSavings.reduce((previousValue,currentValue)=> previousValue + currentValue);
		}else if(ExpensesSavings.length === 1){
			expenesesSavingsTotal = ExpensesSavings[0];
		}else{
			expenesesSavingsTotal = 0;
		}

		let calculateSavingsPorcentaje = (expenesesSavingsTotal / totalIncomes) * 100;
		calculateSavingsPorcentaje = Math.round(calculateSavingsPorcentaje)

		if(calculateSavingsPorcentaje < 1){
			circleProgressMove('progress-circle-saving','value-circle-saving',0)
		}else{
			circleProgressMove('progress-circle-saving','value-circle-saving',calculateSavingsPorcentaje)
		}
	}
	printFormulasResult()
}

function claculateExpensesPorcentajeTight(){
	let totalIncomes = sumValues('incomes-inputs');
	console.log(totalIncomes)

	if(totalIncomes > 0){
		let inputsExpenses = document.querySelectorAll('.egresos-calculo-ajustado');

		for(let i = 0; i < inputsExpenses.length; i++){
			let valueInput = stringToNumber(inputsExpenses[i].value);

			let printPorcentajeExpenses  = inputsExpenses[i].parentElement.nextSibling.firstChild;

			let formulaCalculageExpense = (valueInput / totalIncomes) * 100;
			formulaCalculageExpense = formulaCalculageExpense.toFixed(1);

			printPorcentajeExpenses.innerText = `${formulaCalculageExpense}%`;
		}
	}
}

function printFormulasResult(){
	const CONTAINER_PRINT_FORMULA1 = document.getElementById('percentage-spent');
	const CONTAINER_PRINT_FORMULA2 = document.getElementById('percentage-free');

	const CONTAINER_PRINT_INCOMES = document.getElementById('imprimir-resultado-ingresos');
	const CONTAINER_PRINT_EXPENSES = document.getElementById('imprimir-resultado-egresos');

	let sumIncomes = sumValues('incomes-inputs','total-incomes');
	let sumExpenses = sumValues('inputs-fila-egresos');

	let formula1 = (sumExpenses / sumIncomes) * 100;
	formula1 = formula1.toFixed(2)

	let formula2 = ((sumExpenses / sumIncomes) - 1) * 100;
	formula2 = Math.abs(formula2).toFixed(2);

	if(isNaN(formula1) || isNaN(formula2)){
		CONTAINER_PRINT_FORMULA1.textContent = `0%`;
		CONTAINER_PRINT_FORMULA2.textContent = `0%`;
	}else{
		CONTAINER_PRINT_FORMULA1.textContent = `${formula1}%`;
		CONTAINER_PRINT_FORMULA2.textContent = `${formula2}%`;
	}

	CONTAINER_PRINT_EXPENSES.textContent = NumberToString(sumExpenses);
	CONTAINER_PRINT_INCOMES.textContent = NumberToString(sumIncomes);
}