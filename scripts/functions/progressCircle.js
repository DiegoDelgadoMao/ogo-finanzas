function circleProgressMove (circle,valueProgress,EndValue){
	let progressCircle = document.getElementById(`${circle}`);
	let valueCircle = document.getElementById(`${valueProgress}`);

	let progressValue = EndValue;

	valueCircle.textContent = `${progressValue}%`
	progressCircle.style.background = `conic-gradient(
		#17C6E9 ${progressValue * 3.6}deg,
		#fff ${progressValue * 3.6}deg
	)`
}

