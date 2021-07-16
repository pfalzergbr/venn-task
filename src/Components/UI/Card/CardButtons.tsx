import { useContext } from 'react';
import { ViewContext } from '../../../Context/viewContext';
import styles from './styles/CardButtons.module.css';

export interface CardButtonsProps {
  id: string;
  isMarked: boolean | undefined;
}

const CardButtons: React.FC<CardButtonsProps> = ({ isMarked, id }) => {
  const { dispatch } = useContext(ViewContext);

  const toggleMarked = () => {
    dispatch({ type: 'MARK_VIEW', payload: { id } });
  };

  return (
    <div className={styles.cardButtonContainer}>
      <button
        onClick={toggleMarked}
        className={isMarked ? styles.cardButtonMarked : styles.cardButton}
      >
        Mark
      </button>
      <button>Edit</button>
    </div>
  );
};

export default CardButtons;
