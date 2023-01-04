import { FC, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

const Modal: FC<PropsWithChildren> = ({ children }) => {
  const modal = (
    <div>
      <div></div>
      <div>{children}</div>
    </div>
  );
  return ReactDOM.createPortal(modal, document.getElementById('modal') as HTMLElement);
};
export default Modal;
