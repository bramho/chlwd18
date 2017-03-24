/**
 * Gets data from API and retuns the response.
 * @param  {[type]} apiLink   Link to API
 * @return [type]             Returns data fetched from API
 */
export function getData(apiLink) {
   fetch(apiLink).then((response) => response.json())
      .then((responseJson) => {
         return responseJson;
      })
      .catch((error) => {
         return console.error(error);
      });
}
