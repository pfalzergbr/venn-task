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

describe('TextBox', () => {
  test('should be able to edit a VTextBox view with an edit button', async () => {
    render(<App />);
    const initialCards = await screen.findAllByTestId('card');
    expect(initialCards[0]).toHaveTextContent(/20% Discount on all items/i);
    const editButtons = await screen.findAllByRole('button', { name: 'Edit' });
    await userEvent.click(editButtons[0]);
    const form = await screen.findByTestId('textbox-form');
    // Form is populated with the original data
    expect(form).toHaveFormValues({
      bodyText: '20% Discount on all items',
      textAlignment: 'left',
      fontSize: 14,
      capitalised: true,
    });
    // Changing the body text
    const bodyText = await screen.findByLabelText('Body Text');
    userEvent.clear(bodyText);
    userEvent.type(bodyText, 'Wow, happy to hear that!');
    const submitButton = await screen.findByTestId('add-view');
    userEvent.click(submitButton);
    const cards = await screen.findAllByTestId('card');
    expect(cards[0]).toHaveTextContent('Wow, happy to hear that!');
  });

  test('should be able to add a new textbox view', async () => {
    render(<App />);
    const initialCards = await screen.findAllByTestId('card');
    expect(initialCards).toHaveLength(3);
    const textBoxButton = await screen.findByTestId('add-textbox');
    userEvent.click(textBoxButton);
    const form = await screen.findByTestId('textbox-form');
    expect(form).toHaveFormValues({
      bodyText: '',
      textAlignment: 'left',
      fontSize: 16,
      capitalised: true,
    });
    const bodyText = await screen.findByLabelText('Body Text');
    userEvent.type(bodyText, 'Hello there!');
    const submitButton = await screen.findByTestId('add-view');
    userEvent.click(submitButton);
    const cards = await screen.findAllByTestId('card');
    // expect(cards).toHaveLength(4);
    // expect(cards[3]).toHaveTextContent(/hello there/i);
  });
});
