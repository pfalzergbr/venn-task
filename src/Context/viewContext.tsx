import React, { createContext } from 'react';
import { useViewList } from '../hooks/useViewList';
import { ViewTypes } from '../Types/ViewTypes';
import { ViewActionTypes } from '../Reducers/viewListReducer';

export interface IViewContext {
  viewData: ViewTypes[];
  dispatch: React.Dispatch<ViewActionTypes>;
}

export const ViewContext = createContext<IViewContext>({
  viewData: [],
  dispatch: () => {},
} as IViewContext);

export interface ViewProviderProps {
  children: React.ReactNode;
}

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
  const { viewList, dispatch } = useViewList();

  return (
    <ViewContext.Provider value={{ viewData: viewList, dispatch }}>
      {children}
    </ViewContext.Provider>
  );
};

// export default ViewProvider;
