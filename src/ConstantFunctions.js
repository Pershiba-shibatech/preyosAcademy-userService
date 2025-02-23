export const getAllDatesInMonth = (year, monthName, dayOfWeek) =>{
   
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    
    let monthIndex = monthNames.indexOf(monthName);
    let dayIndex = dayNames.indexOf(dayOfWeek);
  
    let dates = [];
    let date = new Date(Date.UTC(year, monthIndex, 1));
    let today = new Date();  // Current date

    // Loop until the month changes
    while (date.getUTCMonth() === monthIndex) {
        if (date.getUTCDay() === dayIndex) {
            let formattedDate = date.toISOString().slice(0, 10);

            // Compare date with today, only add future or present dates
            if (date >= today) {
                dates.push(formattedDate);
            }
        }
        date.setUTCDate(date.getUTCDate() + 1);
    }

    return dates;
}


