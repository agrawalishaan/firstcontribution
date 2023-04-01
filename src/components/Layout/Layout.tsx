import { ReactNode } from 'react';

import Head from 'next/head';

import Navbar from '@/components/Layout/Navbar/Navbar';

import styles from '@/styles/layout.module.css';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>First Contribution</title>
      </Head>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
