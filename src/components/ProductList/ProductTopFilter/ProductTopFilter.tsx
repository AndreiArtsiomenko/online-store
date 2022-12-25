import { FC, useState } from 'react';
import { Product } from '../../../models/product.model';
import SortSelect from '../../ui/selects/SortSelect';
import style from './ProductTopFilter.module.scss'

interface ProductTopFilterProps {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
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
]

const ProductTopFilter: FC<ProductTopFilterProps> = ({ products, setProducts }) => {

  const [selectedSort, setSelectedSort] = useState('Sort options:')

  const sortProducts = (sort: string): void => {
    setSelectedSort(sort)
    const [key, type] = sort.split('_') as [key: 'price'| 'rating', type: string]
    if (type === 'ASC') {
      setProducts([...products].sort((a, b) => a[key] - b[key]))
    } else {
      setProducts([...products].sort((a, b) => b[key] - a[key]))
    }
  }

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