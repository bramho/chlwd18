import { AsyncStorage } from 'react-native';

/**
 * Stores data for specific key
 * @param {key}    string  Identifier for data storage
 * @param {data}   JSON    Data to be stored
 */
export function setStorageData(key, data) {
   try {
      console.log('storing data with key ' + key + ' and data ' + data);

      AsyncStorage.setItem(key, JSON.stringify(data));
   } catch (error) {
      console.error('Error storing data ' + error);
   }
}

/**
 * Gets data for a specific key
 * @param  {key}  string   Identifier for data storage
 * @return {value}         Data
 */
export const getStorageData = async (key) => {
   var returnValue;

   try {

      await AsyncStorage.getItem(key).then((value) => {
         // console.log(value);

         returnValue = value;
      });

   } catch (error) {
      console.error('Error fetching storage data: ' + error);
   }

   return returnValue;
}

/**
 * Checks if key exists
 * @param  {key}  string    Identifier for data storage
 * @return {value} boolean  
 */
export const checkStorageKey = async (key) => {
   var returnValue = false;

   try {

      await AsyncStorage.getItem(key).then((value) => {
         // console.log(value);
         returnValue = (value !== null) ? true : false;
      });

   } catch (error) {
      console.error('Error checking storage key: ' + error);
   }

   return returnValue;
}
