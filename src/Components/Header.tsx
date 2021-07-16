import styles from './styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.title}>
      <h1>The View List</h1>
      <h2>Render those views as you please!</h2>
    </header>
  );
};

export default Header;
