Page({
    data: {
      trendingActivities: [
        // Example data structure
        { id: 1, name: 'Concert', location: 'Central Park', date: '2024-05-15' },
        { id: 2, name: 'Art Exhibit', location: 'Modern Art Museum', date: '2024-05-20' },
        // Add more items here...
      ]
    },
    onLoad: function(options) {
        const eventChannel = this.getOpenerEventChannel();
        // Listen for data sent from the previous page
        eventChannel.on('acceptDataFromOpeningPage', function(data) {
          console.log(data); // Log to see if data is received
          this.setData({
            trendingContent: data.data
          });
        });
      }
  });
  