import { StatusBar } from 'react-native';
import { platform } from './Platform';

/**
 * Set the statusbar background and color
 * @param  {string} mode  statusBar modes
 */
export function statusBar(mode) {
   switch (mode) {
      case 'translucent':
         if(platform('android')) {
            StatusBar.setTranslucent(true)
            StatusBar.setBackgroundColor('transparent', true)

         }
      break;
      case 'transparent':
         StatusBar.setBarStyle('light-content', true);
      break;
      default:
         StatusBar.setBarStyle('dark-content', true);
   }
}
