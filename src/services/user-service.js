import axios from "axios";
export const chatApi = (payload, token) => {
    return fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });
};


export const generateToken = async () => {
  const res = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/getToken`);
  return res.data.token;
};