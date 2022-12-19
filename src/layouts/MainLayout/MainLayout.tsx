import { FC, PropsWithChildren } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './MainLayout.module.scss';
import cn from 'classnames';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={cn('container', styles.main)}>{children}</main>
      <Footer />
    </>
  );
};
export default MainLayout;
