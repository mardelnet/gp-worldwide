export function formatDate(dateString) {
  const date = new Date(dateString);

  // Format the date in a more readable way
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    // hour: 'numeric', 
    // minute: 'numeric', 
    // second: 'numeric',
    // hour12: true
  };

  return date.toLocaleString('en-US', options);
}

export function convertDates(date) {
    const today = new Date();
  
    if (date === "day") {
      today.setDate(today.getDate() - 1);
    } else if (date === "week") {
      today.setDate(today.getDate() - 7);
    } else if (date === "month") {
      today.setDate(today.getDate() - 30);
    } else {
      today.setDate(today.getDate() - 365);
    }
  
    // Format the date to the desired format "YYYY-MM-DDT23:59:59"
    const formattedDate = today.toISOString().split("T")[0] + "T23:59:59";
  
    return formattedDate;
}