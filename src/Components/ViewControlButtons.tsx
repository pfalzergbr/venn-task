import { useContext, useState } from 'react';
import Modal from 'react-modal';
import { ViewContext } from '../Context/viewContext';
// import { mockView } from '../test-utils/data/mockData';
// import { ViewTypes } from '../Types/ViewTypes';
import AddTextBoxModal from './UI/Modals/AddTextBoxModal';
import AddImageModal from './UI/Modals/AddImageModal';
import AddCarouselModal from './UI/Modals/AddCarouselModal';

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
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        {modalType === 'textbox' && <AddTextBoxModal closeModal={closeModal} />}
        {modalType === 'image' && <AddImageModal closeModal={closeModal} />}
        {modalType === 'carousel' && (
          <AddCarouselModal closeModal={closeModal} />
        )}
      </Modal>
      <button onClick={() => openModal('textbox')}>Add Texbox</button>
      <button onClick={() => openModal('image')}>Add Image</button>
      <button onClick={() => openModal('carousel')}>Add Carausel</button>
      <button onClick={handleDelete}>Delete Marked Views</button>
    </div>
  );
};

export default ViewControlButtons;
