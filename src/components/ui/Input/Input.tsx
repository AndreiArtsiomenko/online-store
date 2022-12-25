import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';
type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: FC<InputProps> = ({ ...rest }) => {
  return <input className={styles.input} {...rest} />;
};
export default Input;
