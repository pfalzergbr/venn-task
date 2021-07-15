import React, { createContext } from 'react';
import { useViewList } from '../hooks/useViewList';
import { ViewTypes } from '../Types/ViewTypes';
import { ViewActionTypes } from '../Reducers/viewListReducer';

export interface IViewContext {
  viewList: ViewTypes[];
  dispatch: React.Dispatch<ViewActionTypes>;
}

export const ViewContext = createContext<IViewContext>({} as IViewContext);

export interface ViewProviderProps {
  children: React.ReactNode;
}

const ViewProvider: React.FC<ViewProviderProps> = ({ children }) => {
  const { viewList, dispatch } = useViewList();

  return (
    <ViewContext.Provider value={{ viewList, dispatch }}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewProvider;
