import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form';
import styles from '../Modals/styles/Modal.module.css';

export interface TextFieldRHFProps<T> {
  name: string;
  labelText: string;
  register: UseFormRegister<T>;
  required?: boolean;
  errors: DeepMap<T, FieldError>;
}

const TextFieldRHF: React.FC<TextFieldRHFProps<any>> = ({
  name,
  labelText,
  register,
  required,
  errors,
}) => {
  return (
    <div className={styles.formControl}>
      <label className={styles.labelText} htmlFor={name}>
        {labelText}
      </label>
      <textarea
        className={styles.inputField}
        id={name}
        {...register(name, { required })}
      />
      <p role="alert">{errors[name]?.message}</p>
    </div>
  );
};

export default TextFieldRHF;
