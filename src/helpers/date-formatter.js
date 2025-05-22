// This file contains functions to format dates in different ways.
export function getDateAsDay(str) {
  // Convert the string to a date object
  const date = new Date(str);
  const options = { weekday: 'short' };
  //make it all uppercase
  const day = new Intl.DateTimeFormat('en-US', options).format(date);
  return day.toUpperCase();
}

export function getDateAsMonth(str) {
    const date = new Date(str);
    const options = { month: 'short' };
    
    const month = new Intl.DateTimeFormat('en-US', options).format(date);
    return month.toUpperCase();
}

export function getDateAsDayNumber(str) {
    const date = new Date(str);
    const options = { day: '2-digit' };
    
    const day = new Intl.DateTimeFormat('en-US', options).format(date);
    return day.toUpperCase();
}

export function getFutureDatesFromArray(dates) {
  
    //remove past dates from incoming array with dates
    const futureDates = dates.filter((date) => {
        return new Date(date.event_date) > new Date();
    });
    console.log(futureDates);
    return futureDates;
} 

export function getPastDates(str) {
    const date = new Date(str);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    //make it all uppercase
    const pastDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return pastDate.toUpperCase();
}
