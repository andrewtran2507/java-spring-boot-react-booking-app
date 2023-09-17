import moment from 'moment';

export const daysBetweenTwoDates = (start: any, end: any) => {
  // Define the two dates
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Calculate the time difference in milliseconds
  const timeDiff = endDate.getTime() - startDate.getTime();

  // Convert the time difference from milliseconds to days
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
};

export const getDaysOfWeek = (startDate: any, endDate: any) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayNames = [];

  // Convert the start and end dates to JavaScript Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Loop through each date between the start and end dates
  const current = start;
  while (current <= end) {
    // Get the day of the week for the current date
    const dayOfWeek = daysOfWeek[current.getDay()];

    // Add the day name to the array
    dayNames.push(dayOfWeek);

    // Move to the next day
    current.setDate(current.getDate() + 1);
  }

  return dayNames;
};

export const filteredSlots = (slotData: any, selectedDate: any) => {
  const filter = slotData.filter((slot: any) => {
    const fromDate = new Date(slot.from_date);
    const endDate = new Date(slot.end_date);
    const selectedDateObj = new Date(selectedDate);
    if (selectedDateObj >= fromDate && selectedDateObj <= endDate) {
      return selectedDateObj >= fromDate && selectedDateObj <= endDate;
    } else {
    }
  });
  return filter;
};

export const getTimesRange = (start_time: string, end_time: string, step: number) => {
  let startTime = moment(start_time, 'HH:mm');
  const endTime = moment(end_time, 'HH:mm');

  const timeRange = [];
  while (startTime < endTime) {
    const data = startTime.add(step, 'minutes').format('HH:mm');
    timeRange.push(data);
    startTime = moment(data, 'HH:mm');
  }
  return [start_time, ...timeRange];
};

export const formatDate = (date: any) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const options_weekday = { weekday: 'long' };

  const pickedDate = date.$d.toLocaleDateString('en-GB', options);
  const pickeWeekDay = date.$d.toLocaleDateString('en-US', options_weekday);
  const formattedDate = date.$d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const hourAMPM = date.$d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const hour24 = date.$d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const givenDate = new Date(date);
  const dayOfMonth = givenDate.getDate();
  // var updatedDate = dayOfMonth.toString();
  return {
    date: pickedDate, //format DD-MM-YYYY
    dateFormat: formattedDate,
    weekday: pickeWeekDay, //format Monday
    dayOfMonth: dayOfMonth, //format 20
    hour: hour24, //format 12hour AM PM
    hour24,
  };
};
