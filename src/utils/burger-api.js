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

export default getData;
