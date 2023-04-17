import {
  AiOutlineFilter as EmptyFilter,
  AiFillFilter as FullFilter,
} from 'react-icons/ai';

import cx from '@/lib/util/cx';

import styles from '@/styles/Filters/filters.module.css';

export default function Filters({ view, handleViewChange }) {
  return (
    <div className={styles.filters}>
      <button className={styles['filter-toggle']}>
        <EmptyFilter />
      </button>
      <button
        className={cx(styles.view, view === 'top' && styles.active)}
        onClick={handleViewChange}
      >
        Top Repos
      </button>
      <button
        className={cx(styles.view, view === 'community' && styles.active)}
        onClick={handleViewChange}
      >
        Community Repos
      </button>
    </div>
  );
}
