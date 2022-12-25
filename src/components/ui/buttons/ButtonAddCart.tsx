import { FC, PropsWithChildren } from "react";
import styles from './ButtonAddCart.module.scss'

const ButtonAddCart: FC<PropsWithChildren> = ({ children }) => {
  return (
    <button className={styles.button}>{children}</button>
  )
}

export default ButtonAddCart;