import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ProductTopFilter from '../../components/ProductList/ProductTopFilter/ProductTopFilter';
import { getBrandsAndCategories, getProductByPrice, getProductByStock, getProductsBySearch, sortProducts } from '../../helpers/filters.data';
import { Product, ResponseProduct } from '../../models/product.model';
import { CardType } from '../../types/common.types';
import styles from './HomePage.module.scss';
import cn from 'classnames';
import AsidePanel from '../../components/AsidePanel/AsidePanel';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [typeCard, setTypeCard] = useState<CardType>('vertical');
  const [sortParam, setSortParam] = useState<string>('');
  const [searchParam, setSearchParam] = useState<string>('');
  const [categoryParam, setCategoryParam] = useState<string[]>([]);
  const [brandParam, setBrandParam] = useState<string[]>([]);
  const [priceParam, setPriceParam] = useState<string[]>(['0', '1800'])
  const [stockParam, setStockParam] = useState<string[]>(['0', '155'])

  const sortedProducts = sortProducts(products, sortParam);
  
  const productByBrand =
    brandParam.length > 0
      ? sortedProducts.filter((product) => brandParam.includes(product.brand.toLocaleLowerCase()))
      : sortedProducts;

  const productByCategory =
    categoryParam.length > 0
      ? productByBrand.filter((product) => categoryParam.includes(product.category))
      : productByBrand;

  const { productByPrice, minPrice, maxPrice } = getProductByPrice(productByCategory, priceParam)
  const { productByStock, minStock, maxStock } = getProductByStock(productByPrice, stockParam)

  const searchedProduct = getProductsBySearch(productByStock, searchParam);

  const { brands, categories } = getBrandsAndCategories(products, searchedProduct);

  const resetFilter = () => {
    setSortParam('');
    setSearchParam('');
    setCategoryParam([]);
    setBrandParam([]);
  };

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
    <div className={cn('container', styles.wrapper)}>
      {!isLoading && !error && (
        <>
          <aside className={styles.left}>
            <AsidePanel
              resetFilters={resetFilter}
              categories={categories}
              categoryParam={categoryParam}
              setCategoryParam={setCategoryParam}
              brands={brands}
              brandParam={brandParam}
              setBrandParam={setBrandParam}
              priceParam={priceParam}
              setPriceParam={setPriceParam}
              minPrice={minPrice}
              maxPrice={maxPrice}
              stockParam={stockParam}
              setStockParam={setStockParam}
              minStock={minStock}
              maxStock={maxStock}
            />
          </aside>
          <div className={styles.right}>
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
          </div>
        </>
      )}
      {isLoading && <span>Loading...</span>}
      {error && <span>Something went wrong!</span>}
    </div>
  );
};

export default HomePage;
