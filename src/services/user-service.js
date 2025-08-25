export const chatApi = (payload,token) => {
    return fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: payload,
    });
};


export const generateToken = () => {
    return fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/getToken`, {
      method: "GET",
    });
};