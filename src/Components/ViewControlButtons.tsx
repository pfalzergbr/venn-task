import { useContext, useState } from 'react';
import Modal from 'react-modal';
import { ViewContext } from '../Context/viewContext';
import AddTextBoxModal from './UI/Modals/AddTextBoxModal';
import AddImageModal from './UI/Modals/AddImageModal';
import AddCarouselModal from './UI/Modals/AddCarouselModal';
import styles from './styles/ViewControlButtons.module.css';
import { modalContent, modalOverlay } from './UI/Modals/styles/modal';

export interface ViewControlButtonsProps {}

export type ModalType = 'textbox' | 'image' | 'carousel';

// Button container to control ViewList
const ViewControlButtons: React.FC<ViewControlButtonsProps> = () => {
  const { dispatch } = useContext(ViewContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('textbox');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (modalType: ModalType) => {
    setModalType(modalType);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_MARKED' });
  };

  return (
    <div>
      <Modal
        // appElement={document.getElementById('root') || undefined}
        ariaHideApp={false}
        style={{ content: modalContent, overlay: modalOverlay }}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      >
        {modalType === 'textbox' && <AddTextBoxModal closeModal={closeModal} />}
        {modalType === 'image' && <AddImageModal closeModal={closeModal} />}
        {modalType === 'carousel' && (
          <AddCarouselModal closeModal={closeModal} />
        )}
      </Modal>
      <button
        className={styles.controlButton}
        onClick={() => openModal('textbox')}
        data-testid="add-textbox"
      >
        Add Texbox
      </button>
      <button
        className={styles.controlButton}
        onClick={() => openModal('image')}
      >
        Add Image
      </button>
      <button
        className={styles.controlButton}
        onClick={() => openModal('carousel')}
      >
        Add Carausel
      </button>
      <button className={styles.controlButtonDanger} onClick={handleDelete}>
        Delete Marked Views
      </button>
    </div>
  );
};

// Modal.setAppElement('#root');

export default ViewControlButtons;
