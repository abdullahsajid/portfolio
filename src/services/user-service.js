export const chatApi = (payload) => {
    return fetch(`${process.env.REACT_APP_BACKEND_BASE_URL || "https://f3cee6b1c2a7.ngrok-free.app"}/chat`, {
      method: "POST",
      body: payload,
    });
};
