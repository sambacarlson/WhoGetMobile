import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @param isoTimestamp {string} iso timestamp as string
 * @returns {string} more readable date
 */
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

/**
 * retrieves json-parsed object from local storage
 * @param key {string} key of item to retrieve
 * @returns {object}
 */
export async function getItemLocalStorage(key: string) {
  let value: string | null = '';
  await AsyncStorage.getItem(key).then(val => (value = val));
  return JSON.parse(value);
}
/**
 * Stringifies and dds a new item to local storage
 * @param key {string}
 * @param value {string} data to store
 * @returns {0}
 */
export async function setItemLocalStorage(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
  return 0;
}
/**
 * Removes/deletes and item from local storage
 * @param key {string}
 * @returns {0}
 */
export async function removeItemLocalStorage(key: string) {
  await AsyncStorage.removeItem(key);
  return 0;
}
/**
 * Clears local storage
 * @returns {0}
 */
export async function clearLocalStorage() {
  await AsyncStorage.clear();
  return 0;
}

/**
 * takes a date and a number (of days) as parameters and returns time left from current date, when given number is added to given date. takes an optinal 'today' date parameter.
 * @param createdAt {date} original date. could be date or stringified date
 * @param num {number} number of days to expiry from createdAt
 * @param today {date} optional current date.
 * @returns {{daysLeft: number, hoursLeft: number, minutesLeft: number, secondsLeft: number}} object representing number of days, hours, minutes, seconds left
 */
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

/**
/**
 * makes an axios request.
 * @param url {string} relative uri endpoint. provide only relative uri
 * @param method {http.HttpMethod} http method
 * @param data {object} (Optional depending on method) data
 * @returns {Promise}
 *-/
export async function axiosRequest(
  url: string,
  method: httpMethodTypes,
  data = {},
) {
  try {
    const response = await axios({
      method: method,
      url: BASE_URL + '/' + url,
      data: data,
    });
    return response.data;
  } catch (error: any) {
    throw error.message;
  }
}
//*/

/**
 * logs a message
 * @param message {any[]} message to log
 * @returns {void}
 */
export function logMessage(...message: any): void {
  if (process.env.NODE_ENV !== 'production') {
    console.log('log--->', ...message);
  }
  return;
}
