import styles from './styles/Card.module.css';
import CardButtons from './CardButtons';
import { ViewTypes } from '../../../Types/ViewTypes';

export interface CardProps {
  children: React.ReactNode;
  view: ViewTypes;
  style?: React.CSSProperties;
}

// Tight coupleing between Card and its children through the view prop in not ideal.
// With more time available, I would rethink where CardButtons live.
const Card: React.FC<CardProps> = ({ children, style, view }) => {
  return (
    <div className={styles.card} style={style} data-testid="card">
      {children}
      <CardButtons view={view} />
    </div>
  );
};

export default Card;
