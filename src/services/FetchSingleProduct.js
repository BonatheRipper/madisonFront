import axios from "axios";
export const FetchSingleProduct = async (
  id,
  setSingleProduct,
  singleProduct,
  setCurrentImg
) => {
  try {
    setSingleProduct(false);
    const results = await axios.get(`/api/products/${id}`);
    setSingleProduct(results.data);
    setCurrentImg(singleProduct.image.url);
  } catch (e) {
    console.log(e.response.data.error);
    setSingleProduct(false);
  }
};
