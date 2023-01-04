import styles from './CartPage.module.scss';
import cn from 'classnames';
import CartList from '../../components/CartList/CartList';
import { useContext, useMemo, useState } from 'react';
import { CartContext, CartProduct, PromoCodeType } from '../../providers/CartContextProvider';
import CartSummary from '../../components/CartSummary/CartSummary';
import CartFilter from '../../components/CartFilter/CartFilter';
import Pagination from '../../components/Pagination/Pagination';

const cartFilterOptions = [
  { id: 1, name: '5', value: '5' },
  { id: 2, name: '10', value: '10' },
  { id: 3, name: '20', value: '20' },
];

const CartPage = () => {
  const { state, dispatch } = useContext(CartContext);
  const [countProductOnPage, setCountProductOnPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const cartProducts = useMemo(() => {
    const start = currentPage * countProductOnPage;
    const end = start + countProductOnPage;
    return state.products.slice(start, end);
  }, [countProductOnPage, currentPage, state.products]);

  const maxPageCount = useMemo(() => {
    return Math.ceil(state.products.length / countProductOnPage);
  }, [state.products.length, countProductOnPage]);

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
            <CartFilter value={countProductOnPage} setValue={setCountProductOnPage} options={cartFilterOptions} />
            <CartList products={cartProducts} incCountProduct={incCountProduct} decCountProduct={decCountProduct} />
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} maxPageCount={maxPageCount} />
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
