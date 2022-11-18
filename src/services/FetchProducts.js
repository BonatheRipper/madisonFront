import axios from "axios";
export const FetchProducts = async (
  productsDispatch,
  setLoadingScreen,
  loadingScreen,
  setCats,
  querySearch
) => {
  productsDispatch({ type: "FETCH_REQUEST" });
  try {
    const results = await axios.get(
      `/api/products?page=6&productsQuery=${querySearch}`
    );
    productsDispatch({
      type: "FETCH_SUCCESS",
      payload: results.data.products,
    });
    setLoadingScreen(false);
    setCats(results.data.categories[0].category.sort());
  } catch (e) {
    productsDispatch({ type: "FETCH_FAIL", payload: e.message });
  }
};
