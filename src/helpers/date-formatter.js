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
    //make it all uppercase
    const month = new Intl.DateTimeFormat('en-US', options).format(date);
    return month.toUpperCase();
}

export function getDateAsDayNumber(str) {
    const date = new Date(str);
    const options = { day: '2-digit' };
    //make it all uppercase
    const day = new Intl.DateTimeFormat('en-US', options).format(date);
    return day.toUpperCase();
}
