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
 * Sets favorite event in the local storage of the device
 * @param {int}   itemId   Id of item to be set in favorites
 */
export function setFavorite(itemId) {
   var savedEvents = [];

   checkStorageKey('savedEvents').then((isValidKey) => {

      if (isValidKey) {
         console.log("Saved Events does exist");
         getStorageData('savedEvents').then((data) => {
            savedEvents = JSON.parse(data);

            // Checks if itemId already exists within the savedEvents
            if (savedEvents.indexOf(itemId) === -1) {
               savedEvents.push(itemId);
               setStorageData('savedEvents', savedEvents);
            }

         });
      } else {
         savedEvents.push(itemId);
         setStorageData('savedEvents', savedEvents);
      }
   });
}

export const checkFavorite = async (itemId) => {

   returnValue = false;

   checkStorageKey('savedEvents').then((isValidKey) => {

      if (isValidKey) {
         console.log("Saved Events does exist");
         getStorageData('savedEvents').then((data) => {
            savedEvents = JSON.parse(data);

            // Checks if itemId already exists within the savedEvents
            if (savedEvents.indexOf(itemId) === -1) {
               returnValue = true;
               console.log('Return value in if ' + returnValue);
            }

            console.log('Return value after if ' + returnValue);

         });
      }
   });

   return returnValue;

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

/**
 * Removes item from storage for a given key
 * @param  {string}     key      Storage key
 */
export function removeItemFromStorage(key) {
   AsyncStorage.removeItem(key)
      .then(json => console.log(key + ' is verwijderd'))
      .catch(error => console.error('error'));
}
