import { FC } from 'react';
import Button from '../ui/buttons/Button';
import styles from './Pagination.module.scss';
import cn from 'classnames';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (val: number) => void;
  maxPageCount: number;
}

const Pagination: FC<PaginationProps> = ({ currentPage, setCurrentPage, maxPageCount }) => {
  const pagesArr = Array(maxPageCount)
    .fill(0)
    .map((_, i) => i + 1);
  const prevBtnHandler = (): void => {
    if (currentPage === 0) return;
    setCurrentPage(currentPage - 1);
  };

  const nextBtnHandler = (): void => {
    if (currentPage === maxPageCount - 1) return;
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.wrapper}>
      <Button onClick={prevBtnHandler}>Prev</Button>
      {pagesArr.map((page, i) => (
        <span
          className={cn(styles.page_item, { [styles.page_item_active]: currentPage === i })}
          key={page}
          onClick={() => setCurrentPage(i)}
        >
          {page}
        </span>
      ))}
      <Button onClick={nextBtnHandler}>Next</Button>
    </div>
  );
};

export default Pagination;
