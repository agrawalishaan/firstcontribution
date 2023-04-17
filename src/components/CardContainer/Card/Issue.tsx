import cx from '@/lib/util/cx';

import styles from '@/styles/CardContainer/card.module.css';

export default function Issue() {
  return (
    <div className={cx(styles['issue'], 'secondary-color')}>
      <h4 className={styles['issue-number']}>#3067</h4>
      <p className={styles['issue-description']}>
        I am a generic issue and I am very long someone please fix me
      </p>
    </div>
  );
}
