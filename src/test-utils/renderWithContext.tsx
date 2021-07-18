import { ReactElement } from 'react';
import { ViewProvider } from '../Context/viewContext';
import { render, RenderOptions } from '@testing-library/react';

const RenderWithProvier: React.FC = ({ children }) => {
  return <ViewProvider>{children}</ViewProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: RenderWithProvier, ...options });

export * from '@testing-library/react';
export { customRender as render };
