import axios from "axios";

const IMAGES_API_URL = "https://api.slingacademy.com/v1/sample-data/photos";

export const fetchImages = async ({ limit }: { limit: number }) => {
  try {
    const response = await axios.get(IMAGES_API_URL, {
      params: {
        limit,
      },
    });

    return response.data.photos;
  } catch (error) {
    console.error(error);
  }
};
