import { ButtonHTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren } from 'react';
import styles from './ButtonView.module.scss';
import cn from 'classnames';
interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  btnType?: 'primary' | 'ghost' | 'outline';
}

const ButtonView: FC<PropsWithChildren<ButtonProps>> = ({
  btnType = 'primary',
  children,
  ...rest
}) => {
  return (
    <button {...rest} className={cn(styles.button, styles[btnType])}>
      {children}
    </button>
  );
};

export default ButtonView;
