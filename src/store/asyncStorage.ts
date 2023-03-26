import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string | object) => {
    try {
        if (typeof value !== 'string') value = JSON.stringify(value)
        await AsyncStorage.setItem(key, value)
        return 'storing complete'
    } catch (e: any) {
        console.log(e.message);
    }
}

export const getData = async (key: string) => {
    try {
        let value = <string>await AsyncStorage.getItem(key)
        try {
            value = JSON.parse(value)
        } catch (e) {
            return value
        }
        return value
    } catch (e: any) {
        console.log(e.message);
    }
}

export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e: any) {
        console.log(e.message);
    }
}