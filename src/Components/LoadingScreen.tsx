import styles from './styles/LoadingScreen.module.css';

const LoadingScreen: React.FC = () => {
  return (
    <div className={styles.loadingScreen}>
      <p className={styles.loadingMessage}>Loading</p>
    </div>
  );
};

export default LoadingScreen;
