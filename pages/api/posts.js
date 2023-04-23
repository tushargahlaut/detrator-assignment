import axios from "axios";

export default async (req, res) => {
  try {
    const response = await axios.get(`https://dummyjson.com/posts?limit=100`);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
};
