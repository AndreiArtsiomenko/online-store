import { FC } from 'react';
import { CategoryType } from '../../helpers/filters.data';
import Button from '../ui/buttons/Button';
import styles from './AsidePanel.module.scss';
import FilterBox from './FilterBox/FilterBox';
import FilterSlider from './FilterSlider/FilterSlider';

interface AsidePanelProps {
  brands: CategoryType;
  categories: CategoryType;
  categoryParam: string[];
  setCategoryParam: (value: string[]) => void;
  brandParam: string[];
  setBrandParam: (value: string[]) => void;
  resetFilters: () => void;
  priceParam: string[]
  setPriceParam: (value: string[]) => void
  minPrice: number
  maxPrice: number
  stockParam: string[]
  setStockParam: (value: string[]) => void
  minStock: number
  maxStock: number
}

const AsidePanel: FC<AsidePanelProps> = ({ 
  brands, 
  brandParam, 
  setBrandParam, 
  categories, 
  categoryParam, 
  setCategoryParam, 
  resetFilters,
  priceParam,
  setPriceParam,
  minPrice,
  maxPrice,
  stockParam,
  setStockParam,
  minStock,
  maxStock
}) => {
  return (
    <div className={styles.wrapper}>
      <Button onClick={resetFilters}>Reset Filter</Button>
      <FilterBox entities={categories} params={categoryParam} setParam={setCategoryParam} title="Category" />
      <FilterBox entities={brands} params={brandParam} setParam={setBrandParam} title="Brand" />
      <FilterSlider params={priceParam} setParams={setPriceParam} minSlideNumber={minPrice} maxSlideNumber={maxPrice} title="Price"/>
      <FilterSlider params={stockParam} setParams={setStockParam} minSlideNumber={minStock} maxSlideNumber={maxStock} title="Stock"/>
    </div>
  );
};
export default AsidePanel;
