import styles from './styles/Footer.module.css';

// Component to render the footer
const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>Created for Venn Apps Frontend Challenge by Gabor Pfalzer</p>
      <a href="https://pfalzer.dev">pfalzer.dev</a>
    </footer>
  );
};

export default Footer;
