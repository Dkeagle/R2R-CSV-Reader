/**
 * Reset the value of line number from localStorage and reload the page
 */
function resetLocalStorage(){
	localStorage.clear();
	document.location.reload();
}

/**
 * Call the CSV file via php, read the specified line and print it
 * @param {integer} line 
 */
function readCSV(line){
	/* check new line is a number bigger than 1 and not empty */
	if(isNaN(line)){return};
	if(line < 1){return};
	if(line === ""){return};
	if(localStorage.getItem("total") !== null && parseInt(line) > parseInt(localStorage.getItem("total"))){return};

	/* update localStorage with new line */
	localStorage.setItem("line", line);
	
	/* ask for the data */
	let xhr = new XMLHttpRequest()
	let param = "line=" + encodeURIComponent(line);
	xhr.addEventListener("readystatechange", function(){
		if(this.readyState === 4 && this.status === 200){
			displayData(this.responseText);
		}
	});
	xhr.open("POST", "read.php");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(param);
}

/**
 * Display the received data in the DOM
 * @param {string} data 
 */
function displayData(data){
	if(data === "eof"){
		console.error("You've reached the end of your trip! Congrats! Press reset to start again!")
	}else{
		let splitted = data.replaceAll("\"", "").split(",");
		document.getElementById("line_input").value = localStorage.getItem("line");
		let total = localStorage.getItem("total") === null ? "???" : localStorage.getItem("total");
		document.getElementById("total").innerHTML = " / " + total;
		document.getElementById("system_name").innerHTML = splitted[0].toUpperCase();
		document.getElementById("body_name").innerHTML = splitted[1].toUpperCase();
		document.getElementById("body_subtype").innerHTML = splitted[2];
		document.getElementById("terraformable").innerHTML = (splitted[3] == "Yes" ? "Terraformable" : "Not terraformable");
		document.getElementById("distance").innerHTML = (splitted[4].length > 3 ? formatValue(splitted[4]) : splitted[4]) + " ls from star";
		document.getElementById("scan_value").innerHTML = "FSS/ACS Value:\n ~" + (splitted[5].length > 3 ? formatValue(splitted[5]) : splitted[5]) + " cr";
		document.getElementById("map_value").innerHTML = "DSS/DSD Value:\n ~" + (splitted[6].length > 3 ? formatValue(splitted[6]) : splitted[6]) + " cr";
		document.getElementById("jumps").innerHTML = (splitted[7] == 0 ? "No" : splitted[7]) + " jump(s) needed";
	}
}

/**
 * Take an integer as input, longer than three chars, place a dot every three chars starting from the right, used to format long numbers
 * @param {integer} number 
 */
function formatValue(number){
	let temp = "";
	/* reverse the number */
	number = number.split("").reverse().join("");
	for(let i = 0; i < number.length; i++){
		if(i % 3 === 0 && i !== 0){
			// add a dot every three chars (except when i = 0, as 0 % 0 will be true)
			temp += ".";
		}
		temp += number[i];
	}
	/* put the number in the right order */
	return temp.split("").reverse().join("");
}

/**
 * Main function
 */
window.onload = function(){
	/* Load the DOM into variables */
	let line_input = document.getElementById("line_input");
	let prev_button = document.getElementById("prev_button");
	let next_button = document.getElementById("next_button");
	let gtl_button = document.getElementById("gtl_button");
	let reset = document.getElementById("reset");
	
	/* Check localStorage for the line number, create at zero if not defined */
	let line = localStorage.getItem("line");
	if(line === null){
		line = 1;
		localStorage.setItem("line", line);
	}
	line_input.value = line;

	/* Handle events */
	prev_button.addEventListener("click", () => {
		readCSV(parseInt(localStorage.getItem("line")) - 1);
		line_input.value = localStorage.getItem("line");
		line_input.style.width = line_input.value.length + 1.2 + "ch";
	});
	next_button.addEventListener("click", () => {
		readCSV(parseInt(localStorage.getItem("line")) + 1);
		line_input.value = localStorage.getItem("line");
		line_input.style.width = line_input.value.length + 1.2 + "ch";
	});
	gtl_button.addEventListener("click", () => {
		readCSV(line_input.value);
	});
	line_input.addEventListener("change", function(ev){
		this.style.width = this.value.length + 1.2 + "ch";
	});
	line_input.style.width = line_input.value.length + 1.2 + "ch";
	reset.addEventListener("click", resetLocalStorage);
	
	/* Get the total number of lines in file */
	let xhr = new XMLHttpRequest()
	xhr.addEventListener("readystatechange", function(){
		if(this.readyState === 4 && this.status === 200){
			localStorage.setItem("total", this.responseText);
		}
	});
	xhr.open("POST", "read.php");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send();

	/* Read the CSV */
	readCSV(line);
}