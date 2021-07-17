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
import InputFieldRHF from '../Forms/InputFieldRHF';
import SelectFieldRHF, { SelectOption } from '../Forms/SelectFieldRHF';
import TextFieldRHF from '../Forms/TextFieldRHF';

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

//Pretty complex. Handling Color pickers in a separate state at this point. With more time available, I would explore
// controlled components in React Hook Form to make them play nice together.
const AddTextBoxModal: React.FC<AddTextBoxModalProps> = ({
  closeModal,
  textBoxAttributes = {},
  isEditing,
  id,
}) => {
  const [backroundColor, setBackgroundColor] = useState(
    textBoxAttributes.backgroundColor
      ? textBoxAttributes.backgroundColor.hex
      : '#fff',
  );
  const [fontColor, setFontColor] = useState(
    textBoxAttributes.fontColor ? textBoxAttributes.fontColor.hex : '#000000',
  );
  const { dispatch } = useContext(ViewContext);

  const alignmentOptions: SelectOption[] = [
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
    { label: 'Center', value: 'center' },
  ];

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

  // TODO - investigate this any
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
    closeModal();
  };

  // Todo - Extract input fields
  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Add Textbox</h2>
        <TextFieldRHF
          name="bodyText"
          labelText="Body Text"
          register={register}
          required={true}
          errors={errors}
        />
        <SelectFieldRHF
          name="textAlignment"
          labelText="Text Alignment"
          register={register}
          options={alignmentOptions}
        />
        <InputFieldRHF
          name="fontSize"
          labelText="Font Size"
          register={register}
          type="number"
          min="1"
          max="50"
          required={true}
        />
        <InputFieldRHF
          name="padding"
          labelText="Padding"
          register={register}
          type="number"
          min="1"
          max="250"
          required={true}
        />
        <InputFieldRHF
          name="capitalised"
          labelText="Capitalised"
          register={register}
          type="checkbox"
        />
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
