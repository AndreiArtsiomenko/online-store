import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ProductTopFilter from '../../components/ProductList/ProductTopFilter/ProductTopFilter';
import { getBrandsAndCategories, getProductsBySearch, sortProducts } from '../../helpers/filters.data';
import { Product, ResponseProduct } from '../../models/product.model';
import { CardType } from '../../types/common.types';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [typeCard, setTypeCard] = useState<CardType>('vertical');
  const [sortParam, setSortParam] = useState<string>('');
  const [searchParam, setSearchParam] = useState<string>('');
  const { brands, categories } = getBrandsAndCategories(products);

  const sortedProducts = sortProducts(products, sortParam);
  const searchedProduct = getProductsBySearch(sortedProducts, searchParam);

  const fetchData = async (): Promise<void> => {
    try {
      const responseProduct = await axios.get<ResponseProduct>('https://dummyjson.com/products?limit=100');
      if (responseProduct.status !== 200) {
        throw new Error('Bad request');
      }
      setProducts(responseProduct.data.products);
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
    <div className="container">
      <h1>Home</h1>
      <ProductTopFilter
        searchParam={searchParam}
        setSearchParam={setSearchParam}
        productsCount={searchedProduct.length}
        sortParam={sortParam}
        setSortParam={setSortParam}
        typeCard={typeCard}
        setTypeCard={setTypeCard}
      />
      <ProductList products={searchedProduct} typeCard={typeCard} />
      {isLoading && <span>Loading...</span>}
      {error && <span>Something went wrong!</span>}
    </div>
  );
};

export default HomePage;
