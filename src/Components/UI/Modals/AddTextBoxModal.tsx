import { useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { useContext } from 'react';
import { ViewContext } from '../../../Context/viewContext';
import { TwitterPicker } from 'react-color';
import { createVTextBox } from '../../../Utils/createVTextBox';
import {
  TextAlignmentType,
  VTextBoxAttributes,
} from '../../../Types/ViewTypes';

export interface AddTextBoxModalProps {
  closeModal: () => void;
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
}) => {
  const [backroundColor, setBackgroundColor] = useState('#000000');
  const [fontColor, setFontColor] = useState('#000000');
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
    const editedView = createVTextBox({
      ...data,
      backgroundColor: { hex: backroundColor },
      fontColor: { hex: fontColor },
    });
    dispatch({ type: 'EDIT_VIEW', payload: editedView });
  };

  const onSubmit = (data: ITextBoxData) => {
    isEditing ? editView(data) : addView(data);
    closeModal();
  };

  // Todo - Extract input fields
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formControl">
          <label htmlFor="bodyText">Body Text:</label>
          <textarea
            id="bodyText"
            {...register('bodyText', { required: true })}
          />
          <p role="alert">{errors['bodyText']?.message}</p>
        </div>
        <div>
          <label htmlFor="textAlignment">Text alignment</label>
          <select
            id="textAlignment"
            defaultValue="left"
            {...register('textAlignment', { required: true })}
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="center">Center</option>
          </select>
        </div>
        <div>
          <label htmlFor="fontSize">Font Size</label>
          <input
            type="number"
            step="1"
            min="1"
            max="50"
            defaultValue="16"
            {...register('fontSize', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="padding">Padding</label>
          <input
            type="number"
            step="1"
            min="1"
            max="50"
            defaultValue="16"
            {...register('padding', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="capitalised">Capitalised</label>
          <input type="checkbox" {...register('capitalised')} />
        </div>
        <div>
          <label htmlFor="backgroundColor">Background Color</label>
          <TwitterPicker
            color={backroundColor}
            onChangeComplete={handleBackgroundColorChange}
          />
        </div>
        <div>
          <label htmlFor="fontColor">Font Color</label>
          <TwitterPicker
            color={fontColor}
            onChangeComplete={handleFontColorChange}
          />
        </div>
        <div>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" disabled={!isValid}>
            Add View
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTextBoxModal;
