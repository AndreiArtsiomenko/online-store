import { Product } from '../models/product.model';
type CategoryType = Record<string, { title: string; count: number }>;
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

export const getBrandsAndCategories = (products: Product[]): { categories: CategoryType; brands: CategoryType } => {
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
      };
    }
    if (brandItem) {
      brandItem.count = brandItem.count + 1;
    } else {
      brands[product.brand.toLowerCase()] = {
        title: product.brand.toLowerCase(),
        count: 1,
      };
    }
  });
  return { categories, brands };
};