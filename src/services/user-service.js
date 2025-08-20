export const chatApi = (payload,token) => {
    return fetch(`${process.env.REACT_APP_BACKEND_BASE_URL || "https://9e8ede66301e.ngrok-free.app"}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: payload,
    });
};


export const generateToken = () => {
    return fetch(`${process.env.REACT_APP_BACKEND_BASE_URL || "https://9e8ede66301e.ngrok-free.app"}/auth/getToken`, {
      method: "GET",
    });
};