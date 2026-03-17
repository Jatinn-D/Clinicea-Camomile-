// availabilityService.js

export const calculateAvailableSlots = (targetDate, bookedAppointments) => {
    const availableSlots = { morning: [], afternoon: [], evening: [] };
    
    // Split the YYYY-MM-DD string to avoid timezone "jumping"
    const [year, month, day] = targetDate.split('-').map(Number);
    
    // Create the start of the day in local time (Month is 0-indexed in JS)
    let currentSlot = new Date(year, month - 1, day, 9, 0, 0); 
    const closingTime = new Date(year, month - 1, day, 19, 0, 0);

    const now = new Date();
    // 30-minute buffer from "now"
    const bufferTime = new Date(now.getTime() + 30 * 60000);

    while (currentSlot < closingTime) {
        const slotEnd = new Date(currentSlot.getTime() + 30 * 60000);

        // Check against Clinicea appointments
        const isBookedInClinicea = bookedAppointments.some(appt => {
            const apptStart = new Date(appt.StartDateTime);
            const apptEnd = new Date(appt.EndDateTime);
            return (currentSlot < apptEnd && slotEnd > apptStart && appt.AppointmentStatus !== "Cancelled");
        });

        // Only show as available if it's in the future and not booked
        const isAvailable = !isBookedInClinicea && (currentSlot >= bufferTime);

        const timeString = currentSlot.toLocaleTimeString('en-GB', {
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false
        });

        const hour = currentSlot.getHours();
        const slotObject = { time: timeString, available: isAvailable };

        if (hour < 12) availableSlots.morning.push(slotObject);
        else if (hour >= 12 && hour < 16) availableSlots.afternoon.push(slotObject);
        else availableSlots.evening.push(slotObject);

        currentSlot = slotEnd;
    }
    return availableSlots;
};