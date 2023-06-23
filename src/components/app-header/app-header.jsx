import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <button className={styles.button}>
          <BurgerIcon type='primary' /><p className={styles.link}>Конструктор</p>
        </button>
        <button className={styles.button}>
          <ListIcon type='secondary' /><p className={styles.inactiveLink}>Лента заказов</p>
        </button>
      </nav>
      <Logo />
      <nav className={styles.navBar}>
        <button className={styles.button}>
          <ProfileIcon type='secondary' /><p className={styles.inactiveLink}>Личный кабинет</p>
        </button>
      </nav>
    </header>
  )
}

export default AppHeader;