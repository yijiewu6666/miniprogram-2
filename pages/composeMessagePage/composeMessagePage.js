Page({
    data: {
      activity: {},
      message: '',
    },
    onLoad(options) {
      const activity = JSON.parse(options.activity); // Parse activity data passed from activitylistpage
      this.setData({ activity });
    },
    messageInput(event) {
      this.setData({ message: event.detail.value });
    },
    sendMessage() {
      const message = this.data.message;
      const activity = this.data.activity;
  
      // Implement logic to handle sending message to activity publisher
      // This example uses wx.showModal for demonstration
      wx.showModal({
        title: 'Send Message',
        content: `Are you sure you want to send the following message to the publisher of "${activity.name}"?\n\n${message}`,
        success(res) {
          if (res.confirm) {
            console.log(`Sending message: ${message} for activity: ${activity.name}`);
            // Replace with your actual logic for sending message (e.g., using a chat API)
            // You might need to interact with a server or database
  
            // Optionally navigate back to activitylistpage after sending (consider user flow)
            wx.navigateBack({
              delta: 1 // Go back one page (activitylistpage)
            });
          } else if (res.cancel) {
            console.log('User cancelled sending message');
          }
        },
      });
  
      // Clear message input after sending
      this.setData({ message: '' });
    },
  });