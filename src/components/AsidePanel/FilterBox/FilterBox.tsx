import { FC } from 'react';
import { CategoryType } from '../../../helpers/filters.data';
import styles from './FilterBox.module.scss';

interface FilterBoxProps {
  entities: CategoryType;
  params: string[];
  setParam: (value: string[]) => void;
  title: string;
}
const FilterBox: FC<FilterBoxProps> = ({ title, entities, params, setParam }) => {
  const changeHandler = (val: string) => {
    if (params.includes(val)) {
      const newParam = params.filter(el => el !== val);

      setParam(newParam);
    } else {
      setParam([...params, val]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.list}>
        {Object.values(entities).map(param => (
          <div key={param.title} className={styles.list_item}>
            <label className={styles.label}>
              <input
                checked={params.includes(param.title)}
                onChange={() => changeHandler(param.title)}
                className={styles.input}
                type="checkbox"
              />
              {param.title}
            </label>
            <span>
              ({param.findCount}/{param.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBox;
