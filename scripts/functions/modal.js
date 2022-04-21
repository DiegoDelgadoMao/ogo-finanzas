let modalHtml = document.getElementById('modal');
let buttonCloseModal = document.getElementById('close-modal');

const validationInput = (string)=>{
	let regExp = /[a-z]|[^ . 0-9]/g;
	let find = string.search(regExp)

	if(find !== -1){
		modalHtml.showModal();
		return false;
	}else{
		return true
	}
}

buttonCloseModal.addEventListener('click',function(){
	modalHtml.close()
})