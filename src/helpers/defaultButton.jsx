export const defaultButton = (event) => {
	let buttons = event.target.parentElement.childNodes;	
	if (buttons.length === 1 ) buttons = event.target.parentElement.parentElement.childNodes;
	buttons.forEach((element, index) => {
		if (index === 0 || index === 4 || index === 6) return null;
			element.style.background = "none";
			element.style.color = "#a2a2a2";
			element.style.border = "1px solid #a2a2a2";
	});
}