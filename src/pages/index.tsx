import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

import CardContainer from '@/components/CardContainer/CardContainer';
import Filters from '@/components/Filters/Filters';
import Infobar from '@/components/Infobar/Infobar';
import Layout from '@/components/Layout/Layout';

import { RepositoryExtended } from '@/lib/typings';

export default function HomePage() {
  // useStates

  // contains what type of repos are viewed
  const [view, setView] = useState('top');
  // contains current sort type
  const [sort, setSort] = useState('sort-by');
  // contains all repo information
  const [repos, setRepos] = useState<RepositoryExtended[] | null>(null);

  // ! add typings to returned data from api calls
  // useEffects
  useEffect(() => {
    async function getData() {
      // ! add a type annotation for axios but why do I even need to
      const reposNested = (await axios.get('/api/get-repos')).data;
      setRepos(reposNested);
    }
    getData();
  }, []);

  // useCallbacks

  // handles which types of repositories are being viewed, top repos or community repos
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

  // handles the state change for the `sort by` dropdown
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
      <div>{repos && <CardContainer repos={repos} />}</div>
    </Layout>
  );
}
