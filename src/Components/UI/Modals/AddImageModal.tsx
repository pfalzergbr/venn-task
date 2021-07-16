import { useState } from 'react';
import { useContext } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { ViewContext } from '../../../Context/viewContext';
import { TwitterPicker } from 'react-color';
import { createVImageWithPadding } from '../../../Utils/createView';
import { VImageWithPaddingAttributes } from '../../../Types/ViewTypes';
import styles from './styles/Modal.module.css';

export interface AddImageModalProps {
  closeModal: () => void;
  id?: string;
  imageAttributes?: VImageWithPaddingAttributes;
  isEditing?: boolean | undefined;
}

export interface IImageData {
  imageUrl: string;
  padding: number;
}

const AddImageModal: React.FC<AddImageModalProps> = ({
  closeModal,
  id,
  imageAttributes = {},
  isEditing,
}) => {
  const { dispatch } = useContext(ViewContext);
  const [backroundColor, setBackgroundColor] = useState(
    imageAttributes.backgroundColor
      ? imageAttributes.backgroundColor.hex
      : '#000000',
  );

  const defaultValues = {
    imageUrl: imageAttributes.imageUrl || '',
    padding: imageAttributes.padding || 16,
  };

  const {
    register,
    handleSubmit,
    // formState: { errors },
    control,
  } = useForm({ mode: 'onChange', defaultValues });
  const { isValid } = useFormState({ control });

  const handleBackgroundColorChange = (color: any) => {
    setBackgroundColor(color.hex);
  };

  const addView = (data: IImageData) => {
    const newView = createVImageWithPadding({
      ...data,
      backgroundColor: { hex: backroundColor },
      link: { payload: 'where it points', type: 'image' },
    });

    dispatch({ type: 'ADD_VIEW', payload: newView });
  };

  const editView = (data: IImageData) => {
    const newView = createVImageWithPadding(
      {
        ...data,
        backgroundColor: { hex: backroundColor },
        link: { payload: 'where it points', type: 'image' },
      },
      id,
    );

    dispatch({ type: 'EDIT_VIEW', payload: newView });
  };

  const onSubmit = (data: IImageData) => {
    isEditing ? editView(data) : addView(data);
    closeModal();
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Add Image</h2>
        <div className={styles.formControl}>
          <label className={styles.labelText} htmlFor="imageUrl">
            Image Url
          </label>
          <input
            className={styles.inputField}
            type="text"
            {...register('imageUrl', { required: true })}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelText} htmlFor="padding">
            Padding
          </label>
          <input
            className={styles.inputField}
            type="number"
            step="1"
            min="1"
            max="50"
            defaultValue="16"
            {...register('padding', { required: true })}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelText} htmlFor="backgroundColor">
            Background Color
          </label>
          <TwitterPicker
            color={backroundColor}
            onChangeComplete={handleBackgroundColorChange}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.ghostButton}
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className={styles.actionButton}
            type="submit"
            disabled={!isValid}
          >
            {isEditing ? 'Edit View' : 'Add View'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddImageModal;
