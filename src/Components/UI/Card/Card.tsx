import styles from './styles/Card.module.css';
import CardButtons from './CardButtons';
import { ViewTypes } from '../../../Types/ViewTypes';

export interface CardProps {
  children: React.ReactNode;
  view: ViewTypes;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, style, view }) => {
  return (
    <div className={styles.card} style={style}>
      {children}
      <CardButtons view={view} />
    </div>
  );
};

export default Card;
