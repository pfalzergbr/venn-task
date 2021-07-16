import React, { createContext, useEffect } from 'react';
import { useViewList } from '../hooks/useViewList';
import { ViewTypes } from '../Types/ViewTypes';
import { ViewActionTypes } from '../Reducers/viewListReducer';
import { useFetch } from '../hooks/useFetch';

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
  const { data, fetchData } = useFetch(
    'https://venn-interviews-server.herokuapp.com/json',
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data) dispatch({ type: 'POPULATE_VIEWS', payload: data });
  }, [dispatch, data]);

  console.log(viewList);

  return (
    <ViewContext.Provider value={{ viewData: viewList, dispatch }}>
      {children}
    </ViewContext.Provider>
  );
};

// export default ViewProvider;
