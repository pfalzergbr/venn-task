import { Reducer } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { ViewTypes } from '../Types/ViewTypes';

export type ViewActionTypes =
  | { type: 'ADD_VIEW'; payload: ViewTypes }
  | { type: 'REORDER'; payload: { result: DropResult } }
  | { type: 'MARK_VIEW'; payload: { id: string } }
  | { type: 'DELETE_MARKED' }
  | { type: 'EDIT_VIEW'; payload: ViewTypes }
  | { type: 'POPULATE_VIEWS'; payload: ViewTypes[] };

export const viewReducer: Reducer<ViewTypes[], ViewActionTypes> = (
  state,
  action,
): ViewTypes[] => {
  // Adds a new view
  switch (action.type) {
    case 'ADD_VIEW': {
      return [...state, action.payload];
    }

    // Handles React Beautiful DnD reordering logic
    case 'REORDER': {
      const { result } = action.payload;

      if (!result.destination) return state;

      const views = [...state];
      const [movedView] = views.splice(result.source.index, 1);

      if (result.destination)
        views.splice(result.destination.index, 0, movedView);
      return views;
    }

    // Marks the view for deletion
    case 'MARK_VIEW': {
      const view = state.find(item => item.id === action.payload.id);
      if (!view) return state;

      const newState = state.map(item =>
        item.id === action.payload.id
          ? { ...view, isMarked: !view.isMarked }
          : item,
      );

      return newState;
    }

    // Handles deletion of all marked items
    case 'DELETE_MARKED': {
      return state.filter(view => !view.isMarked);
    }

    // Editing existing views
    case 'EDIT_VIEW': {
      const newState = state.map(view =>
        view.id === action.payload.id ? action.payload : view,
      );
      return newState;
    }

    // Populate views from the API
    case 'POPULATE_VIEWS': {
      return [...action.payload];
    }

    default: {
      return state;
    }
  }
};
