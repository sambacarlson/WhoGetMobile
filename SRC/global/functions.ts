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
