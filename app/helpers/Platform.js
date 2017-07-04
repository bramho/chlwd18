import { Platform } from 'react-native';

/**
 * Returns boolean for matching OS check
 * @param  {String} os     Operating System to be checked
 * @return {Bool}    True if given OS matches users OS
 */
export function platform(os) {
   return  isPlatform = (Platform.OS === os) ? true : false;
}
