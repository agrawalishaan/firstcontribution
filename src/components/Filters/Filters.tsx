import { BiSort as Sort } from 'react-icons/bi';
import { IoFilter as Filter } from 'react-icons/io5';

import cx from '@/lib/util/cx';

import styles from '@/styles/Filters/filters.module.css';

type Props = {
  view: string;
  handleViewChange: (view: string) => void;
  handleSortChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sort: string;
};

export default function Filters({
  view,
  handleViewChange,
  handleSortChange,
  sort,
}: Props) {
  return (
    <div className={styles.filters}>
      <button
        className={cx(styles.view, view === 'top' && styles.active)}
        onClick={() => handleViewChange('top')}
      >
        Top Repos
      </button>
      <button
        className={cx(styles.view, view === 'community' && styles.active)}
        onClick={() => handleViewChange('community')}
      >
        Community Repos
      </button>

      <button className={styles.filter}>
        <Filter /> Filters
      </button>

      <select value={sort} onChange={handleSortChange} className={styles.sort}>
        <option value="sort-by">Sort by</option>
        <option value="stars">Stars</option>
        <option value="forks">Forks</option>
        <option value="number-issues"># Issues</option>
        <option value="newest-issues">Newest Issues</option>
      </select>
    </div>
  );
}
