import AsyncStorage from "@react-native-async-storage/async-storage";

type STORAGE_KEY = "favorites";

export async function getFromStorage(key: STORAGE_KEY) {
  const item = await AsyncStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  }

  return null;
}

export async function setToStorage(key: STORAGE_KEY, newItem: any) {
  await AsyncStorage.setItem(key, JSON.stringify(newItem));
}
