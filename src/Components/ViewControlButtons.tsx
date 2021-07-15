import { useContext } from 'react';
import { ViewContext } from '../Context/viewContext';
import { mockView } from '../test-utils/data/mockData';
import { ViewTypes } from '../Types/ViewTypes';

export interface ViewControlButtonsProps {}

// Button container to control ViewList
const ViewControlButtons: React.FC<ViewControlButtonsProps> = () => {
  const { dispatch } = useContext(ViewContext);

  const addView = (view: ViewTypes) => {
    dispatch({
      type: 'ADD_VIEW',
      payload: view,
    });
  };

  return (
    <div>
      <button onClick={() => addView(mockView)}>Add View</button>
      <button>Delete Marked Views</button>
    </div>
  );
};

export default ViewControlButtons;
