import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';
interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: string | null;
  label?: string;
}

const Input: FC<InputProps> = ({ error, label, ...rest }) => {
  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <input className={styles.input} {...rest} />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
};
export default Input;
