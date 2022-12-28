import { Product } from '../models/product.model';
export type CategoryType = Record<string, { title: string; count: number; findCount: number }>;
export const sortOptions = [
  {
    id: 1,
    value: 'price_ASC',
    name: 'Sort by price ASC',
  },
  {
    id: 2,
    value: 'price_DESC',
    name: 'Sort by price DESC',
  },
  {
    id: 3,
    value: 'rating_ASC',
    name: 'Sort by rating ASC',
  },
  {
    id: 4,
    value: 'rating_DESC',
    name: 'Sort by rating DESC',
  },
];

export const sortProducts = (products: Product[], sortParam: string): Product[] => {
  const [key, type] = sortParam.split('_') as [key: 'price' | 'rating', type: string];
  if (type === 'ASC') {
    return [...products].sort((a, b) => a[key] - b[key]);
  } else {
    return [...products].sort((a, b) => b[key] - a[key]);
  }
};

export const getProductsBySearch = (products: Product[], searchParam: string): Product[] => {
  const lowerSearchParam = searchParam.toLowerCase();
  return products.filter((product) => {
    for (const value of Object.values(product).slice(1, -2)) {
      if (String(value).toLowerCase().includes(lowerSearchParam)) {
        return true;
      }
    }
    return false;
  });
};

export const getBrandsAndCategories = (
  products: Product[],
  finallyProducts: Product[],
): { categories: CategoryType; brands: CategoryType } => {
  const categories: CategoryType = {};
  const brands: CategoryType = {};

  products.forEach((product) => {
    const categoryItem = categories[product.category.toLowerCase()];
    const brandItem = brands[product.brand.toLowerCase()];
    if (categoryItem) {
      categoryItem.count = categoryItem.count + 1;
    } else {
      categories[product.category.toLowerCase()] = {
        title: product.category.toLowerCase(),
        count: 1,
        findCount: 0,
      };
    }
    if (brandItem) {
      brandItem.count = brandItem.count + 1;
    } else {
      brands[product.brand.toLowerCase()] = {
        title: product.brand.toLowerCase(),
        count: 1,
        findCount: 0,
      };
    }
  });
  finallyProducts.forEach((product) => {
    const brand = brands[product.brand.toLowerCase()];
    const category = categories[product.category.toLowerCase()];
    if (brand) {
      brand.findCount = brand.findCount + 1;
    }
    if (category) {
      category.findCount = category.findCount + 1;
    }
  });
  return { categories, brands };
};


export const getProductByPrice = (
  products: Product[], 
  priceParam: string[]): { 
    productByPrice: Product[], 
    minPrice: number, 
    maxPrice: number
  } => {
  const minPriceParam = Math.min(...priceParam.map(e => +e))
  const maxPriceParam = Math.max(...priceParam.map(e => +e))
  const productByPrice = products.filter(product => minPriceParam <= product.price && product.price <= maxPriceParam)
  const minPrice = Math.min(...productByPrice.map(product => +product.price))
  const maxPrice = Math.max(...productByPrice.map(product => +product.price))

  return { productByPrice, minPrice, maxPrice }
}

export const getProductByStock = (
  products: Product[], 
  stockParam: string[]): { 
    productByStock: Product[], 
    minStock: number, 
    maxStock: number
  } => {
  const minStockParam = Math.min(...stockParam.map(e => +e))
  const maxStockParam = Math.max(...stockParam.map(e => +e))
  const productByStock = products.filter(product => minStockParam <= product.stock && product.stock <= maxStockParam)
  const minStock = Math.min(...productByStock.map(product => +product.stock))
  const maxStock = Math.max(...productByStock.map(product => +product.stock))

  return { productByStock, minStock, maxStock }
}