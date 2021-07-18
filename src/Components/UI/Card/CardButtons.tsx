import { useContext, useState } from 'react';
import Modal from 'react-modal';
import { ViewContext } from '../../../Context/viewContext';
import {
  ViewTypes,
  VImageCarouselAttributes,
  VImageWithPaddingAttributes,
  VTextBoxAttributes,
} from '../../../Types/ViewTypes';
import styles from './styles/CardButtons.module.css';
import AddTextBoxModal from '../Modals/AddTextBoxModal';
import AddImageModal from '../Modals/AddImageModal';
import AddCarouselModal from '../Modals/AddCarouselModal';
import { modalContent, modalOverlay } from '../Modals/styles/modal';

export interface CardButtonsProps {
  view: ViewTypes;
}

const CardButtons: React.FC<CardButtonsProps> = ({ view }) => {
  const { isMarked, id, moduleType } = view;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dispatch } = useContext(ViewContext);

  const toggleMarked = () => {
    if (id) dispatch({ type: 'MARK_VIEW', payload: { id } });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.cardButtonContainer}>
      <Modal
        // appElement="#root"
        style={{ content: modalContent, overlay: modalOverlay }}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      >
        {moduleType === 'VTextBox' && (
          <AddTextBoxModal
            closeModal={closeModal}
            textBoxAttributes={view.attributes as VTextBoxAttributes}
            id={view.id}
            isEditing={true}
          />
        )}
        {moduleType === 'VImageWithPadding' && (
          <AddImageModal
            closeModal={closeModal}
            imageAttributes={view.attributes as VImageWithPaddingAttributes}
            id={view.id}
            isEditing={true}
          />
        )}
        {moduleType === 'VImageCarousel' && (
          <AddCarouselModal
            closeModal={closeModal}
            carouselAttributes={view.attributes as VImageCarouselAttributes}
            id={view.id}
            isEditing={true}
          />
        )}
      </Modal>
      <button
        onClick={toggleMarked}
        className={isMarked ? styles.cardButtonMarked : styles.cardButton}
      >
        Delete
      </button>
      <button onClick={openModal} className={styles.cardButton}>
        Edit
      </button>
    </div>
  );
};

// Modal.setAppElement('#root');

export default CardButtons;
