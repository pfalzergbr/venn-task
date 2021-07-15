import { useReducer } from 'react';
import { ViewActionTypes, viewReducer } from '../Reducers/viewListReducer';
import { mockData } from '../test-utils/data/mockData';
import { ViewTypes } from '../Types/ViewTypes';

export const initialViewState = mockData;

export const useViewList = (): {
  viewList: ViewTypes[];
  dispatch: React.Dispatch<ViewActionTypes>;
} => {
  const [viewList, dispatch] = useReducer(viewReducer, initialViewState);

  return { viewList, dispatch };
};
