import axios from "axios";

export default async (req, res) => {
  try {
    const { id } = req.query;
    const response = await axios.get(`https://dummyjson.com/posts/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
};
