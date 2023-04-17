import Issue from '@/components/CardContainer/Card/Issue';

import cx from '@/lib/util/cx';

import styles from '@/styles/CardContainer/card.module.css';

export default function IssuesSection() {
  return (
    <div className={styles.issues}>
      <h4 className="primary-color">Good First Issues</h4>
      <div className={styles['issues-container']}>
        <Issue />
        <Issue />
      </div>
      <div className={styles['button-container']}>
        <button className={styles['view-issues']}>view all issues</button>
      </div>
    </div>
  );
}
