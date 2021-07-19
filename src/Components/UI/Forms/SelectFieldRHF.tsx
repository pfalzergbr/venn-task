import { UseFormRegister } from 'react-hook-form';
import styles from '../Modals/styles/Modal.module.css';

export interface SelectFieldRHFProps<T> {
  name: string;
  labelText: string;
  register: UseFormRegister<T>;
  required?: boolean;
  options: SelectOption[];
}

export interface SelectOption {
  label: string;
  value: string;
}

// With more time available, this any needs to be figured out.
const SelectFieldRHF: React.FC<SelectFieldRHFProps<any>> = ({
  name,
  labelText,
  required = false,
  register,
  options,
}) => {
  return (
    <div className={styles.formControl}>
      <label className={styles.labelText} htmlFor="textAlignment">
        {labelText}
      </label>
      <select
        defaultValue={options[0].value}
        className={styles.inputField}
        id={name}
        {...register(name, { required })}
      >
        {options.map((option, index) => (
          <option value={option.value} key={index + option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFieldRHF;
