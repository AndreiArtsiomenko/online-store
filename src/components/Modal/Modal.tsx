import { FC, PropsWithChildren, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  const modal = (
    <div className={styles.wrapper}>
      <span className={styles.close_btn} onClick={() => setIsOpen(false)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
      <div className={styles.background} onClick={() => setIsOpen(false)}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
  return ReactDOM.createPortal(modal, document.getElementById('modal') as HTMLElement);
};
export default Modal;
