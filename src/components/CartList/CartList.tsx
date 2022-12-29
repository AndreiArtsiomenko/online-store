import { FC } from 'react';
import { CartProduct } from '../../providers/CartContextProvider';
import CartListItem from './CartListItem/CartListItem';
import styles from './CartList.module.scss';

interface CartListProps {
  products: CartProduct[];
  decCountProduct: (product: CartProduct) => void;
  incCountProduct: (product: CartProduct) => void;
}

const CartList: FC<CartListProps> = ({ products, decCountProduct, incCountProduct }) => {
  return (
    <div className={styles.list}>
      {products.map((product) => (
        <CartListItem
          key={product.productInfo.id}
          product={product}
          incCountProduct={incCountProduct}
          decCountProduct={decCountProduct}
        />
      ))}
    </div>
  );
};
export default CartList;
