import { DetailedHTMLProps, FC, SelectHTMLAttributes } from 'react';
import styles from './Select.module.scss';

interface SelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options: {
    id: number;
    value: string;
    name: string;
  }[];
}

const Select: FC<SelectProps> = ({ options, placeholder, value, ...rest }) => {
  return (
    <select className={styles.select} {...rest} value={value}>
      <option disabled value="">
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
