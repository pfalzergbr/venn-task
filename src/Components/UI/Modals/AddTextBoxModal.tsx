import { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { useContext } from 'react';
import { ViewContext } from '../../../Context/viewContext';
import { TwitterPicker } from 'react-color';
import { createVTextBox } from '../../../Utils/createView';
import {
  TextAlignmentType,
  VTextBoxAttributes,
} from '../../../Types/ViewTypes';
import styles from './styles/Modal.module.css';

export interface AddTextBoxModalProps {
  closeModal: () => void;
  id?: string;
  textBoxAttributes?: VTextBoxAttributes;
  isEditing?: boolean | undefined;
}

export interface ITextBoxData {
  bodyText: string;
  textAlignment: TextAlignmentType;
  fontSize: number;
  padding: number;
  capitalised: boolean;
}

//Todo - Refactor this when ready
const AddTextBoxModal: React.FC<AddTextBoxModalProps> = ({
  closeModal,
  textBoxAttributes = {},
  isEditing,
  id,
}) => {
  const [backroundColor, setBackgroundColor] = useState(
    textBoxAttributes.backgroundColor
      ? textBoxAttributes.backgroundColor.hex
      : '#000000',
  );
  const [fontColor, setFontColor] = useState(
    textBoxAttributes.fontColor ? textBoxAttributes.fontColor.hex : '#000000',
  );
  const { dispatch } = useContext(ViewContext);

  const defaultValues: ITextBoxData = {
    bodyText: textBoxAttributes.bodyText || '',
    textAlignment: textBoxAttributes.textAlignment || 'left',
    fontSize: textBoxAttributes.fontSize || 16,
    padding: textBoxAttributes.padding || 16,
    capitalised: textBoxAttributes.capitalised || true,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ mode: 'onChange', defaultValues });
  const { isValid } = useFormState({ control });

  const handleBackgroundColorChange = (color: any) => {
    setBackgroundColor(color.hex);
  };

  const handleFontColorChange = (color: any) => {
    setFontColor(color.hex);
  };

  const addView = (data: ITextBoxData) => {
    const newView = createVTextBox({
      ...data,
      backgroundColor: { hex: backroundColor },
      fontColor: { hex: fontColor },
    });
    dispatch({ type: 'ADD_VIEW', payload: newView });
  };

  const editView = (data: ITextBoxData) => {
    const editedView = createVTextBox(
      {
        ...data,
        backgroundColor: { hex: backroundColor },
        fontColor: { hex: fontColor },
      },
      id,
    );
    dispatch({ type: 'EDIT_VIEW', payload: editedView });
  };

  const onSubmit = (data: ITextBoxData) => {
    isEditing ? editView(data) : addView(data);
    // handlePersistData();
    closeModal();
  };

  // Todo - Extract input fields
  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Add Carousel</h2>
        <div className={styles.formControl}>
          <label className={styles.labelText} htmlFor="bodyText">
            Body Text:
          </label>
          <textarea
            className={styles.inputField}
            id="bodyText"
            {...register('bodyText', { required: true })}
          />
          <p role="alert">{errors['bodyText']?.message}</p>
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelText} htmlFor="textAlignment">
            Text alignment
          </label>
          <select
            className={styles.inputField}
            id="textAlignment"
            defaultValue="left"
            {...register('textAlignment', { required: true })}
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="center">Center</option>
          </select>
        </div>
        <div className={styles.formControl}>
          <label className={styles.labelText} htmlFor="fontSize">
            Font Size
          </label>
          <input
            className={styles.inputField}
            type="number"
            step="1"
            min="1"
            max="50"
            defaultValue="16"
            {...register('fontSize', { required: true })}
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
          <label className={styles.labelText} htmlFor="capitalised">
            Capitalised
          </label>
          <input type="checkbox" {...register('capitalised')} />
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
        <div className={styles.formControl}>
          <label className={styles.labelText} htmlFor="fontColor">
            Font Color
          </label>
          <TwitterPicker
            color={fontColor}
            onChangeComplete={handleFontColorChange}
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

export default AddTextBoxModal;
