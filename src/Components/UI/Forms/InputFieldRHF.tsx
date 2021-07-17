import { UseFormRegister } from 'react-hook-form';
import styles from '../Modals/styles/Modal.module.css';

export interface InputFieldRHFProps<T> {
  name: string;
  labelText: string;
  register: UseFormRegister<T>;
  required?: boolean;
  type?: 'text' | 'number' | 'checkbox';
  min?: string;
  max?: string;
}

// With more time available, this any needs to be figured out.
const InputFieldRHF: React.FC<InputFieldRHFProps<any>> = ({
  name,
  labelText,
  type = 'text',
  required = false,
  register,
  min,
  max,
}) => {
  return (
    <div className={styles.formControl}>
      <label className={styles.labelText} htmlFor={name}>
        {labelText}
      </label>
      <input
        className={styles.inputField}
        id={name}
        type={type}
        step={type === 'number' ? '1' : undefined}
        min={type === 'number' ? min : undefined}
        max={type === 'number' ? max : undefined}
        {...register(name, { required })}
      />
    </div>
  );
};

export default InputFieldRHF;
