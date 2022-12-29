import styles from './CartPage.module.scss';
import cn from 'classnames';
import CartList from '../../components/CartList/CartList';
import { useContext } from 'react';
import { CartContext, CartProduct } from '../../providers/CartContextProvider';

const CartPage = () => {
  const { state, dispatch } = useContext(CartContext);
  const incCountProduct = (product: CartProduct) => {
    if (product.count < product.productInfo.stock) {
      dispatch({ type: 'incCount', payload: product });
    }
  };

  const decCountProduct = (product: CartProduct) => {
    if (product.count > 1) {
      dispatch({ type: 'decCount', payload: product });
    } else {
      dispatch({ type: 'deleteProduct', payload: product });
    }
  };

  return (
    <div className={cn('container', styles.wrapper)}>
      <div className={styles.content}>
        <CartList products={state.products} incCountProduct={incCountProduct} decCountProduct={decCountProduct} />
      </div>
      <aside className={styles.summary}>summary</aside>
    </div>
  );
};

export default CartPage;
