/**
 * Gets data from API and retuns the response.
 * @param  {[type]} api 	   Link to API
 * @return [type]             Returns data fetched from API
 */
export default Api = {
   getData(url) {
      return fetch(url).then((response) =>  response.json());
  	}
}
