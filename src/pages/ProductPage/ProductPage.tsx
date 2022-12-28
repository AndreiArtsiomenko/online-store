import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product, ResponseProduct } from '../../models/product.model';
import classes from './ProductPage.module.scss';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
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
    <div>
      test
      {isLoading && <span>Loading...</span>}
      {error && <span>Something went wrong!</span>}
    </div>
  );
};

export default ProductPage;
