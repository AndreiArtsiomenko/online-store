import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import { Product, ResponseProduct } from '../../models/product.model';
import { CardType } from '../../types/common.types';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [typeCard, setTypeCard] = useState<CardType>('vertical');

  const fetchData = async (): Promise<void> => {
    try {
      const responseProduct = await axios.get<ResponseProduct>('https://dummyjson.com/products?limit=100');

      const responseCategory = await axios.get<string[]>('https://dummyjson.com/products/categories');

      if (responseProduct.status !== 200 || responseCategory.status !== 200) {
        throw new Error('Bad request');
      }

      setProducts(responseProduct.data.products);
      setCategories(responseCategory.data);
      setIsLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container'>
      <h1>Home</h1>
      {products.length > 0 && <ProductList products={products} typeCard={typeCard} />}
      {isLoading && <span>Loading...</span>}
      {error && <span>Something went wrong!</span>}
    </div>
  );
};

export default HomePage;
