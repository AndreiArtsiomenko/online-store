import styles from './CartPage.module.scss';
import cn from 'classnames';
import CartList from '../../components/CartList/CartList';
import { useContext } from 'react';
import { CartContext, CartProduct, PromoCodeType } from '../../providers/CartContextProvider';
import CartSummary from '../../components/CartSummary/CartSummary';

const CartPage = () => {
  const { state, dispatch } = useContext(CartContext);

  const incCountProduct = (product: CartProduct): void => {
    if (product.count < product.productInfo.stock) {
      dispatch({ type: 'incCount', payload: product });
    }
  };

  const decCountProduct = (product: CartProduct): void => {
    if (product.count > 1) {
      dispatch({ type: 'decCount', payload: product });
    } else {
      dispatch({ type: 'deleteProduct', payload: product });
    }
  };

  const applyPromoCode = (promoCode: PromoCodeType): void => {
    dispatch({ type: 'applyPromoCode', payload: promoCode });
  };

  const cancelPromoCode = (promoCode: PromoCodeType): void => {
    dispatch({ type: 'cancelPromoCode', payload: promoCode });
  };

  return (
    <div className={cn('container', styles.wrapper)}>
      {state.products.length > 0 && (
        <>
          <div className={styles.content}>
            <CartList products={state.products} incCountProduct={incCountProduct} decCountProduct={decCountProduct} />
          </div>
          <aside className={styles.summary}>
            <CartSummary
              products={state.products}
              promoCodes={state.promoCode}
              appliedPromoCode={state.appliedPromoCode}
              applyPromoCode={applyPromoCode}
              cancelPromoCode={cancelPromoCode}
            />
          </aside>
        </>
      )}

      {state.products.length === 0 && <h3>Cart is empty</h3>}
    </div>
  );
};

export default CartPage;
