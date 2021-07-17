import React, { createContext, useEffect, useCallback } from 'react';
import { useViewList } from '../hooks/useViewList';
import { ViewTypes } from '../Types/ViewTypes';
import { ViewActionTypes } from '../Reducers/viewListReducer';
import { useFetch } from '../hooks/useFetch';
import { appendViewIds } from '../Utils/normalizer';

export interface IViewContext {
  viewData: ViewTypes[];
  dispatch: React.Dispatch<ViewActionTypes>;
  loading: boolean;
  error: string | null;
}

export const ViewContext = createContext<IViewContext>({
  viewData: [],
  dispatch: () => {},
  loading: false,
  error: null,
} as IViewContext);

export interface ViewProviderProps {
  children: React.ReactNode;
}

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
  const { viewList, dispatch } = useViewList();
  const { data, fetchData, loading, error, persistData } = useFetch(
    'https://venn-interviews-server.herokuapp.com/json',
  );

  const handlePersistData = useCallback(
    () => persistData(viewList),
    [viewList, persistData],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data)
      dispatch({ type: 'POPULATE_VIEWS', payload: appendViewIds(data) });
  }, [dispatch, data]);

  useEffect(() => {
    if (viewList.length !== 0) handlePersistData();
  }, [viewList, handlePersistData]);

  return (
    <ViewContext.Provider
      value={{
        viewData: viewList,
        dispatch,
        loading,
        error,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

// export default ViewProvider;
