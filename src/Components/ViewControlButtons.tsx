import { useState } from 'react';
import Modal from 'react-modal';
// import { ViewContext } from '../Context/viewContext';
// import { mockView } from '../test-utils/data/mockData';
// import { ViewTypes } from '../Types/ViewTypes';
import AddViewModal from './UI/Modals/AddTextBoxModal';

export interface ViewControlButtonsProps {}

// Button container to control ViewList
const ViewControlButtons: React.FC<ViewControlButtonsProps> = () => {
  // const { dispatch } = useContext(ViewContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const addView = (view: ViewTypes) => {
  //   dispatch({
  //     type: 'ADD_VIEW',
  //     payload: view,
  //   });
  // };

  return (
    <div>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <AddViewModal closeModal={closeModal} />
      </Modal>
      <button onClick={openModal}>Add View</button>
      <button>Delete Marked Views</button>
    </div>
  );
};

export default ViewControlButtons;
