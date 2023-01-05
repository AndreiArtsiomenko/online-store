import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product, ResponseProduct } from '../../models/product.model';
import cn from 'classnames';
import styles from './ProductPage.module.scss';
import Button from '../../components/ui/buttons/Button';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [productPhoto, setProductPhoto] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    try {
      const responseProduct = await axios.get<Product>(`https://dummyjson.com/products/${id}`);
      if (responseProduct.status !== 200) {
        throw new Error('Bad request');
      }
      setProduct(responseProduct.data);
      setIsLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  console.log(product);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='container'>
      {product && <div className={styles.link_navigation}>
        <Link to="/"><div>Store</div></Link>
        <span>{'>'}</span>
        <div>{product.category}</div>
        <span>{'>'}</span>
        <div>{product.brand}</div>
        <span>{'>'}</span>
        <div>{product.title}</div>
        </div>}
      {product && <div className={styles.wrapper}>
        <div className={styles.title}>
          <h2>{product.title}</h2>
        </div>
        <div className={styles.content}>
          <div className={styles.photos_box}>
            <div className={styles.slides_photos}>
              {product.images.map((image) => (
                <div onClick={() => setProductPhoto(image)} className={styles.photo} key = {product.id}>
                  <img src={image} alt={product.title} />
                </div>
              ))}
            </div>
            <div className={styles.main_photo}>
              <img src={productPhoto || product.thumbnail} alt={product.title} />
            </div>
          </div>
          <div className={styles.info_box}>
            <div>
              <div className={styles.info_title_desc}>Description:</div>
              <div>{product.description}</div>
            </div>
            <div className={styles.info_items}>
              <div className={styles.info_item}>
                <div className={styles.info_title}>Category:</div>
                <div>{product.category}</div>
              </div>
              <div className={styles.info_item}>
                <div className={styles.info_title}>Brand:</div>
                <div>{product.brand}</div>
              </div>
              <div className={styles.info_item}>
                <div className={styles.info_title}>Discount percentage:</div>
                <div>{product.discountPercentage}</div>
              </div>
              <div className={styles.info_item}>
                <div className={styles.info_title}>Rating:</div>
                <div>{product.rating}</div>
              </div>
              <div className={styles.info_item}>
                <div className={styles.info_title}>Stock:</div>
                <div>{product.stock}</div>
              </div>
            </div>
          </div>
          <div className={styles.buy_box}>
            <div className={styles.product_price}>€{product.price}</div>
            <div className={styles.buttons_box}>
              <Button onClick={(e) => e.stopPropagation()}>Add to cart</Button>
              <Button onClick={(e) => e.stopPropagation()}>Buy now</Button>
            </div>
          </div>
        </div>
      </div>}
      {isLoading && <span>Loading...</span>}
      {error && <span>Something went wrong!</span>}
    </div>
  );
};

export default ProductPage;
