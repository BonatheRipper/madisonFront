import axios from "axios";
export const FetchAllProducts = async (
  pageNumber,
  selects,
  setCats,
  setTotalPages,
  setSortCat,
  sortCat,
  productsDispatch
) => {
  productsDispatch({ type: "FETCH_REQUEST" });
  try {
    const results = await axios.get(
      `/api/products/allproducts?page=${pageNumber}&searchbyCategoryName=${selects}`
    );
    setCats(results.data.categories[0].category);
    setTotalPages(results.data.totalPages);
    setSortCat({ ...sortCat, value: "Newest" });
    productsDispatch({
      type: "FETCH_SUCCESS",
      payload: results.data.products,
    });
  } catch (e) {
    productsDispatch({ type: "FETCH_FAIL", payload: e.message });
  }
};
