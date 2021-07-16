import { Reducer } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { ViewTypes } from '../Types/ViewTypes';

export type ViewActionTypes =
  | { type: 'ADD_VIEW'; payload: ViewTypes }
  | { type: 'REORDER'; payload: { result: DropResult } }
  | { type: 'MARK_VIEW'; payload: { id: string } };

export const viewReducer: Reducer<ViewTypes[], ViewActionTypes> = (
  state,
  action,
): ViewTypes[] => {
  switch (action.type) {
    case 'ADD_VIEW': {
      return [...state, action.payload];
    }

    case 'REORDER': {
      const { result } = action.payload;

      if (!result.destination) return state;

      const views = [...state];
      const [movedView] = views.splice(result.source.index, 1);

      if (result.destination)
        views.splice(result.destination.index, 0, movedView);
      return views;
    }

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

    default: {
      return state;
    }
  }
};
