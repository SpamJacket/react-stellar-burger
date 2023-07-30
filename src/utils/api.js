import { BASE_URL } from "./constants.js";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }

  return Promise.reject(`Ответ не success: ${res.message}`);
};

const request = async (endpoint, options) => {
  return await fetch(BASE_URL + endpoint, options)
    .then(checkResponse)
    .then(checkSuccess);
};

const sendOrderData = async (endpoint, setOrder, ingredients) => {
  setOrder((prevState) => ({
    ...prevState,
    isLoading: true,
  }));
  return await request(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });
};

export default request;
export { sendOrderData };
