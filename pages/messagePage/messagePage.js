Page({
    data: {
      activity: {},
      message: '',
      publisherId: '',
    },
    onLoad(options) {
      const activity = JSON.parse(options.activity); // Parse activity data passed from activitylistpage
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on('receiveActivity', (activityData) => {
          
        this.setData({ activity: activityData, publisherId: activityData.publisherId },); // Access publisher ID from activity data
      });
    },
    messageInput(event) {
      this.setData({ message: event.detail.value });
    },
    sendMessage() {
      const message = this.data.message;
      const activity = this.data.activity;
      const publisherId = this.data.publisherId;
  
      // Replace with your actual logic to get the current user ID
      const currentUserId = wx.getStorageSync('userId'); // Example: Get user ID from storage
  
      // Check if current user ID matches publisher ID
      if (currentUserId === publisherId) {
        // Implement logic to save message (replace with your logic)
        // This example uses wx.setStorageSync for demonstration (replace with your preferred method)
        const messages = wx.getStorageSync('messages') || []; // Retrieve existing messages (if any)
        messages.push({ activityId: activity.id, message }); // Add new message with activity ID
        wx.setStorageSync('messages', messages); // Save updated messages
  
        wx.showModal({
          title: 'Success',
          content: 'Message saved successfully!',
          success(res) {
            if (res.confirm) {
              // Optionally navigate back to activitylistpage after successful save
              wx.navigateBack({
                delta: 1, // Go back one page (might be activitylistpage)
              });
            }
          },
        });
      } else {
        wx.showToast({
          title: 'Error: Cannot send message for this activity',
          icon: 'none',
        });
      }
  
      // Clear message input after saving/failing
      this.setData({ message: '' });
    },
  });
  