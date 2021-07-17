import styles from '../Modals/styles/Modal.module.css';

export interface InputFieldProps {
  name: string;
  labelText: string;
  inputState: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number';
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  labelText,
  inputState,
  handleChange,
  type = 'text',
}) => {
  return (
    <div className={styles.formControl}>
      <label className={styles.labelText} htmlFor={name}>
        {labelText}
      </label>
      <input
        className={styles.inputField}
        type="type"
        name={name}
        value={inputState}
        step={type === 'number' ? '1' : undefined}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
