import React from 'react';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

const App = ({ apiUrl }) => {
  const [state, setState] = React.useState({
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
      setState({ ...state, isLoading: true });
      const res = await fetch(apiUrl);
      const data = await getResponseData(res);

      if(data.success) {
        setState({ data: data.data, isLoading: false })
      } else {
        alert("Произошла ошибка! Перезагрузите страницу");
      }
    }

    getData();
  }, [apiUrl]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {
        state.data && !state.isLoading &&
        <main className={styles.main}>
          <h2 className={styles.title}>Соберите бургер</h2>
          <BurgerIngredients data={state.data} />
          <BurgerConstructor data={state.data} />
        </main>
      }
    </div>
  );
}

export default App;