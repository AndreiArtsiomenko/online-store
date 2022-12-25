import { FC } from "react";

interface SortSelectProps {
  options: {
    id: number;
    value: string;
    name: string;
  }[]
  defaultValue: string
  value: string
  onChange: (sort: string) => void
}

const SortSelect: FC<SortSelectProps> = ({ options, defaultValue, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option disabled >{defaultValue}</option>
      {options.map(option =>
        <option key={option.id} value={option.value}>{option.name}</option>)}
    </select>
  );
};

export default SortSelect;