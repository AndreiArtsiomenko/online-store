import { FC } from 'react';
import { getPriceByLocale } from '../../../helpers/price.util';
import { CartProduct } from '../../../providers/CartContextProvider';
import Button from '../../ui/buttons/Button';
import styles from './CartListItem.module.scss';

interface CartListItemProps {
  product: CartProduct;
  incCountProduct: (product: CartProduct) => void;
  decCountProduct: (product: CartProduct) => void;
  sequence: number;
}

const CartListItem: FC<CartListItemProps> = ({
  product,
  incCountProduct,
  decCountProduct,
  sequence,
}) => {
  const { productInfo, count } = product;

  return (
    <div className={styles.wrapper}>
      <div className={styles.sequence_box}>
        <span className={styles.sequence}>{sequence}</span>
      </div>
      <div className={styles.thumbnail}>
        <img src={productInfo.thumbnail} alt={productInfo.title} />
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{productInfo.title}</span>
        <p className={styles.description}>{productInfo.description}</p>
        <div className={styles.other_info}>
          <span>{`Rating: ${productInfo.rating}`}</span>
          <span>{`Discount: ${productInfo.discountPercentage}%`}</span>
        </div>
      </div>
      <div className={styles.control_box}>
        <span className={styles.stock}>{`Stock: ${productInfo.stock}`}</span>
        <div className={styles.control}>
          <Button onClick={() => decCountProduct(product)}>-</Button>
          <span>{count}</span>
          <Button disabled={count === productInfo.stock} onClick={() => incCountProduct(product)}>
            +
          </Button>
        </div>
        <span className={styles.totalCoast}>{getPriceByLocale(count * productInfo.price)}</span>
      </div>
    </div>
  );
};

export default CartListItem;
