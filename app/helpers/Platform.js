import { Platform } from 'react-native';

export function platform(os) {
   return  isPlatform = (Platform.OS === os) ? true : false;
}
