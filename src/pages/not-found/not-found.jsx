import styles from "./not-found.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ууупс!</h2>
      <h3 className={styles.subtitle}>404 Страница не найдена</h3>
      <img
        className={styles.image}
        src="https://thenounproject.com/api/private/icons/976904/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23f2f2f3&foregroundOpacity=1&imageFormat=png&rotation=0"
        alt="Грустный бургер"
      />
    </div>
  );
};

export default NotFound;
