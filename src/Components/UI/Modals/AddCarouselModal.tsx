import { useState } from 'react';
import { useContext } from 'react';
import { ViewContext } from '../../../Context/viewContext';
import { VImageCarouselAttributes } from '../../../Types/ViewTypes';
import { createVImageCarousel } from '../../../Utils/createView';
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
    <div className={styles.carouselForm}>
      <div className={styles.inputField}>
        <h2 className={styles.title}>Add Carousel</h2>
        <div className={styles.formControl}>
          <label className={styles.labelText} htmlFor="padding">
            Padding
          </label>
          <input
            className={styles.inputField}
            type="number"
            value={paddingInputState}
            step="1"
            onChange={e => setPaddingInputState(parseInt(e.target.value))}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelText} htmlFor="imageUrl">
            Add an Image Url
          </label>
          <input
            className={styles.inputField}
            type="text"
            value={imageInputState}
            onChange={e => setImageInputState(e.target.value)}
          />
          <button className={styles.ghostButton} onClick={addImageUrl}>
            Add Image
          </button>
        </div>
        <ul className={styles.imageList}>
          {imageUrls.map(imageUrl => (
            <li>
              <div>
                <img
                  className={styles.imageThumbnail}
                  src={imageUrl}
                  alt=""
                  style={{ height: '100px' }}
                />
                {/* <button>X</button> */}
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.buttonContainer}>
          <button className={styles.actionButton} onClick={handleSubmit}>
            {isEditing ? 'Edit View' : 'Add View'}
          </button>
          <button className={styles.ghostButton} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCarouselModal;
