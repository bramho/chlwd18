import I18n from 'react-native-i18n';

I18n.fallbacks = true;

I18n.translations = {
   'en': {
      greeting: 'Hi!'
   },
   'nl-NL': {
      greeting: 'Hallo!'
   }
}

export function getTranslation(translationType) {
   return I18n.t(translationType);
}
