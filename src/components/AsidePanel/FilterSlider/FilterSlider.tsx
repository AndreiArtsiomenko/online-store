import { FC } from 'react';
import style from './FilterSlider.module.scss'
import cn from 'classnames';

interface FilterSliderProps {
  params: string[]
  setParams: (value: string[]) => void;
  title: string;
  minSlideNumber: number;
  maxSlideNumber: number
}

const FilterSlider: FC<FilterSliderProps> = ({ params, setParams, title, minSlideNumber, maxSlideNumber }) => {
  // let maxValue = 155
  // if (title === "Price") {
  //   maxValue = 1800
  // }
  return (
    <div className={style.slider_wrapper}>
      <div className={style.slider_title}>{title}</div>
      <div className={style.slider_range}>
        <span className={cn(style.slider_span, style.slider_span_min)}>€{minSlideNumber}</span>
        <input className={style.slider_input} type="range" id='min' value={minSlideNumber} onChange={e => setParams([e.target.value, params[1]])} />
        <input className={style.slider_input} type="range" id="max" value={maxSlideNumber} onChange={e => setParams([params[0], e.target.value])} />
        <span className={cn(style.slider_span, style.slider_span_max)}>€{maxSlideNumber}</span>
      </div>
    </div>
  );
};

export default FilterSlider;