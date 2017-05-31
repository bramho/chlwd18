import { Alert } from 'react-native';

export default function Message(type='info',title, text,buttons=[{text: 'OK', onPress: () => console.log('OK Pressed!')}]) {
   switch (type) {
      case 'info':
         console.log(title+', '+text);
      break;
      case 'warning':
         console.log(title+', '+text);
      break;
      case 'error':
         console.log(title+', '+text);
      break;
      default:
         console.log(title+', '+text);
   }
   Alert.alert(
            title,
            text,
            buttons
          )
}
