import { render, screen } from '../../../../test-utils/renderWithContext';
import App from '../../../../App';
import userEvent from '@testing-library/user-event';

describe('ImageWithPadding', () => {
  test('should be able to edit a VImageWithPadding view with an edit button', async () => {
    render(<App />);
    const images = await screen.findAllByRole('img');
    // @ts-ignore
    expect(images[0].src).toContain(
      'https://firebasestorage.googleapis.com/v0/b/mulawl.appspot.com/o/c70f0c40-78b4-11ea-9167-f7c4afbaf99b%2F2020-12-21%2Fritz_app2_1500x%402x.gif?alt=media&token=df148b2e-18df-47e8-844f-9755c5aedade',
    );
    const editButtons = await screen.findAllByRole('button', { name: 'Edit' });
    await userEvent.click(editButtons[1]);
    const title = await screen.findByText('Edit Image');
    expect(title).toBeInTheDocument();
    const form = await screen.findByTestId('image-form');
    expect(form).toHaveFormValues({
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/mulawl.appspot.com/o/c70f0c40-78b4-11ea-9167-f7c4afbaf99b%2F2020-12-21%2Fritz_app2_1500x%402x.gif?alt=media&token=df148b2e-18df-47e8-844f-9755c5aedade',
    });
    const urlInput = await screen.findByLabelText('Image Url');
    userEvent.clear(urlInput);
    userEvent.type(
      urlInput,
      'https://media1.tenor.com/images/94eebddf79c8dab00d177161f196f18b/tenor.gif',
    );
    const submitButton = await screen.findByTestId('add-view');
    await userEvent.click(submitButton);
    // const updatedImages = await screen.findAllByRole('img');
    // @ts-ignore
    // expect(updatedImages[0].src).toContain(
    //   'https://media1.tenor.com/images/94eebddf79c8dab00d177161f196f18b/tenor.gif',
    // );
  });
});
