import { useState } from 'react';
import { useContext } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { ViewContext } from '../../../Context/viewContext';
import { TwitterPicker } from 'react-color';
import { createVImageWithPadding } from '../../../Utils/createVTextBox';

export interface AddImageModalProps {
  closeModal: () => void;
}

const AddImageModal: React.FC<AddImageModalProps> = ({ closeModal }) => {
  const { dispatch } = useContext(ViewContext);
  const [backroundColor, setBackgroundColor] = useState('#000000');

  const {
    register,
    handleSubmit,
    // formState: { errors },
    control,
  } = useForm({ mode: 'onChange' });
  const { isValid } = useFormState({ control });

  const handleBackgroundColorChange = (color: any) => {
    setBackgroundColor(color.hex);
  };

  const onSubmit = (data: any) => {
    const newView = createVImageWithPadding({
      ...data,
      backgroundColor: { hex: backroundColor },
      link: { payload: 'where it points', type: 'image' },
    });
    console.log(newView);
    dispatch({ type: 'ADD_VIEW', payload: newView });
    closeModal();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="imageUrl">Image Url</label>
          <input type="text" {...register('imageUrl', { required: true })} />
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
          <label htmlFor="backgroundColor">Background Color</label>
          <TwitterPicker
            color={backroundColor}
            onChangeComplete={handleBackgroundColorChange}
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

export default AddImageModal;
