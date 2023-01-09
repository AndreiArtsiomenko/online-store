import { FC } from 'react';
import { CategoryType } from '../../helpers/filters.data';
import { DualSliderValueType } from '../../pages/HomePage/HomePage';
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
  priceParam: DualSliderValueType;
  setPriceParam: (value: DualSliderValueType) => void;
  stockParam: DualSliderValueType;
  setStockParam: (value: DualSliderValueType) => void;
  minMaxPrice: { min: number; max: number };
  minMaxStock: { min: number; max: number };
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
  stockParam,
  setStockParam,
  minMaxStock,
  minMaxPrice,
}) => {
  return (
    <div className={styles.wrapper}>
      <Button onClick={resetFilters}>Reset Filter</Button>
      <FilterBox
        entities={categories}
        params={categoryParam}
        setParam={setCategoryParam}
        title="Category"
      />
      <FilterBox entities={brands} params={brandParam} setParam={setBrandParam} title="Brand" />
      <FilterSlider
        minMaxValues={minMaxPrice}
        params={priceParam}
        setParams={setPriceParam}
        title="Price"
      />
      <FilterSlider
        minMaxValues={minMaxStock}
        params={stockParam}
        setParams={setStockParam}
        title="Stock"
      />
    </div>
  );
};

export default AsidePanel;
