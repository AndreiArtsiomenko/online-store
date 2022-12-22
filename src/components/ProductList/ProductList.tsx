import { FC } from 'react';
import { Product } from '../../models/product.model';
import { CardType } from '../../types/common.types';
import ProductItem from './ProductItem/ProductItem';
import ProductItemHorizontal from './ProductItem/ProductItemHorizontal';
import styles from './ProductList.module.scss';

interface ProductListProps {
  products: Product[];
  typeCard: CardType;
}

const ProductList: FC<ProductListProps> = ({ products, typeCard }) => {
  const isVertical = typeCard === 'vertical'
  return (
    <>
      {isVertical ?
        <div className={styles.wrapper} >
          {
            products.map((product) => (
              <ProductItem key={product.id} product={product} typeCard={typeCard} />
            ))
          }
        </div > :
        <div className={styles.wrapper__horizontal} >
          {
            products.map((product) => (
              <ProductItemHorizontal key={product.id} product={product} typeCard={typeCard} />
            ))
          }
        </div >
      }
    </>
  );
};
export default ProductList;
