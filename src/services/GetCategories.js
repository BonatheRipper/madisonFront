import axios from "axios";
export const GetCategories = async (setCats) => {
  try {
    const results = await axios.get(`/api/products/allproducts`);
    setCats(results.data.categories[0].category);
  } catch (e) {}
};
