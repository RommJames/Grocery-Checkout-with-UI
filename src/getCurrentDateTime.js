export function getCurrentDateTime(){
    // get current date and time
    const currentDate = new Date();

    // Define arrays for month names and day suffixes
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const suffixes = ["th", "st", "nd", "rd"];

    // Get individual components of the date
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // Month is 0-based (0 = January, 11 = December)
    const day = currentDate.getDate();
    const daySuffix = (day % 10 <= 3 && (day < 10 || day > 20)) ? suffixes[day % 10] : suffixes[0]; // Determine suffix for the day

    // Get the time in 12-hour format with AM/PM
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // Format the date and time
    const formattedDate = `${monthNames[month]} ${day < 10 ? '0' + day : day}${daySuffix}, ${year}`;
    const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;

    return [formattedDate, formattedTime]
}