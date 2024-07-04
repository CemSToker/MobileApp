import axios from 'axios';

// Replace with your Imgur access token
const ACCESS_TOKEN = 'f1f2b3fa8e24d74cb5be90ec3a7a40cae4343899';

const fetchAccountImages = async () => {
  try {
    const response = await axios.get('https://api.imgur.com/3/account/me/images', {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    console.log('API Response:', response.data); // Add this line to check the response
    return response.data.data; // This will return the array of images
  } catch (error) {
    console.error('Error fetching images from Imgur:', error);
    return [];
  }
};

export default fetchAccountImages;
