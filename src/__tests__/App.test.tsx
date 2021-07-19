import { render, screen } from '../test-utils/renderWithContext';
import App from '../App';
import ViewControlButtons from '../Components/ViewControlButtons';
import userEvent from '@testing-library/user-event';

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

describe('Using card buttons', () => {
  test('should be able to delete a single view from the list', async () => {
    render(<App />);
    const deleteButtons = await screen.findAllByRole('button', {
      name: 'Delete',
    });
    const deleteMarkedViewsButton = await screen.findByRole('button', {
      name: 'Delete Marked Views',
    });
    expect(deleteButtons).toHaveLength(3);
    userEvent.click(deleteButtons[0]);
    userEvent.click(deleteMarkedViewsButton);
    const cards = await screen.findAllByTestId('card');
    expect(cards).toHaveLength(2);
  });

  test('should be able to delete a multiple views from the list', async () => {
    render(<App />);
    const cards = await screen.findAllByRole('listitem');
    expect(cards).toHaveLength(3);
    const deleteButtons = await screen.findAllByRole('button', {
      name: 'Delete',
    });
    const deleteMarkedViewsButton = await screen.findByRole('button', {
      name: 'Delete Marked Views',
    });
    expect(deleteButtons).toHaveLength(3);
    userEvent.click(deleteButtons[0]);
    userEvent.click(deleteButtons[2]);
    userEvent.click(deleteMarkedViewsButton);
    const lastCard = await screen.findByTestId('card');
    expect(lastCard).toBeInTheDocument();
  });
});
