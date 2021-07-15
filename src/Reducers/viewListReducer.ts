import { Reducer } from 'react';

import { ViewTypes } from '../Types/ViewTypes';

export type ViewActionTypes = { type: 'ADD_VIEW'; payload: ViewTypes };

export const viewReducer: Reducer<ViewTypes[], ViewActionTypes> = (
  state,
  action,
): ViewTypes[] => {
  switch (action.type) {
    case 'ADD_VIEW': {
      return [...state, action.payload];
    }
    default: {
      return state;
    }
  }
};
