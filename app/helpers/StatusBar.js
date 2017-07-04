import { StatusBar } from 'react-native';
import { platform } from './Platform';

/**
 * Sets statusbar color
 * @param  {Object} view      Current view
 */
export function statusBar(view) {
   switch (view) {
      case 'translucent':
         if(platform('android')) {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('transparent', true);
            StatusBar.setBarStyle('light-content', true);
         }
      break;
      case 'transparent':
         StatusBar.setBarStyle('dark-content', true);

      break;
      default:
         StatusBar.setBarStyle('light-content', true);

   }
}
