import styles from './styles/Card.module.css';

export interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <div className={styles.card} style={style}>
      {children}
    </div>
  );
};

export default Card;
