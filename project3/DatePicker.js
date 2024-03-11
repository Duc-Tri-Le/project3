function DatePicker(id, callback) {
	this.id = id;
	this.callback = callback;
  }
  function getNumOfDate(date) {
	let NumOfDate = 0;
	let month = date.getMonth() + 1;
	switch (month) {
	  case 1:
	  case 3:
	  case 5:
	  case 7:
	  case 8:
	  case 10:
	  case 12:
		NumOfDate = 31;
		break;
	  case 4:
	  case 6:
	  case 9:
	  case 11:
		NumOfDate = 30;
		break;
	  default:
		let year = date.getYear();
		if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) NumOfDate = 29;
		else NumOfDate = 28;
	}
	return NumOfDate;
  }
  function emphaSize(td) {
	td.style.color = "rgb(255,255,255,0.5";
	td.style.border = "1px solid rgb(255,255,255,0.5";
  }
  DatePicker.prototype.Rerender = () => {
	alert("hello");
  };
  DatePicker.prototype.render = function (date) {
	const week_days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
	const tbl = document.createElement("table");
	tbl.style.width = "50vw";
	tbl.style.border = "1px solid black";
	const tr = tbl.insertRow();
	let NumOfDate = getNumOfDate(date);
	for (let j = 0; j < 7; j++) {
	  const td = tr.insertCell();
	  td.appendChild(document.createTextNode(week_days[j]));
	  td.style.border = "1px solid black";
	  td.style.color = "white";
	  td.style.backgroundColor = "black";
	  td.id = j;
	}
	let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
	let startInsert = false;
	let currentDate = 1;
	let insert = true;
	let nextMonth = false;
	let LastMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
	let NumOfDateLastMonth = getNumOfDate(LastMonthDate);
	let NextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
	let NumOfDateNextMonth = getNumOfDate(NextMonthDate);
	let dateArr = [];
	for (let i = NumOfDateLastMonth - 9; i <= NumOfDateLastMonth; i++)
	  dateArr.push(i);
	for (let i = 1; i <= NumOfDate; i++) dateArr.push(i);
	for (let i = 1; i <= 10; i++) dateArr.push(i);
	let index = 10 - startDate.getDay();
	while (insert) {
	  const tr = tbl.insertRow();
	  for (let j = 0; j < 7; j++) {
		const td = tr.insertCell();
		td.style.border = "1px solid black";
		if (insert) {
		  td.appendChild(document.createTextNode(dateArr[index]));
		  if (dateArr[index + 1] == 1 && index > 10) {
			nextMonth = true;
		  }
		  if (index < 10 || (dateArr[index] <= 10 && nextMonth)) emphaSize(td);
		  else {
			td.id = dateArr[index];
			td.addEventListener("click", () => {
			  let fixDate = {
				day: td.id,
				month: date.getMonth() + 1,
				year: date.getFullYear(),
			  };
			  this.callback(this.id, fixDate);
			});
		  }
  
		  index++;
		}
	  }
	  if (nextMonth) insert = false;
	}
  
	var elem = document.getElementById(this.id);
	let previousButton = document.createElement("button");
	previousButton.addEventListener("click", () => {
	  this.render(new Date(date.getFullYear(), date.getMonth() - 1, 1));
	});
	previousButton.innerText = "<";
  
	let nextButton = document.createElement("button");
	nextButton.addEventListener("click", () => {
	  this.render(new Date(date.getFullYear(), date.getMonth() + 1, 1));
	});
	nextButton.innerText = ">";
  
	let a = 'alert("hello")';
	let container = document.createElement("div");
	let info = document.createElement("h1");
	info.innerHTML = `${date.getMonth() + 1} - ${date.getFullYear()}`;
  
	elem.innerHTML = "";
	container.classList.add("container");
	container.appendChild(previousButton);
	container.appendChild(info);
	container.appendChild(nextButton);
	elem.appendChild(container);
	elem.appendChild(tbl);
  };
  
  var datePicker1 = new DatePicker("datepicker1", function (id, fixedDate) {
	console.log(
	  "DatePicker with id",
	  id,
	  "selected date:",
	  fixedDate.month + "/" + fixedDate.day + "/" + fixedDate.year
	);
  });
  datePicker1.render(new Date());
  var datePicker2 = new DatePicker("datepicker2", function (id, fixedDate) {
	console.log(
	  "DatePicker with id",
	  id,
	  "selected date:",
	  fixedDate.month + "/" + fixedDate.day + "/" + fixedDate.year
	);
  });
  datePicker2.render(new Date("1/1/2009"));
  