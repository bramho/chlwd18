import { Linking } from 'react-native';

/**
 * Opens link in native browser.
 * @param  {String} url    Url of webpage
 */
export function openLink(url) {
   Linking.canOpenURL(url).then(supported => {
      if (supported) {
         Linking.openURL(url);
      } else {
         console.error('Dont know how to open this url: ' + url);
      }
   });
}
