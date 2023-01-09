import { FC } from 'react';
import { CartProduct } from '../../providers/CartContextProvider';
import CartListItem from './CartListItem/CartListItem';
import styles from './CartList.module.scss';

interface CartListProps {
  products: CartProduct[];
  decCountProduct: (product: CartProduct) => void;
  incCountProduct: (product: CartProduct) => void;
  sequenceFirstEl: number;
}

const CartList: FC<CartListProps> = ({
  products,
  decCountProduct,
  incCountProduct,
  sequenceFirstEl,
}) => {
  return (
    <div className={styles.list}>
      {products.map((product, index) => (
        <CartListItem
          key={product.productInfo.id}
          product={product}
          sequence={index + 1 + sequenceFirstEl}
          incCountProduct={incCountProduct}
          decCountProduct={decCountProduct}
        />
      ))}
    </div>
  );
};

export default CartList;
