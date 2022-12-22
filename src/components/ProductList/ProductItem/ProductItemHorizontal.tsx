import { FC } from 'react';
import { Product } from '../../../models/product.model';
import { CardType } from '../../../types/common.types';
import styles from './ProductItemHorizontal.module.scss';
import cn from 'classnames'
import ButtonAddCart from '../../ui/buttons/ButtonAddCart';

interface ProductItemProps {
  typeCard: CardType;
  product: Product;
}

const ProductItemHorizontal: FC<ProductItemProps> = ({ typeCard, product }) => {
  return <div className={styles.wrapper}>
    <div className={styles.box_img}>
      <img className={styles.img} src={product.images[0]} alt={product.title} />
    </div>

    <div className={cn(styles.card__item, styles.title)}><span>{product.title}</span></div>
    <div className={cn(styles.card__item, styles.category)}><span>Category: </span>{product.category}</div>
    <div className={cn(styles.card__item, styles.brand)}><span>Brand: </span>{product.brand}</div>
    <div className={styles.product_buy}>
      <div className={styles.price}>€{product.price}</div>
      <ButtonAddCart>Add to cart</ButtonAddCart>
    </div>
    <div className={styles.card__info}>
      <div className={cn(styles.card__item, styles.rating)}><span>Rating: </span>{product.rating}</div>
      <div className={cn(styles.card__item, styles.stock)}><span>Stock:</span>{product.stock}</div>
    </div>

  </div>;
};
export default ProductItemHorizontal;