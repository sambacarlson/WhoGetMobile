import AsyncStorage from '@react-native-async-storage/async-storage';

export function formattedDate(isoTimestamp: string): string {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date = new Date(isoTimestamp);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = monthsOfYear[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${dayOfWeek}, ${month} ${day}, ${hours}:${minutes}`;
}

export async function getItemLocalStorage(key: string) {
  let value: string | null = '';
  await AsyncStorage.getItem(key).then(val => (value = val));
  return JSON.parse(value);
}
export async function setItemLocalStorage(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
  return 0;
}
export async function removeItemLocalStorage(key: string) {
  await AsyncStorage.removeItem(key);
  return 0;
}
export async function clearLocalStorage() {
  await AsyncStorage.clear();
  return 0;
}

export function getTimeLeft(
  createdAt: string | Date,
  num: number,
  today = new Date(),
) {
  createdAt = new Date(createdAt);
  const numMilliseconds = num * 24 * 60 * 60 * 1000; // Convert num days to milliseconds
  const expiryTime = createdAt.getTime() + numMilliseconds; // Calculate the UNIX timestamp of the deadline
  const timeLeft = expiryTime - today.getTime(); // Calculate the time left in milliseconds

  if (timeLeft <= 0) {
    // If the deadline has passed, return zero for all time components
    return {days: 0, hours: 0, minutes: 0, seconds: 0};
  }

  // Convert the time left to days, hours, minutes, and seconds
  const daysLeft = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
  const hoursLeft = Math.floor((timeLeft / (60 * 60 * 1000)) % 24);
  const minutesLeft = Math.floor((timeLeft / (60 * 1000)) % 60);
  const secondsLeft = Math.floor((timeLeft / 1000) % 60);

  // Return an object containing the time left components
  return {
    days: daysLeft,
    hours: hoursLeft,
    minutes: minutesLeft,
    seconds: secondsLeft,
  };
}
