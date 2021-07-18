import { render, screen } from '../test-utils/renderWithContext';
import App from '../App';
import ViewControlButtons from '../Components/ViewControlButtons';

describe('App', () => {
  test('should render a list of views correctly', async () => {
    render(<App />);
    const cards = await screen.findAllByRole('listitem');
    expect(cards).toHaveLength(3);
  });

  test('should render View Control buttons correctly', async () => {
    render(<ViewControlButtons />);
    const buttons = await screen.findAllByRole('button');
    expect(buttons).toHaveLength(4);
  });
});
