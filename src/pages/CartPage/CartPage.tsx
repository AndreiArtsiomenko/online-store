import styles from './CartPage.module.scss';
import CartList from '../../components/CartList/CartList';
import { useContext, useEffect, useMemo, useState } from 'react';
import { CartContext, CartProduct, PromoCodeType } from '../../providers/CartContextProvider';
import CartSummary from '../../components/CartSummary/CartSummary';
import CartFilter from '../../components/CartFilter/CartFilter';
import Pagination from '../../components/Pagination/Pagination';
import CartModal from '../../components/CartModal/CartModal';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const cartFilterOptions = [
  { id: 1, name: 'All', value: '0' },
  { id: 2, name: '5 on page', value: '5' },
  { id: 3, name: '10 on page', value: '10' },
  { id: 4, name: '20 on page', value: '20' },
];

const CartPage = () => {
  const { state, dispatch } = useContext(CartContext);

  const [searchParams] = useSearchParams();
  const [countProductOnPage, setCountProductOnPage] = useState<number>(
    Number(searchParams.get('countProductOnPage')) || 0,
  );
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('currentPage')) || 0,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

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
      dispatch({ type: 'deleteProduct', payload: product.productInfo.id });
    }
  };

  const applyPromoCode = (promoCode: PromoCodeType): void => {
    dispatch({ type: 'applyPromoCode', payload: promoCode });
  };

  const cancelPromoCode = (promoCode: PromoCodeType): void => {
    dispatch({ type: 'cancelPromoCode', payload: promoCode });
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (currentPage) {
      params.append('currentPage', String(currentPage));
    } else {
      params.delete('currentPage');
    }
    if (countProductOnPage) {
      params.append('countProductOnPage', String(countProductOnPage));
    } else {
      params.delete('countProductOnPage');
    }
    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  }, [currentPage, countProductOnPage]);

  useEffect(() => {
    if (location.state) {
      setIsModalOpen(location.state.isModalOpen);
    }
  }, [location]);

  useEffect(() => {
    if (cartProducts.length === 0 && currentPage >= maxPageCount && currentPage > 0) {
      setCurrentPage(maxPageCount - 1);
    }
  }, [cartProducts]);

  return (
    <>
      <div className="container">
        {state.products.length > 0 && (
          <div className={styles.wrapper}>
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
              <div className={styles.pagination}>
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  maxPageCount={maxPageCount}
                />
              </div>
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
          </div>
        )}
        {isModalOpen && <CartModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
        {state.products.length === 0 && <div className={styles.title}>Cart is empty</div>}
      </div>
    </>
  );
};

export default CartPage;
