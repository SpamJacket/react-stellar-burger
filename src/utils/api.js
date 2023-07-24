const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
};

const getData = async (url, setData) => {
  setData((prevState) => ({ ...prevState, isLoading: true }));
  const res = await fetch(url);
  const data = await getResponseData(res);

  if (data.success) {
    setData({ data: data.data, isLoading: false });
  } else {
    alert("Произошла ошибка! Перезагрузите страницу");
  }
};

const sendOrderData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return getResponseData(res);
};

export default getData;
export { sendOrderData };
