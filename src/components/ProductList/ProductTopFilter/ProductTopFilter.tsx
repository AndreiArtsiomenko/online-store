import { FC } from 'react';
import { sortOptions } from '../../../helpers/filters.data';
import { CardType } from '../../../types/common.types';
import Button from '../../ui/buttons/Button';
import Input from '../../ui/Input/Input';
import Select from '../../ui/selects/Select';
import style from './ProductTopFilter.module.scss';

interface ProductTopFilterProps {
  productsCount: number;
  setSortParam: (param: string) => void;
  sortParam: string;
  searchParam: string;
  setSearchParam: (param: string) => void;
  typeCard: string;
  setTypeCard: (val: CardType) => void;
}
const ProductTopFilter: FC<ProductTopFilterProps> = ({
  productsCount,
  setSortParam,
  sortParam,
  searchParam,
  setSearchParam,
  setTypeCard,
}) => {
  return (
    <div className={style.wrapper}>
      <Select
        placeholder="Sort by"
        options={sortOptions}
        onChange={e => setSortParam(e.target.value)}
        value={sortParam}
      />
      <div>Found: {productsCount}</div>
      <Input
        value={searchParam}
        placeholder="Search query"
        onChange={e => setSearchParam(e.target.value)}
      />
      <div className={style.viewModeForm}>
        <Button onClick={() => setTypeCard('horizontal')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M3 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 5.25zm0 4.5A.75.75 0 013.75 9h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <Button onClick={() => setTypeCard('vertical')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ProductTopFilter;
