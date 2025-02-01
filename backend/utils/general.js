export const cleanEvents = (events) => {
  return events.filter(event => {
    return event.title != "N/A" && event.location != "N/A" && event.date != "N/A" && event.image != "N/A"
  }).map(event => {
    return {
      ...event,
      date: getTimestamp(event.date)
    }
  })
}

const getTimestamp = (dateStr) => {
  const currentYear = new Date().getFullYear();
  let dateObj;
  
  // Handle "FRI, 14 FEB" format
  if (dateStr.match(/^[A-Za-z]{3},\s+\d{1,2}\s+[A-Za-z]{3}$/)) {
    let [day, dateNum, month] = dateStr.split(/,?\s+/);
    dateObj = new Date(`${month} ${dateNum} ${currentYear}`);
  }
  // Handle "Sat, May 3 • 2:00 PM" format
  else if (dateStr.includes('•')) {
    let [datePart, timePart] = dateStr.split('•').map(part => part.trim());
    let [day, month, dateNum] = datePart.trim().split(/,?\s+/);
    
    // Parse time if available
    if (timePart) {
      let [time, period] = timePart.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      
      // Convert to 24-hour format if PM
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      
      dateObj = new Date(`${month} ${dateNum} ${currentYear} ${hours}:${minutes}:00`);
    } else {
      dateObj = new Date(`${month} ${dateNum} ${currentYear}`);
    }
  }
  else {
    return null;
  }
  
  return dateObj.getTime();
}