import { StatusBar } from 'react-native';
import { platform } from './Platform';

export function statusBar(view) {
   switch (view) {
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
