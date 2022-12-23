import { FC, useState } from 'react';
import { Product } from '../../../models/product.model';
import SortSelect from '../../ui/selects/SortSelect';
import style from './ProductTopFilter.module.scss'

interface ProductTopFilterProps {
  products: Product[]
}

const sortOption = [
  { 
    id: 1,
    value: 'price_ASC',
    name: 'Sort by price ASC',
  },
  {
    id: 2,
    value: 'price_DESC',
    name: 'Sort by price DESC'
  },
  {
    id: 3,
    value: 'rating_ASC',
    name: 'Sort by rating ASC',
  },
  {
    id: 4,
    value: 'rating_DESC',
    name: 'Sort by rating DESC'
  },
  {
    id: 5,
    value: 'discount_ASC',
    name: 'Sort by discount ASC',
  },
  {
    id: 6,
    value: 'discount_DESC',
    name: 'Sort by discount DESC'
  }
]

const [selectedSort, setSelectedSort] = useState('')

const sortProducts = (sort:string) => {
  setSelectedSort(sort)
}

const ProductTopFilter: FC<ProductTopFilterProps>= ({products}) => {
  return (
    <div className={style.wrapper}>
      <SortSelect 
        value={selectedSort}
        onChange={sortProducts}
        defaultValue='Sort options:'
        options={sortOption}
      />
      <div>Found: {products.length}</div>
      <input type="text" />
      <div className={style.viewModeForm}>
        <button></button>
        <button></button>
      </div>
    </div>
  );
};

export default ProductTopFilter;