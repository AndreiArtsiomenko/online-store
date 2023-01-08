import styles from './CartPage.module.scss';
import cn from 'classnames';
import CartList from '../../components/CartList/CartList';
import { useContext, useEffect, useMemo, useState } from 'react';
import { CartContext, CartProduct, PromoCodeType } from '../../providers/CartContextProvider';
import CartSummary from '../../components/CartSummary/CartSummary';
import CartFilter from '../../components/CartFilter/CartFilter';
import Pagination from '../../components/Pagination/Pagination';
import CartModal from '../../components/CartModal/CartModal';

const cartFilterOptions = [
  { id: 1, name: 'All', value: '0' },
  { id: 2, name: '5 on page', value: '5' },
  { id: 3, name: '10 on page', value: '10' },
  { id: 4, name: '20 on page', value: '20' },
];

const CartPage = () => {
  const { state, dispatch } = useContext(CartContext);
  const [countProductOnPage, setCountProductOnPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const cartProducts = useMemo(() => {
    if (countProductOnPage === 0) return state.products;
    const start = currentPage * countProductOnPage;
    const end = start + countProductOnPage;

    return state.products.slice(start, end);
  }, [countProductOnPage, currentPage, state.products]);

  const maxPageCount = useMemo(() => {
    if (countProductOnPage === 0) return 1;

    return Math.ceil(state.products.length / countProductOnPage);
  }, [state.products.length, countProductOnPage]);

  const sequenceFirstEl = useMemo(() => {
    return countProductOnPage * currentPage;
  }, [currentPage, countProductOnPage]);

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

  useEffect(() => {
    if (cartProducts.length === 0 && currentPage >= maxPageCount && currentPage > 0) {
      setCurrentPage(maxPageCount - 1);
    }
  }, [cartProducts]);

  return (
    <>
      <div className={cn('container', styles.wrapper)}>
        {state.products.length > 0 && (
          <>
            <div className={styles.content}>
              <CartFilter
                value={countProductOnPage}
                setValue={setCountProductOnPage}
                options={cartFilterOptions}
              />
              <CartList
                sequenceFirstEl={sequenceFirstEl}
                products={cartProducts}
                incCountProduct={incCountProduct}
                decCountProduct={decCountProduct}
              />
              {maxPageCount > 1 && (
                <div className={styles.pagination}>
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    maxPageCount={maxPageCount}
                  />
                </div>
              )}
            </div>
            <aside className={styles.summary}>
              <CartSummary
                products={state.products}
                promoCodes={state.promoCode}
                appliedPromoCode={state.appliedPromoCode}
                applyPromoCode={applyPromoCode}
                cancelPromoCode={cancelPromoCode}
                buyNowHandler={setIsModalOpen}
              />
            </aside>
          </>
        )}
        {isModalOpen && <CartModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
      </div>

      {state.products.length === 0 && <div className={styles.title}>Cart is empty</div>}
    </>
  );
};

export default CartPage;
