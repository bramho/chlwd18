import { StatusBar } from 'react-native';
import { Platform } from './Platform';

export function StatusBar(view) {
   switch (view) {
      case 'translucent':
         if(platform('android')) {
            return StatusBar.setTranslucent(true)
         }
      break;
      case 'transparent':
         if(platform('android')) {
            return StatusBar.setTranslucent(true)
         }
         if(platform('IOS')) {
            return StatusBar.setBarStyle('light-content', true);
         }
      break;
      default:
         if(platform('android')) {
            return StatusBar.setBackgroundColor('#b2b2b2', true)
         }
   }
}
