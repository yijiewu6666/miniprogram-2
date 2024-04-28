Page({
    data: {
      query: {}, // Holds the search query parameters
      results: [] // Holds the search results
    },
    onLoad: function(options) {
      // Check if all parameters are passed; initialize with defaults if not
      const safeOptions = {
        city: options.city || 'Unknown City',
        date: options.date || 'Unknown Date',
        people: options.people || 'Unknown Number',
        type: options.type || 'Unknown Type'
      };
  
      // Set the query data
      this.setData({
        query: safeOptions
      });
  
      // Fetch results based on the query
      this.fetchResults();
    },
    fetchResults: function() {
      // Simulating fetching data based on the query
      // In a real app, replace this with an API call
      this.setData({
        results: [
          { name: 'Activity 1', description: `Fun activity in ${this.data.query.city}` },
          { name: 'Activity 2', description: `Exciting event on ${this.data.query.date}` }
        ]
      });
    }
  });
  