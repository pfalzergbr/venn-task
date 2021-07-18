import { useState } from 'react';
import { useContext } from 'react';
import { ViewContext } from '../../../Context/viewContext';
import { VImageCarouselAttributes } from '../../../Types/ViewTypes';
import { createVImageCarousel } from '../../../Utils/createView';
import InputField from '../Forms/InputField';
import CarouselThumbnailList from './CarouselThumbnailList';
import styles from './styles/Modal.module.css';

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

  const removeImageUrl = (index: number) => {
    setImageUrls(state => {
      const newState = [...state];
      newState.splice(index, 1);
      return newState;
    });
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

  const handlePaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaddingInputState(parseInt(e.target.value));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageInputState(e.target.value);
  };

  return (
    <div className={styles.carouselForm}>
      <h2 className={styles.title}>Add Carousel</h2>
      <InputField
        name="padding"
        labelText="Padding"
        inputState={paddingInputState}
        handleChange={handlePaddingChange}
        type="number"
      />
      <InputField
        name="imageUrl"
        labelText="Add Image Url"
        inputState={imageInputState}
        handleChange={handleImageChange}
      />
      <div className={styles.formControl}>
        <button className={styles.ghostButton} onClick={addImageUrl}>
          Add Image
        </button>
      </div>
      <CarouselThumbnailList
        imageUrls={imageUrls}
        removeImageUrl={removeImageUrl}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.actionButton} onClick={handleSubmit}>
          {isEditing ? 'Edit View' : 'Add View'}
        </button>
        <button className={styles.ghostButton} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddCarouselModal;
