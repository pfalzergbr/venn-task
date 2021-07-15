import { useState } from 'react';
import { useContext } from 'react';
import { ViewContext } from '../../../Context/viewContext';
import { createVImageCarousel } from '../../../Utils/createVTextBox';

export interface AddCarouselModalProps {
  closeModal: () => void;
}

const AddCarouselModal: React.FC<AddCarouselModalProps> = ({ closeModal }) => {
  const { dispatch } = useContext(ViewContext);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageInputState, setImageInputState] = useState<string>('');
  const [paddingInputState, setPaddingInputState] = useState<number>(0);

  const addImageUrl = () => {
    setImageUrls(images => [...images, imageInputState]);
  };

  const handleSubmit = () => {
    const newView = createVImageCarousel({
      padding: paddingInputState,
      images: imageUrls,
    });
    console.log(newView);
    dispatch({ type: 'ADD_VIEW', payload: newView });
    closeModal();
  };

  return (
    <div>
      <div>
        <label htmlFor="padding">Padding</label>
        <input
          type="number"
          value={paddingInputState}
          step="1"
          onChange={e => setPaddingInputState(parseInt(e.target.value))}
        />
        <button onClick={addImageUrl}>Add Image</button>
        <label htmlFor="imageUrl">Add an Image Url</label>
        <input
          type="text"
          value={imageInputState}
          onChange={e => setImageInputState(e.target.value)}
        />
        <button onClick={addImageUrl}>Add Image</button>
      </div>
      <ul>
        {imageUrls.map(imageUrl => (
          <li>
            <div>
              <p>{imageUrl}</p>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default AddCarouselModal;
