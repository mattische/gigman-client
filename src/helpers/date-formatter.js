// functions to format dates in different ways.

/**
 * 
 * @param {*} str 
 * @returns string
 * @description extracts the date in a date from the string
 * @example getDateAsDay("2023-10-01T00:00:00Z") // returns "01"
 */
export function getDateAsDay(str) {
  // Convert the string to a date object
  const date = new Date(str);
  const options = { weekday: 'short' };
  //make it all uppercase
  const day = new Intl.DateTimeFormat('en-US', options).format(date);
  return day.toUpperCase();
}

/**
 * 
 * @param {*} str 
 * @returns string
 * @description extracts the month in a date from the string
 * @example getDateAsMonth("2023-10-01T00:00:00Z") // returns "OCT"
 */
export function getDateAsMonth(str) {
    const date = new Date(str);
    const options = { month: 'short' };
    
    const month = new Intl.DateTimeFormat('en-US', options).format(date);
    return month.toUpperCase();
}

/**
 * 
 * @param {*} str 
 * @returns string
 * @description extracts the day number in a date from the string
 * @example getDateAsDayNumber("2023-10-01T00:00:00Z") // returns "01"
 */
export function getDateAsDayNumber(str) {
    const date = new Date(str);
    const options = { day: '2-digit' };
    
    const day = new Intl.DateTimeFormat('en-US', options).format(date);
    return day.toUpperCase();
}

/**
 * 
 * @param {array} dates 
 * @returns array
 * @description filters the array of dates and returns only the future dates
 * @example if current date is between first and last elements; getFutureDatesFromArray([{event_date: "2023-10-01T00:00:00Z"}, {event_date: "2022-10-01T00:00:00Z"}]) 
 *  returns [{event_date: "2023-10-01T00:00:00Z"}]
 */
export function getFutureDatesFromArray(dates) {
  
    //remove past dates from incoming array with dates
    const futureDates = dates.filter((date) => {
        return new Date(date.event_date) > new Date();
    });
    console.log(futureDates);
    return futureDates;
} 

/**
 * 
 * @param {array} str 
 * @returns array
 * @description filters the array of dates and returns only the past dates
 * @example if current date is between first and last elements; getPastDatesFromArray([{event_date: "2023-10-01T00:00:00Z"}, {event_date: "2022-10-01T00:00:00Z"}])
 * returns [{event_date: "2022-10-01T00:00:00Z"}]
 */
export function getPastDatesFromArray(dates) {
    //remove future dates from incoming array with dates
    const pastDates = dates.filter((date) => {
        return new Date(date.event_date) < new Date();
    });
    console.log(pastDates);
    return pastDates;
}
