import { AsyncStorage } from 'react-native';
import API from './Api';

/**
 * Stores data for specific key
 * @param {key}    string  Identifier for data storage
 * @param {data}   JSON    Data to be stored
 */
export function setStorageData(key, data) {
   try {
      console.log('Storing data: ' + data + ' for key: ' + key);

      AsyncStorage.setItem(key, JSON.stringify(data));
   } catch (error) {
      console.error('Error storing data ' + error);
   }
}

/**
 * Sets id of each favorite in an Array
 * @param  {Object}  favorites      List of favorites
 * @return {Array}                  Array of favorite ids
 */
export const setFavoriteIds = async (favorites) => {
   var favoritesIds = [];

   for (var i = 0; i < favorites.length; i++) {
      favoritesIds.push(favorites[i].id);
   }

   return favoritesIds;
}

/**
 * Sets favorite event in the local storage of the device
 * @param {int}   itemId   Id of item to be set in favorites
 */
export const setFavorite = async (item, addToFavorites, savedEventsIds) => {
   var savedEvents = [];

   checkStorageKey('savedEvents').then((isValidKey) => {

      if (isValidKey) {

         getStorageData('savedEvents').then((data) => {
            savedEvents = JSON.parse(data);

            // Checks if itemId already exists within the savedEvents
            index = savedEventsIds.indexOf(item.id);

            if (index === -1) {
               console.log('Adding item with id: ' + item.id);
               savedEvents.push(item);
               savedEventsIds.push(item.id);
               setStorageData('savedEvents', savedEvents);

               return savedEventsIds;

            } else {
               console.log('Removing item with id: ' + item.id);
               savedEvents.splice(index, 1);
               savedEventsIds.splice(index, 1);
               setStorageData('savedEvents', savedEvents);

               return savedEventsIds;
            }

         });
      } else {
         savedEvents.push(itemId);
         setStorageData('savedEvents', savedEvents);
      }
   });
}

/**
 * Adds categories to local storage
 */
export const setCategoriesData = async () => {
   const CATEGORIESURL = 'https://www.vanplan.nl/viewapi/v1/category/2018/';

   checkStorageKey('categoriesData').then((isValidKey) => {

      if (!isValidKey) {
         API.getData(CATEGORIESURL)
            .then((data) => {
               console.log(data.results);

               setStorageData('categoriesData', data.results);
            })
      }
   });
}

/**
 * Checks if favorite data exists in cache
 * @param  {int}     itemId   Id of favorite item
 * @return {bool}
 */
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
            }

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
