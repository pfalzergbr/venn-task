import styles from './styles/Card.module.css';
import CardButtons from './CardButtons';

export interface CardProps {
  children: React.ReactNode;
  id: string;
  isMarked: boolean | undefined;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, style, id, isMarked }) => {
  return (
    <div className={styles.card} style={style}>
      {children}
      <CardButtons id={id} isMarked={isMarked} />
    </div>
  );
};

export default Card;
