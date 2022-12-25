import { FC } from 'react';
import { CategoryType } from '../../helpers/filters.data';
import Button from '../ui/buttons/Button';
import styles from './AsidePanel.module.scss';
import FilterBox from './FilterBox/FilterBox';

interface AsidePanelProps {
  categories: CategoryType;
  categoryParam: string[];
  setCategoryParam: (value: string[]) => void;
  resetFilters: () => void;
}

const AsidePanel: FC<AsidePanelProps> = ({ categories, categoryParam, setCategoryParam, resetFilters }) => {
  return (
    <div className={styles.wrapper}>
      <Button onClick={resetFilters}>Reset Filter</Button>
      <FilterBox entities={categories} params={categoryParam} setParam={setCategoryParam} title="Category" />
    </div>
  );
};
export default AsidePanel;
