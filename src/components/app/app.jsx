import React from 'react';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

import ModalOverlay from '../modal-overlay/modal-overlay';

const App = ({ apiUrl }) => {
  const [dataState, setDataState] = React.useState({
    data: null,
    isLoading: true
  });

  React.useEffect(() => {
    const getResponseData = res => {
      if(res.ok) {
        return res.json();
      }
  
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }

    const getData = async () => {
      setDataState({ ...dataState, isLoading: true });
      const res = await fetch(apiUrl);
      const data = await getResponseData(res);

      if(data.success) {
        setDataState({ data: data.data, isLoading: false })
      } else {
        alert("Произошла ошибка! Перезагрузите страницу");
      }
    }

    getData();
  }, [apiUrl]);

  const [isOpened, setIsOpened] = React.useState(false);
  const modalComponent = React.useRef();

  const openModal = () => {
    setIsOpened(true);
  }

  const closeModal = () => {
    setIsOpened(false);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      {
        dataState.data && !dataState.isLoading &&
        <main className={styles.main}>
          <h2 className={styles.title}>Соберите бургер</h2>
          <BurgerIngredients data={dataState.data} openModal={openModal} modalComponent={modalComponent} />
          <BurgerConstructor data={dataState.data} openModal={openModal} modalComponent={modalComponent} />
        </main>
      }
      {
        isOpened && <ModalOverlay closeModal={closeModal} modalComponent={modalComponent} />
      }
    </div>
  );
};

export default App;