import {
Table,
TableExpenses,
TableIncomes
} from './class/table.mjs'

const elementParentIncomes = document.getElementById('container-rows-incomes');
const buttonAddIncomes = document.getElementById('add-row');

const elementParentExpenses = document.getElementById('element-parent-expenses');
const buttonAddExpenses = document.getElementById('add-row-expenses');

let tableIncomes = new TableIncomes({
	elementFather: elementParentIncomes
})

let tableExpenses = new TableExpenses({
	elementFather: elementParentExpenses
})

buttonAddIncomes.addEventListener('click',()=> tableIncomes.addRow(tableIncomes))

buttonAddExpenses.addEventListener('click',()=>tableExpenses.addRow(tableExpenses))

