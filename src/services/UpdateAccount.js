import axios from "axios";
export const updatedUser = async (username, email, password, id) => {
  const { data } = await axios.put(`/api/users/profile/${id}`, {
    username,
    email,
    password,
  });
  return data;
};
