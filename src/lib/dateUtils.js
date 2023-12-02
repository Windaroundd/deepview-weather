export const convertDate = (timezone, dt, dateFormat = 'short') => {
  const timeZoneOffsetInSeconds = timezone;
  const timestamp = dt;

  // Convert UTC timestamp to milliseconds
  const utcMilliseconds = timestamp * 1000;

  // Create a Date object with the UTC time
  const utcDate = new Date(utcMilliseconds);

  // Apply the time zone offset
  const userFriendlyDate = new Date(
    utcDate.getTime() + timeZoneOffsetInSeconds * 1000,
  );

  // Format the date as a string in a user-friendly way
  let options;
  if (dateFormat === 'short') {
    options = {
      timeZone: 'UTC',
      weekday: 'short',
    };
  } else if (dateFormat === 'long') {
    options = {
      timeZone: 'UTC',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  }

  const userFriendlyDateString = userFriendlyDate.toLocaleString(
    'en-US',
    options,
  );

  return userFriendlyDateString;
};
