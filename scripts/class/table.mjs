class Table{
	constructor({
		elementFather,
		rows = [],
	}){
		this.elementFather = elementFather;
		this.rows = rows;
		this.numbersRows = 0;
	}
	addRow(){
	}
	removeRow(rowDelet){
		if(this.elementFather.contains(rowDelet)){
			this.rows.find((element)=>{
				if(element === rowDelet){
					let indexElement = this.rows.indexOf(element);
					this.rows.splice(indexElement,1)
					return element;
				}
			})

			this.elementFather.removeChild(rowDelet)
			this.numbersRows -= 1;
			calculateExpensesPorcentaje()
		}
	}
}

class TableExpenses extends Table{
	constructor(props){
		super(props)
	}
	addRow(classReference){
		let createRow = createExpenses(this.elementFather);
		this.rows.push(createRow);
		this.numbersRows++;
		deletRows(classReference);
		runEditParagraph(classReference,10)
		runLabelsExpenses();
	}
}

class TableIncomes extends Table{
	constructor(props){
		super(props)
	}
	addRow(classReference){
		let createRow = createIncomes(this.elementFather);
		this.rows.push(createRow);
		this.numbersRows++;
		deletRows(classReference);
		runEditParagraph(classReference,14)
	}
	removeRow(rowDelet){
		if(this.elementFather.contains(rowDelet)){
			this.rows.find((element)=>{
				if(element === rowDelet){
					let indexElement = this.rows.indexOf(element);
					this.rows.splice(indexElement,1)
					return element;
				}
			})

			this.elementFather.removeChild(rowDelet)
			this.numbersRows -= 1;
		}
		printFormulasResult()
	}
}

export{
	Table,
	TableExpenses,
	TableIncomes
}
