import { ButtonHTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren } from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';
interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  btnType?: 'primary' | 'ghost' | 'outline';
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ btnType = 'primary', children, ...rest }) => {
  return (
    <button {...rest} className={cn(styles.button, styles[btnType])}>
      {children}
    </button>
  );
};

export default Button;
