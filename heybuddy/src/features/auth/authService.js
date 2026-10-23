
import axios from "axios";

const API_URL = "/api/auth";

const api = axios.create({
  withCredentials: true,
});

// We can also write it as so we do not need to define axios.create

// const register = async (formData) => {
//   const response = await axios.post(`${API_URL}/register`, formData, { withCredentials: true });
//   return response.data;
// };

const register = async (formData) => {
  const response = await api.post(`${API_URL}/register`, formData);
  return response.data;
};

const login = async (formData) => {
  const response = await api.post(`${API_URL}/login`, formData);
  return response.data;
};

const logout = async () => {
  const response = await api.post(`${API_URL}/logout`);
  return response.data;
};

const refresh = async () => {
  const response = await api.post(`${API_URL}/refresh`);
  return response.data;
};

const getCurrentUser = async () => {
  const response = await api.get(`${API_URL}/me`);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  refresh,
  getCurrentUser
};

export default authService;



// import axios from "axios"

// const API_URL = "/api/auth"

// const register = async (formData) => {
//     const response = await axios.post(API_URL + '/register', formData)
//     localStorage.setItem('user', JSON.stringify(response.data))
//     return response.data
// }

// const login = async (formData) => {
//     const response = await axios.post(API_URL + '/login', formData)
//     localStorage.setItem('user', JSON.stringify(response.data))
//     return response.data
// }

// const authService = { register, login }

// export default authService