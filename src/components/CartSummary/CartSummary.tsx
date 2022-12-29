import { FC, useState } from 'react';
import { getPriceByLocale } from '../../helpers/price.util';
import { CartProduct, PromoCodeType } from '../../providers/CartContextProvider';
import Button from '../ui/buttons/Button';
import Input from '../ui/Input/Input';
import styles from './CartSummary.module.scss';

interface CartSummaryProps {
  promoCodes: PromoCodeType[];
  appliedPromoCode: PromoCodeType[];
  products: CartProduct[];
  cancelPromoCode: (promoCode: PromoCodeType) => void;
  applyPromoCode: (promoCode: PromoCodeType) => void;
}

const CartSummary: FC<CartSummaryProps> = ({
  products,
  promoCodes,
  appliedPromoCode,
  applyPromoCode,
  cancelPromoCode,
}) => {
  const totalCount = products.reduce((acc, product) => acc + product.count, 0);

  const [searchedPromo, setSearchedPromo] = useState('');

  const discount = appliedPromoCode.reduce((acc, code) => acc + code.value, 0);
  const foundPromo = promoCodes.filter((promoCode) => promoCode.title === searchedPromo);
  const totalPrice = products.reduce((acc, product) => acc + product.productInfo.price * product.count, 0);
  const totalPriceWithDiscount = totalPrice - (totalPrice * discount) / 100;
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Summary</div>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <span>Count products:</span>
          <span>{totalCount}</span>
        </li>
        <li className={styles.list_item}>
          <span>Total coast:</span>
          <div className={styles.coast}>
            {discount !== 0 && <span className={styles.oldPrice}>{getPriceByLocale(totalPrice)}</span>}
            <span>{getPriceByLocale(totalPriceWithDiscount)}</span>
          </div>
        </li>
      </ul>
      {appliedPromoCode.length > 0 && (
        <ul className={styles.promo_list}>
          {appliedPromoCode.map((code) => (
            <li key={code.title} className={styles.promo_item}>
              <span>{`${code.title} - ${code.value}%`}</span>
              <Button onClick={() => cancelPromoCode(code)}>Cancel</Button>
            </li>
          ))}
        </ul>
      )}
      <Input
        type="text"
        value={searchedPromo}
        onChange={(e) => setSearchedPromo(e.target.value)}
        placeholder="Enter promo code"
      />
      <ul className={styles.promo_list}>
        {foundPromo.map((code) => (
          <li key={code.title} className={styles.promo_item}>
            <span>{`${code.title} - ${code.value}%`}</span>{' '}
            {!appliedPromoCode.find((promo) => promo.title === code.title) && (
              <Button onClick={() => applyPromoCode(code)}>Apply</Button>
            )}
          </li>
        ))}
      </ul>
      <Button>Buy now</Button>
    </div>
  );
};
export default CartSummary;
