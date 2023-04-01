import { useEffect, useState } from 'react';
import CardContainer from '@/components/CardContainer/CardContainer';
import FilterMenu from '@/components/FilterMenu/FilterMenu';
import Layout from '@/components/Layout/Layout';

import styles from '@/styles/Homepage/index.module.css';

export default function HomePage() {
  const [reposData, setReposData] = useState(null);

  useEffect(() => {
    fetch('/exampleData.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReposData(data);
      });
  }, []);

  return (
    <Layout>
      <div className={styles['homepage']}>
        <FilterMenu />
        {reposData && <CardContainer reposData={reposData} />}
      </div>
    </Layout>
  );
}
