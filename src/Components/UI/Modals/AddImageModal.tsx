import { useState, useContext } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { ViewContext } from '../../../Context/viewContext';
import { useHeightMultiplier } from '../../../hooks/useHeightMultiplier';
import { TwitterPicker } from 'react-color';
import { createVImageWithPadding } from '../../../Utils/createView';
import { VImageWithPaddingAttributes } from '../../../Types/ViewTypes';
import styles from './styles/Modal.module.css';
import InputFieldRHF from '../Forms/InputFieldRHF';
import SelectFieldRHF from '../Forms/SelectFieldRHF';

export interface AddImageModalProps {
  closeModal: () => void;
  id?: string;
  imageAttributes?: VImageWithPaddingAttributes;
  isEditing?: boolean | undefined;
}

export interface IImageData {
  imageUrl: string;
  padding: number;
  linkType: 'category' | 'product';
  payload: string;
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
    linkType: imageAttributes.link ? imageAttributes.link.type : 'product',
    payload: imageAttributes.link ? imageAttributes.link.payload : '',
  };

  const linkOptions = [
    { value: 'product', label: 'Product' },
    { value: 'catetory', label: 'Category' },
  ];

  const { register, handleSubmit, watch, control } = useForm({
    mode: 'onChange',
    defaultValues,
  });
  const { isValid } = useFormState({ control });

  // Watchers
  const watchImage: string = watch('imageUrl');
  const watchLinkType = watch('linkType');

  // custom hook to calculate heightMultipliers
  const { imageRef, heightMultiplier, onImageError, isImage } =
    useHeightMultiplier(watchImage);
  const formIsValid: boolean = !(isValid && heightMultiplier);

  const handleBackgroundColorChange = (color: any) => {
    setBackgroundColor(color.hex);
  };

  const addView = (data: IImageData) => {
    if (!heightMultiplier) return;
    const newView = createVImageWithPadding(
      {
        imageUrl: data.imageUrl,
        padding: data.padding,
        backgroundColor: { hex: backroundColor },
        link: { payload: data.payload, type: data.linkType },
      },
      heightMultiplier,
    );

    dispatch({ type: 'ADD_VIEW', payload: newView });
  };

  const editView = (data: IImageData) => {
    if (!heightMultiplier) return;
    const newView = createVImageWithPadding(
      {
        imageUrl: data.imageUrl,
        padding: data.padding,
        backgroundColor: { hex: backroundColor },
        link: { payload: data.payload, type: data.linkType },
      },
      heightMultiplier,
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
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        data-testid="image-form"
      >
        <h2 className={styles.title}>
          {isEditing ? 'Edit Image' : 'Add Image'}
        </h2>
        <InputFieldRHF
          name="imageUrl"
          labelText="Image Url"
          register={register}
          required
        />
        <div className={styles.imageContainer}>
          {watchImage && isImage ? (
            <img
              onError={onImageError}
              ref={imageRef}
              src={watchImage}
              className={styles.imageThumbnailLarge}
              alt="Please provide a valid link"
            />
          ) : (
            <p>Please add an image!</p>
          )}
        </div>
        <InputFieldRHF
          name="padding"
          labelText="Padding"
          register={register}
          type="number"
          min="0"
          max="100"
          required={true}
        />
        <SelectFieldRHF
          name="linkType"
          labelText="Link Type"
          register={register}
          required
          options={linkOptions}
        />
        {watchLinkType === 'product' ? (
          <InputFieldRHF
            name="payload"
            labelText="Product Id"
            register={register}
            required
          />
        ) : (
          <InputFieldRHF
            name="payload"
            labelText="Category Id"
            register={register}
            required
          />
        )}
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
            disabled={formIsValid}
            data-testid="add-view"
          >
            {isEditing ? 'Confirm' : 'Add View'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddImageModal;
