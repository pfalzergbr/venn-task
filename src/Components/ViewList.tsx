import { useContext } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { ViewTypes } from '../Types/ViewTypes';
import { ViewContext } from '../Context/viewContext';
import VImageCarousel from './Views/VImageCarousel';
import VImageWithPadding from './Views/VImageWithPadding';
import VTextBox from './Views/VTextBox';
import styles from './styles/ViewList.module.css';

export interface ViewListProps {
  viewData: ViewTypes[];
}

// Component rendering a list of views.
// Generating a unique key with uuid, since the API doesn't give us any id or reasonably
// unique value. Indexes are hacky, so went with uuid.
const ViewList: React.FC<ViewListProps> = ({ viewData }) => {
  const { dispatch } = useContext(ViewContext);

  const handleDragEnd = (result: DropResult) => {
    dispatch({ type: 'REORDER', payload: { result } });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="views">
        {provided => (
          <ul
            className={styles.viewList}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {viewData.map((view, index) => {
              if (view.moduleType === 'VTextBox')
                return (
                  <Draggable key={view.id} draggableId={view.id!} index={index}>
                    {provided => (
                      <li
                        className={styles.viewListItem}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <VTextBox viewData={view} index={index} />
                      </li>
                    )}
                  </Draggable>
                );
              else if (view.moduleType === 'VImageWithPadding')
                return (
                  <Draggable key={view.id} draggableId={view.id!} index={index}>
                    {provided => (
                      <li
                        className={styles.viewListItem}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <VImageWithPadding viewData={view} index={index} />
                      </li>
                    )}
                  </Draggable>
                );
              else if (view.moduleType === 'VImageCarousel')
                return (
                  <Draggable key={view.id} draggableId={view.id!} index={index}>
                    {provided => (
                      <li
                        className={styles.viewListItem}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <VImageCarousel viewData={view} index={index} />
                      </li>
                    )}
                  </Draggable>
                );

              return null;
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ViewList;
