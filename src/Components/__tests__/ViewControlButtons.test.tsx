import { render, screen } from '../../test-utils/renderWithContext';
import ViewControlButtons from '../../Components/ViewControlButtons';

describe('ViewControlButtons', () => {
  test('should render View Control buttons correctly', async () => {
    render(<ViewControlButtons />);
    const buttons = await screen.findAllByRole('button');
    expect(buttons).toHaveLength(4);
  });
});
