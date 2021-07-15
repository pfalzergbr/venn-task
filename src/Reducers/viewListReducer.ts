import { Reducer } from 'react';
import { mockData } from '../test-utils/data/mockData';
import { ViewTypes } from '../Types/ViewTypes';

export const initialViewState = mockData;

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
