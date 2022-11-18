import axios from "axios";
export const getUser = async (email, password) => {
  const { data } = await axios.post(`api/users/login`, {
    email,
    password,
  });
  return data;
};
