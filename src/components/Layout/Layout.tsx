import { ReactNode } from 'react';

import Head from 'next/head';

import styles from '@/styles/layout.module.css';

type Props = {
  children: ReactNode;
};

export default function Layout({ children, title }: Props) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {/* content that isn't metadata like the head, represents an individual page */}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
