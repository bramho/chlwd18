import { Share } from 'react-native';

export function shareItem(title, url, message) {
   Share.share({
      title: title,
      url: url,
      message: message
   })
   .then(console.log('Item with title: ' + title + ' has been shared.'))
   .catch((error) => console.error('Error sharing item: ' + error));
}
