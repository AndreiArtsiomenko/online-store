import { FC, MouseEvent, useContext } from 'react';
import { Product } from '../../../models/product.model';
import { CardType } from '../../../types/common.types';
import styles from './ProductItem.module.scss';
import cn from 'classnames';
import Button from '../../ui/buttons/Button';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../providers/CartContextProvider';
import { getPriceByLocale } from '../../../helpers/price.util';

interface ProductItemProps {
  typeCard: CardType;
  product: Product;
}

const ProductItem: FC<ProductItemProps> = ({ typeCard, product }) => {
  const isVertical = typeCard === 'vertical';
  const navigate = useNavigate();
  const { state, dispatch } = useContext(CartContext);
  const isProductInCart = state.products.find((cartProduct) => cartProduct.productInfo.id === product.id);
  const addToCartHandler = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => {
    e.stopPropagation();
    if (isProductInCart) {
      dispatch({ type: 'deleteProduct', payload: { productInfo: product, count: 1 } });
    } else {
      dispatch({ type: 'addProduct', payload: { productInfo: product, count: 1 } });
    }
  };
  return (
    <div
      onClick={() => navigate(`products/${product.id}`)}
      className={cn(styles.wrapper, { [styles.item_horizontal]: !isVertical, [styles.item_vertical]: isVertical })}
    >
      <div className={styles.box_img}>
        <img className={styles.img} src={product.thumbnail} alt={product.title} />
      </div>

      <div className={cn(styles.card__item, styles.title)}>
        <span>{product.title}</span>
      </div>
      <div className={cn(styles.card__item, styles.category)}>
        <span>Category:</span>
        {product.category}
      </div>
      <div className={cn(styles.card__item, styles.brand)}>
        <span>Brand:</span>
        {product.brand}
      </div>
      <div className={styles.product_buy}>
        <div className={styles.price}>{getPriceByLocale(product.price)}</div>
        <Button onClick={addToCartHandler}>{isProductInCart ? 'Drop from cart' : 'Add to cart'}</Button>
      </div>
      <div className={styles.card__info}>
        <div className={cn(styles.card__item, styles.rating)}>
          <span>Rating: </span>
          {product.rating}
        </div>
        <div className={cn(styles.card__item, styles.stock)}>
          <span>Stock:</span>
          {product.stock}
        </div>
      </div>
    </div>
  );
};
export default ProductItem;
