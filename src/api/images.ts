import axios from "axios";

const IMAGES_URL = "https://api.slingacademy.com/v1/sample-data/photos";

export const fetchImages = async (params: {
  limit: number;
  offset: number;
}) => {
  try {
    const response = await axios.get(IMAGES_URL, { params });

    return response.data.photos;
  } catch (error) {
    console.error("Error fetching photos:", error);
  }
};
