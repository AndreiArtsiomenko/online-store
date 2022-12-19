import { FC } from 'react';
import { Product } from '../../../models/product.model';
import { CardType } from '../../../types/common.types';

interface ProductItemProps {
  typeCard: CardType;
  product: Product;
}

const ProductItem: FC<ProductItemProps> = ({ typeCard, product }) => {
  return <div>ProductItem</div>;
};
export default ProductItem;
