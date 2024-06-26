Page({
    data: {
      name: '',
      school: '',
      interest: '',
      description: '',
      images: [], // Array to store uploaded image paths
    },
    nameInput(event) {
      this.setData({ name: event.detail.value });
    },
    schoolInput(event) {
      this.setData({ school: event.detail.value });
    },
    interestInput(event) {
      this.setData({ interest: event.detail.value });
    },
    descriptionInput(event) {
      this.setData({ description: event.detail.value });
    },
    chooseImage() {
        wx.chooseImage({
          count: 3, // Allow selecting up to 3 images
          sizeType: ['compressed'], // Use compressed images for efficiency
          success: (res) => { // Changed to arrow function to preserve context of 'this'
            const tempFilePaths = res.tempFilePaths;
            const newImages = this.data.images.concat(tempFilePaths); // Combine new images with existing ones
            this.setData({ images: newImages });
          },
        });
      },
    removeImage(event) {
      const index = event.currentTarget.dataset.index;
      const images = this.data.images;
      images.splice(index, 1); // Remove the image at the specified index
      this.setData({ images });
    },
    submitInfo() {
    const { name, school, interest, description, images } = this.data;

    // Update local storage with new information
    wx.setStorageSync('userInfo', { name, school, interest, description, images });

    // Show success message
    wx.showToast({
      title: 'Profile Updated',
      icon: 'success',
      duration: 2000,
      complete: () => {
        // Navigate back after the toast disappears
        wx.navigateBack({
          delta: 1 // Adjust the delta according to your app's navigation stack
        });
      }
    });
}
  
      // Option 2: Sending data to a server (for persistent storage)
      
    })