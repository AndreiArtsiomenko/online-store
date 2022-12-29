export const getPriceByLocale = (price: number, locale = 'en-EN'): string => {
  return price.toLocaleString(locale, { style: 'currency', currency: 'EUR' });
};
