import { useState } from 'react';
import { useContext } from 'react';
import { ViewContext } from '../../../Context/viewContext';
import { VImageCarouselAttributes } from '../../../Types/ViewTypes';
import { createVImageCarousel } from '../../../Utils/createVTextBox';

export interface AddCarouselModalProps {
  closeModal: () => void;
  id?: string;
  carouselAttributes?: VImageCarouselAttributes;
  isEditing?: boolean | undefined;
}

const AddCarouselModal: React.FC<AddCarouselModalProps> = ({
  closeModal,
  id,
  carouselAttributes = {},
  isEditing,
}) => {
  const { dispatch } = useContext(ViewContext);
  const [imageUrls, setImageUrls] = useState<string[]>(
    carouselAttributes.images ? carouselAttributes.images : [],
  );
  const [imageInputState, setImageInputState] = useState<string>('');
  const [paddingInputState, setPaddingInputState] = useState<number>(
    carouselAttributes.padding ? carouselAttributes.padding : 16,
  );

  const addImageUrl = () => {
    setImageUrls(images => [...images, imageInputState]);
  };

  const addCarousel = () => {
    const newView = createVImageCarousel({
      padding: paddingInputState,
      images: imageUrls,
    });
    dispatch({ type: 'ADD_VIEW', payload: newView });
  };

  const editCarousel = () => {
    const newView = createVImageCarousel(
      {
        padding: paddingInputState,
        images: imageUrls,
      },
      id,
    );
    dispatch({ type: 'EDIT_VIEW', payload: newView });
  };

  const handleSubmit = () => {
    isEditing ? editCarousel() : addCarousel();
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
              <img src={imageUrl} alt="" style={{ height: '100px' }} />
              <button>X</button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handleSubmit}>
          {isEditing ? 'Edit View' : 'Add View'}
        </button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default AddCarouselModal;
