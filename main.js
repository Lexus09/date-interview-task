/*
 * Your program must print string with the number of years and months and the total number of days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly into the code. All code need to be written in this file.
 * 
 * Result must be shown as a string in years, months and total days. If years or months are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
*/
const dates = [
    ['01.01.2000', '01.01.2016'],
    ['01.01.2016', '01.08.2016'],
    ['01.11.2015', '01.02.2017'],
    ['17.12.2016', '16.01.2017'],
    ['01.01.2016', '01.01.2016'],
    ['28.02.2015', '13.04.2018'],
    ['28.01.2015', '28.02.2015'],
    ['17.03.2022', '17.03.2023'],
    ['17.02.2024', '17.02.2025'],
];

// Receive string of dates one after each other
function outputDate(dates) {
	const parsedDates = dates.join(".").split(".").map(Number);
	const [startDay, startMonth, startYear, endDay, endMonth, endYear] = parsedDates;

	let yearDiff = endYear - startYear;
	let monthDiff = endMonth - startMonth;
   
	if (startMonth > endMonth) yearDiff --;
	if (monthDiff < 0) monthDiff += 12;
	if (endDay - startDay < 0) monthDiff--;
   
	const startingYearInDays = getMonthsInDays(startYear);
    const endYearInDays = getMonthsInDays(endYear);

    const startYearElapsedDays = startingYearInDays.reduce((acc, curr, index) => index >= (startMonth - 1) ? acc : acc += curr, 0) + startDay;

    const endMonthRemainingDays = endYearInDays[endMonth - 1] - endDay;
    const endYearRemainingDays = endYearInDays.reduce((acc, curr, index) => index <= (endMonth - 1) ? acc : acc += curr, 0) + endMonthRemainingDays;
    
    let totalDays = 0;
    for (let i = startYear; i <= endYear; i++) {
		totalDays += isLeapYear(i) ? 366 : 365;
    }
    
    totalDays -= (startYearElapsedDays + endYearRemainingDays);

    let result = "";

    if (yearDiff > 0) {
    	result += `${yearDiff} ${yearDiff > 1 ? "years" : "year"}, `;
    }
 
    if (monthDiff > 0) {
    	result += `${monthDiff} ${monthDiff > 1 ? "months" : "month"}, `;
    }
    
    result += `total ${totalDays} days`;
    
    return result;
}


function isLeapYear(year) {
	return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

function getMonthsInDays(year) {
	return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}