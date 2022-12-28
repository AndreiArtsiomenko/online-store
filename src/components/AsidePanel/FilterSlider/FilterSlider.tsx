import { ChangeEvent, FC } from 'react';
import style from './FilterSlider.module.scss';
import cn from 'classnames';
import { DualSliderValueType } from '../../../pages/HomePage/HomePage';

interface FilterSliderProps {
  params: DualSliderValueType;
  setParams: (value: DualSliderValueType) => void;
  title: string;
  minMaxValues: { min: number; max: number };
}

const FilterSlider: FC<FilterSliderProps> = ({ params, setParams, title, minMaxValues }) => {
  const minValue = Math.min(...params);
  const maxValue = Math.max(...params);

  return (
    <div className={style.slider_wrapper}>
      <div className={style.slider_title}>{title}</div>
      <div className={style.slider_range}>
        <span className={cn(style.slider_span, style.slider_span_min)}>€{minValue}</span>
        <input
          className={style.slider_input}
          type="range"
          id="min"
          min={minMaxValues.min}
          max={minMaxValues.max}
          value={params[0]}
          onChange={(e) => {
            setParams([+e.target.value, params[1]]);
          }}
        />
        <input
          className={style.slider_input}
          type="range"
          id="max"
          min={minMaxValues.min}
          max={minMaxValues.max}
          value={params[1]}
          onChange={(e) => {
            setParams([params[0], +e.target.value]);
          }}
        />
        <span className={cn(style.slider_span, style.slider_span_max)}>€{maxValue}</span>
      </div>
    </div>
  );
};

export default FilterSlider;
