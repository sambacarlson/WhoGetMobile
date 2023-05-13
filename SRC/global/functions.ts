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

export async function getUid(key = 'uid') {
  let value: string | null = '';
  await AsyncStorage.getItem(key).then(val => (value = val));
  return value;
}
export async function setUid(key = 'uid', value: string) {
  await AsyncStorage.setItem(key, value);
  return 0;
}
export async function clearLocalStorage() {
  await AsyncStorage.clear();
  return 0;
}
