import { Linking } from 'react-native';

export function openLink(url) {
   Linking.canOpenURL(url).then(supported => {
      if (supported) {
         Linking.openURL(url);
      } else {
         console.error('Dont know how to open this url: ' + url);
      }
   });
}
