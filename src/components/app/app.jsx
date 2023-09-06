import { Routes, Route } from "react-router-dom";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header.jsx";
import Home from "../../pages/home/home.jsx";

const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
