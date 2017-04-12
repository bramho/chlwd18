import { Platform } from 'react-native';

export function platform(os) {
   var isPlatform = (Platform.OS === os) ? true : false;
   return isPlatform;
}
