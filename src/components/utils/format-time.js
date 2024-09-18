// import { format, getTime, formatDistanceToNow, isValid } from 'date-fns';
import { format,getTime,formatDistanceToNow,isValid } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';
  const parsedDate = new Date(date);

  // Check if the date is valid
  return isValid(parsedDate) ? format(parsedDate, fm) : 'Invalid date';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';
  const parsedDate = new Date(date);

  // Check if the date is valid
  return isValid(parsedDate) ? format(parsedDate, fm) : 'Invalid date';
}

export function fTimestamp(date) {
  const parsedDate = new Date(date);

  // Check if the date is valid
  return isValid(parsedDate) ? getTime(parsedDate) : '';
}

export function fToNow(date) {
  const parsedDate = new Date(date);

  // Check if the date is valid
  return isValid(parsedDate)
    ? formatDistanceToNow(parsedDate, { addSuffix: true })
    : 'Invalid date';
}

export function convertToTime(isoString) {
  // Create a new Date object from the ISO string
  const date = new Date(isoString);

  // Check if the date is valid
  if (!isValid(date)) {
    return 'Invalid date';
  }

  // Extract hours and minutes
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes to always be two digits
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  // Construct the time string
  return `${hours}:${formattedMinutes} ${ampm}`;
}

export function compareDates(date1, date2) {
  // Create Date objects from the input strings
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Check if both dates are valid
  if (!isValid(d1) || !isValid(d2)) {
    return 'Invalid date';
  }

  // Compare the dates
  if (d1 < d2) {
    return "P"; // Past
  } else if (d1 > d2) {
    return "F"; // Future
  } else {
    return "E"; // Equal
  }
}


export function shouldStartExam(examDateTime, timeGapMinutes = 10) {
  const now = new Date(); // Current date and time
  const examTime = new Date(examDateTime); // Convert examDateTime to Date object if it isn't one

  // Calculate the difference in milliseconds
  const timeDifference = examTime - now;

  // Convert the time gap from minutes to milliseconds
  const timeGapMilliseconds = timeGapMinutes * 60 * 1000;

  // Check if the current time is within the time gap before the exam starts
  return timeDifference <= timeGapMilliseconds && timeDifference > 0;
}