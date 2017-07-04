import { Share } from 'react-native';

/**
 * Opens share widget for the users device
 * @param  {String} title        Title for share message
 * @param  {String} url          Url for share message
 * @param  {String} message      Message text for share message
 */
export function shareItem(title, url, message) {
   Share.share({
      title: title,
      url: url,
      message: message
   })
   .then(console.log('Item with title: ' + title + ' has been shared.'))
   .catch((error) => console.error('Error sharing item: ' + error));
}
