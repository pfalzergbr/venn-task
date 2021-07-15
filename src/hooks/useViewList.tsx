import { useReducer } from 'react';
import {
  initialViewState,
  ViewActionTypes,
  viewReducer,
} from '../Reducers/viewListReducer';
import { ViewTypes } from '../Types/ViewTypes';

export const useViewList = (): {
  viewList: ViewTypes[];
  dispatch: React.Dispatch<ViewActionTypes>;
} => {
  const [viewList, dispatch] = useReducer(viewReducer, initialViewState);

  return { viewList, dispatch };
};
