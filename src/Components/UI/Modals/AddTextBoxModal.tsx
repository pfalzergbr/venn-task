import { useForm, useFormState } from 'react-hook-form';
import { useContext } from 'react';
import { ViewContext } from '../../../Context/viewContext';
import { ViewTypes } from '../../../Types/ViewTypes';

export interface AddTextBoxModalProps {
  closeModal: () => void;
}

const AddTextBoxModal: React.FC<AddTextBoxModalProps> = ({ closeModal }) => {
  const { dispatch } = useContext(ViewContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ mode: 'onChange' });
  const { isValid } = useFormState({ control });

  const onSubmit = (data: any) => {
    console.log(data);
    // const newView = {};
    // dispatch({ type: 'ADD_VIEW', payload: newView as ViewTypes });
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
            {...register('fontSize', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="capitalised">Capitalised</label>
          <input type="checkbox" {...register('capitalised')} />
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
