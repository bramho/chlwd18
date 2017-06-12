/**
 * Filter function for filtering user input in the search bar for events and news
 * @param  {string} searchText   User typed character/string
 * @param  {JSON} data           JSON object of events/news items
 * @param  {string} dataType     Either events of news, depending on data to be filtered
 * @return {array}  results      Array of search results
 */
export function filterData(searchText, data, dataType) {
   let text = searchText.toLowerCase();

      var results = [];
      var i;
      var count = 0;

      /**
       * Adds one to count for every object in JSON string
       */
      for (i in data) {
         if (data.hasOwnProperty(i)) {
            count++;
         }
      }

      /**
       * Filters data based on dataType (events or news)
       */
      switch (dataType) {
         case 'events':

            for (var i=0; i < count; i++) {

              var stateName = data[i].title.toLowerCase();
              if(stateName.search(text) !== -1){
                  results.push({
                       title : data[i].title,
                       ticket_prices: data[i].ticket_prices,
                       summary: data[i].summary,
                       thumbnail: data[i].thumbnail,
                   });
              }
            }

            break;

         case 'news':
            // Add filter for news items HERE

            console.log('NEWS ITEMS');
            break;
      }

      return results;
}
