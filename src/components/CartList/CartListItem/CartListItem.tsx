import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getPriceByLocale } from '../../../helpers/price.util';
import { CartProduct } from '../../../providers/CartContextProvider';
import ButtonView from '../../ui/buttons/ButtonView';
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
      <Link to={`/products/${productInfo.id}`} className={styles.thumbnail}>
        <img src={productInfo.thumbnail} alt={productInfo.title} />
      </Link>
      <div className={styles.info}>
        <Link to={`/products/${productInfo.id}`} className={styles.title}>
          {productInfo.title}
        </Link>
        <p className={styles.description}>{productInfo.description}</p>
        <div className={styles.other_info}>
          <span>{`Rating: ${productInfo.rating}`}</span>
          <span>{`Discount: ${productInfo.discountPercentage}%`}</span>
        </div>
      </div>
      <div className={styles.control_box}>
        <span className={styles.stock}>{`Stock: ${productInfo.stock}`}</span>
        <div className={styles.control}>
          <ButtonView onClick={() => decCountProduct(product)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
          </ButtonView>
          <span>{count}</span>
          <ButtonView
            disabled={count === productInfo.stock}
            onClick={() => incCountProduct(product)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </ButtonView>
        </div>
        <span className={styles.totalCoast}>{getPriceByLocale(count * productInfo.price)}</span>
      </div>
    </div>
  );
};

export default CartListItem;
