import { AiOutlineStar as Star } from 'react-icons/ai';
import { VscRepoForked as Fork } from 'react-icons/vsc';

import styles from '@/styles/CardContainer/card.module.css';

import cx from '@/lib/util/cx';

export default function StatsSection({ stars, forks }) {
  return (
    <div className={cx(styles.stats, 'secondary-color')}>
      <div className={styles.stat}>
        <Star className={cx(styles.star, styles.icon)} />
        <p>
          {stars} <span>stars</span>
        </p>
      </div>

      <div className={styles.stat}>
        <Fork className={cx(styles.fork, styles.icon)} />
        <p>
          {forks} <span>forks</span>
        </p>
      </div>
    </div>
  );
}
