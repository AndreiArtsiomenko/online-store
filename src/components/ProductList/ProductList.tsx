import { FC } from 'react';
import { Product } from '../../models/product.model';
import { CardType } from '../../types/common.types';
import ProductItem from './ProductItem/ProductItem';
import styles from './ProductList.module.scss';
import cn from 'classnames'

interface ProductListProps {
  products: Product[];
  typeCard: CardType;
}

const ProductList: FC<ProductListProps> = ({ products, typeCard }) => {
  const isVertical = typeCard === 'vertical'
  return (
    <div className={isVertical ? cn(styles.wrapper, styles.list_vertical) : cn(styles.wrapper, styles.list_horizontal)} >
      { products.map((product) => (
        <ProductItem key={product.id} product={product} typeCard={typeCard} />
      ))}
    </div >
  );
};
export default ProductList;
