import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

import CardContainer from '@/components/CardContainer/CardContainer';
import Filters from '@/components/Filters/Filters';
import Infobar from '@/components/Infobar/Infobar';
import Layout from '@/components/Layout/Layout';

export default function HomePage() {
  // useStates

  // contains what type of repos are viewed
  const [view, setView] = useState('top');
  // contains current sort type
  const [sort, setSort] = useState('sort-by');
  // contains all repo information
  const [reposData, setReposData] = useState(null);

  // useEffects

  useEffect(() => {
    axios
      .get('/api/get-repos')
      .then((res) => {
        setReposData(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // useCallbacks
  // ! make it so when you click on a button already clicked nothing happens
  const handleViewChange = useCallback(
    (clickedButton: string) => {
      if (clickedButton === 'top' && view === 'community') {
        setView('top');
      } else if (clickedButton === 'community' && view === 'top') {
        setView('community');
      }
    },
    [view]
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSort(e.target.value);
    },
    []
  );

  return (
    <Layout title="First Contribution">
      <Infobar />
      <Filters
        view={view}
        handleViewChange={handleViewChange}
        handleSortChange={handleSortChange}
        sort={sort}
      />
      <div>{reposData && <CardContainer reposData={reposData} />}</div>
    </Layout>
  );
}
