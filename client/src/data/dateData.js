const dateData = {
	days: [],
	months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	years: [],

	monthMap: {
		January: 1,
		February: 2,
		March: 3, /// etc., populated by the function below
	}

};

function pushNumbers() {
	for (let i = 1; i < 32; i++) {
		dateData.days.push(i);
	}
	for (let i = 2018; i < 2030; i++) {
		dateData.years.push(i);
	}
	dateData.months.forEach((month, i) => {
		dateData.monthMap[month] = i + 1;
	});
}

pushNumbers();

console.log(dateData);

module.exports = dateData;