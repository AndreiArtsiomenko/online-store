import { FC } from 'react';
import Select from '../ui/selects/Select';
import styles from './CartFilter.module.scss';

interface CartFilterProps {
  value: number;
  setValue: (val: number) => void;
  options: { id: number; name: string; value: string }[];
}

const CartFilter: FC<CartFilterProps> = ({ value, setValue, options }) => {
  return (
    <div className={styles.wrapper}>
      <Select
        options={options}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        placeholder="Show to"
      />
    </div>
  );
};
export default CartFilter;
